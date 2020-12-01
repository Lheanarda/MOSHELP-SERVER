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
        a.employee_id = ${input.employee_id} and 
        a.approved = 'N' and 
        a.level_approval = (select min (level_approval) from approval where approved ='N' and kode_dokumen = a.kode_dokumen);`;

        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,null,{raw:true});
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
        id = ${input.id}
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
        WHERE kode_dokumen = '${input.kode_dokumen}';
        `;

        const sqlUpdateDokumenDate = `
        UPDATE dokumen
        SET update_date = current_timestamp
        WHERE kode_dokumen = '${input.kode_dokumen}'
        `

        const sqlDocument = `
        UPDATE dokumen
        SET approved = 'Y'
        WHERE kode_dokumen = '${input.kode_dokumen}';
        `

        try{
            await this.moshelpPGDB.sequelize.query(sqlApproval,null,{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDRF,null,{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlUpdateDokumenDate,null,{raw:true});
            if(input.level_approval===5){
                await this.moshelpPGDB.sequelize.query(sqlDocument,null,{raw:true});
            }
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

    async onSignedDFT_UAT(input){
        let approvalDate;
        const sqlApproval = `
        UPDATE approval
        SET 
        approved='Y',
        update_date =current_timestamp
        WHERE 
        id = ${input.id}
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
        WHERE kode_dokumen = '${input.kode_dokumen}'`;

        const sqlUpdateDokumenDate = `
        UPDATE dokumen
        SET update_date = current_timestamp
        WHERE kode_dokumen = '${input.kode_dokumen}'
        `

        const sqlDocument = `
        UPDATE dokumen
        SET approved = 'Y'
        WHERE kode_dokumen = '${input.kode_dokumen}';
        `;

        try{
            await this.moshelpPGDB.sequelize.query(sqlApproval,null,{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDFT_UAT,null,{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlUpdateDokumenDate,null,{raw:true});
            if(input.level_approval===6){
                await this.moshelpPGDB.sequelize.query(sqlDocument,null,{raw:true});
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