class ApprovalDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getNeedToBeSigned(input){
        const sql = `
        select d.kode_dokumen, d.nama_project, d.create_date, d.update_date, a.id, a.level_approval
        from dokumen d, approval a
        where 
        a.kode_dokumen  = d.kode_dokumen and 
        a.employee_id = ? and 
        a.approved = 'N' and 
        a.level_approval = (select min (level_approval) from approval where approved ='N' and kode_dokumen = a.kode_dokumen) and 
        a.rejected = false
        union
        select d.kode_dokumen, d.nama_project, d.create_date, d.update_date, a.id, a.level_approval
        from dokumen d, approval a
        where 
        a.kode_dokumen  = d.kode_dokumen and 
        a.employee_id IN (select m2.employee_id from users u2 , magang m2 where m2.pic_employee_id = u2.employee_id and u2.employee_id =?) and 
        a.approved = 'N' and 
        a.level_approval = (select min (level_approval) from approval where approved ='N' and kode_dokumen = a.kode_dokumen) and 
        a.rejected = false
        ORDER BY update_date DESC`;

        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id,input.employee_id]},{raw:true});
            return {
                success:true,
                data:result[0]
            };
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }

    async onSignedDRF(input){

        let approvalDate;

        const sqlApproval = `
        UPDATE approval
        SET 
        approved='Y',
        update_date =current_timestamp
        WHERE 
        id = ?
        `;

        //read level
        switch(input.level_approval){
            case 1:
                approvalDate = 'request_by_date';
                break;
            case 2:
                approvalDate = 'request_approved_date';
                break;
            case 3:
                approvalDate = 'developed_by_date';
                break;
            case 4:
                approvalDate = 'development_approved_date';
                break;
            case 5:
                approvalDate = 'approved_date';
                break;
        }

        const sqlDRF = `
        UPDATE drf
        SET ${approvalDate} = current_timestamp
        WHERE kode_dokumen = ?;
        `;

        const sqlUpdateDokumenDate = `
        UPDATE dokumen
        SET update_date = current_timestamp
        WHERE kode_dokumen = ?
        `

        const sqlDocument = `
        UPDATE dokumen
        SET approved = 'Y'
        WHERE kode_dokumen = ?;
        `

        try{
            console.log(input.id,"test");
            await this.moshelpPGDB.sequelize.query(sqlApproval,{replacements:[input.id]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDRF,{replacements:[input.kode_dokumen]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlUpdateDokumenDate,{replacements:[input.kode_dokumen]},{raw:true});
            if(input.level_approval===5){
                await this.moshelpPGDB.sequelize.query(sqlDocument,{replacements:[input.kode_dokumen]},{raw:true});
            }
            return {
                success:true
            };
        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }

    }

    async onSignedDFT_UAT(input){
        let approvalDate;
        const sqlApproval = `
        UPDATE approval
        SET 
        approved='Y',
        update_date =current_timestamp
        WHERE 
        id = ?
        `;

        //read level
        switch(input.level_approval){
            case 1:
                approvalDate = 'user1_date';
                break;
            case 2:
                approvalDate = 'user2_date';
                break;
            case 3:
                approvalDate = 'checked_by_date';
                break;
            case 4:
                approvalDate = 'request_by_date';
                break;
            case 5:
                approvalDate = 'approved_by_date';
                break;
            case 6:
                approvalDate = 'approved_date';
                break;
        }

        const sqlDFT_UAT = `
        UPDATE dft_uat 
        SET ${approvalDate}=current_timestamp
        WHERE kode_dokumen = ?`;

        const sqlUpdateDokumenDate = `
        UPDATE dokumen
        SET update_date = current_timestamp
        WHERE kode_dokumen = ?
        `

        const sqlDocument = `
        UPDATE dokumen
        SET approved = 'Y'
        WHERE kode_dokumen = ?;
        `;

        try{
            await this.moshelpPGDB.sequelize.query(sqlApproval,{replacements:[input.id]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDFT_UAT,{replacements:[input.kode_dokumen]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlUpdateDokumenDate,{replacements:[input.kode_dokumen]},{raw:true});
            if(input.level_approval===6){
                await this.moshelpPGDB.sequelize.query(sqlDocument,{replacements:[input.kode_dokumen]},{raw:true});
            }
            return {
                success:true
            };
        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }
    }

    async onRejectDocument(input){
        const sql = `UPDATE approval SET
        rejected = true,
        keterangan = :ket
        WHERE id = :id_approval
        `;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:{
                ket:input.keterangan,
                id_approval:input.id_approval
            }},{raw:true});
            return {
                success:true
            };
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }

    async onGetCreatedRejectedDocuments(input){
        const sql = `select a.kode_dokumen, d.nama_project , a.create_date , a.update_date , a.keterangan ,a.id , a.level_approval, uc.nama "nama_pembuat", ub.nama as "nama_ttd"
        from approval a, dokumen d, users uc, users ub
        where a.kode_dokumen  = d.kode_dokumen and a.rejected = true and d.create_by = ? and 
        a.employee_id = ub.employee_id and
        uc.employee_id = d.create_by  
        ORDER BY a.update_date DESC`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id]},{raw:true});
            return {
                success:true,
                data:result[0]
            };
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }

    async onGetDocumentsRejectedBy(input){
        const sql = `select a.kode_dokumen, d.nama_project , a.create_date , a.update_date , a.keterangan, a.id , a.level_approval, uc.nama "nama_pembuat", ut.nama as "nama_ttd"
        from approval a, dokumen d, users uc, users ut
        where a.kode_dokumen  = d.kode_dokumen and a.rejected = true and 
        ut.employee_id = a.employee_id and 
        d.create_by = uc.employee_id and 
        a.employee_id = ?
        ORDER BY a.update_date DESC`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id]},{raw:true});
            return {
                success:true,
                data:result[0]
            };
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }

    async onUpdateDocumentDRF(input){
        const sqlUpdateDRF = `
        UPDATE drf
        SET 
        reference_id = :reference_id,
        request_type = :request_type,
        request_date = :request_date,
        est_due_date = :est_due_date,
        priority = :priority,
        project_name = :project_name,
        title = :title,
        technology = :technology,
        dev_level = :dev_level,
        ext_partner = :ext_partner,
        int_team = :int_team,
        brief_desc = :brief_desc,
        detail_req = :detail_req,
        standard_testing = :standard_testing,
        standard_date = :standard_date,
        standard_pic = :standard_pic,
        standard_notes = :standard_notes,
        advanced_testing = :advanced_testing,
        advanced_date = :advanced_date,
        advanced_pic = :advanced_pic,
        advanced_notes = :advanced_notes
        WHERE kode_dokumen = :kode_dokumen
        `;

        const sqlUpdateApproval = `
        UPDATE approval
        SET 
        rejected = false,
        keterangan = null
        WHERE 
        id = :id_approval
        `;

        const sqlUpdateDocumentDate = `
        UPDATE dokumen
        SET
        update_date = current_timestamp
        WHERE kode_dokumen = ?;
        `
        try{
            await this.moshelpPGDB.sequelize.query(sqlUpdateDRF,{replacements:{
                reference_id : input.reference_id,
                request_type : input.request_type,
                request_date : input.request_date,
                est_due_date : input.est_due_date,
                priority : input.priority,
                project_name : input.project_name,
                title : input.title,
                technology : input.technology,
                dev_level:input.dev_level,
                ext_partner:input.ext_partner,
                int_team:input.int_team,
                brief_desc : input.brief_desc,
                detail_req : input.detail_req,
                standard_testing : input.standard_testing,
                standard_date : input.standard_date,
                standard_pic : input.standard_pic,
                standard_notes : input.standard_notes,
                advanced_testing : input.advanced_testing,
                advanced_date :input.advanced_date,
                advanced_pic : input.advanced_pic,
                advanced_notes : input.advanced_notes,
                kode_dokumen:input.kode_dokumen
            }},{raw:true});

            await this.moshelpPGDB.sequelize.query(sqlUpdateApproval,{replacements:{
                id_approval : input.id_approval
            }},{raw:true});

            await this.moshelpPGDB.sequelize.query(sqlUpdateDocumentDate,{replacements:[input.kode_dokumen]},{raw:true})

            return {
                success:true
            };
        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }
        
        
    }

    async onUpdateDocumentDFT_UAT(input){
        const sqlDeleteSkenario = `
        DELETE FROM skenario
        WHERE kode_dokumen = ?`;

        const sqlDeleteKendala = `
        DELETE FROM kendala
        WHERE kode_dokumen = ?
        `;
        
        const sqlUpdateDFT_UAT = `
        UPDATE dft_uat
        SET 
        request_by = :request_by,
        project_name = :project_name,
        create_date = :create_date,
        approved_by = :approved_by,
        document_type = :document_type,
        tipe = :tipe,
        platform = :platform
        WHERE 
        kode_dokumen = :kode_dokumen
        `;

        //skenario sql
        let skenarioSqlInput ='';
        input.skenarios.forEach((skenario,idx)=>{
            skenarioSqlInput+= `(
                '${skenario.skenario}',
                '${skenario.keterangan ? skenario.keterangan : ''}',
                '${skenario.checklist1 ? 'Y':'N'}',
                '${skenario.checklist2 ? 'Y':'N'}',
                '${input.kode_dokumen}',
                '${skenario.referensi ? skenario.referensi :''}')`;
            
            if(idx !== input.skenarios.length-1){
                skenarioSqlInput+=',';
            }
        });

        //kendala sql
        let kendalaSqlInput = '';
        if(input.kendalas.length>0){
            input.kendalas.forEach((kendala,idx)=>{
                kendalaSqlInput+=`(
                    '${kendala.kendala}',
                    '${kendala.keterangan ? kendala.keterangan : ''}',
                    '${kendala.checklist?'Y':'N'}',
                    '${input.kode_dokumen}',
                    '${kendala.referensi ? kendala.referensi : ''}'
                )`;
    
                if(idx !== input.kendalas.length-1){
                    kendalaSqlInput+=',';
                }
            });
        }

        const sqlAddSkenario = `INSERT INTO skenario (skenario,keterangan,checklist1,checklist2,kode_dokumen,referensi) VALUES ${skenarioSqlInput}`;
        const sqlAddKendala = `INSERT INTO kendala  (kendala,keterangan,checklist,kode_dokumen,referensi) VALUES ${kendalaSqlInput}`;

        const sqlUpdateApproval = `
        UPDATE approval
        SET 
        rejected = false,
        keterangan = null
        WHERE 
        id = :id_approval
        `;
        const sqlUpdateDocumentDate = `
        UPDATE dokumen
        SET
        update_date = current_timestamp
        WHERE kode_dokumen = ?;
        `;

        try{
            await this.moshelpPGDB.sequelize.query(sqlDeleteSkenario,{replacements:[input.kode_dokumen]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDeleteKendala,{replacements:[input.kode_dokumen]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlUpdateDFT_UAT,{replacements:{
                request_by:input.request_by,
                project_name:input.project_name,
                create_date:input.create_date,
                approved_by:input.approved_by,
                document_type : input.document_type,
                tipe : input.tipe,
                platform : input.platform,
                kode_dokumen:input.kode_dokumen
            }},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlAddSkenario,null,{raw:true});
            if(kendalaSqlInput){
                await this.moshelpPGDB.sequelize.query(sqlAddKendala,null,{raw:true});
            }
            await this.moshelpPGDB.sequelize.query(sqlUpdateApproval,{replacements:{
                id_approval:input.id_approval
            }},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlUpdateDocumentDate,{replacements:[input.kode_dokumen]},{raw:true});

            return{
                success:true
            }
        }catch(e){
            console.log(e)
           return{
               success:false,
               message:e
           }
       }
    }
}

module.exports = ApprovalDatasource;