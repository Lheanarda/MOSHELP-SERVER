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
        a.level_approval = (select min (level_approval) from approval where approved ='N' and kode_dokumen = a.kode_dokumen)
        union
        select d.kode_dokumen, d.nama_project, d.create_date, d.update_date, a.id, a.level_approval
        from dokumen d, approval a
        where 
        a.kode_dokumen  = d.kode_dokumen and 
        a.employee_id IN (select m2.employee_id from users u2 , magang m2 where m2.pic_employee_id = u2.employee_id and u2.employee_id =?) and 
        a.approved = 'N' and 
        a.level_approval = (select min (level_approval) from approval where approved ='N' and kode_dokumen = a.kode_dokumen)`;

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
}

module.exports = ApprovalDatasource;