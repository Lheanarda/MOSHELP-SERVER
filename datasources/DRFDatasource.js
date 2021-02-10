const e = require("express");

class DRFDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async addDRF(input){

       let standartDate,advancedDate;
       
       //read date
       if(input.standard_date){
            standartDate = `'${input.standard_date}'`
       }else{
            standartDate = null;
       }

       if(input.advanced_date){
            advancedDate = `'${input.advanced_date}'`;
       }else{
            advancedDate = null;
       }

       const sqlAddDokumen = `INSERT INTO dokumen(
        kode_dokumen,
        nama_project,
        nama_file,
        total_level,
        nomor_dokumen,
        create_by,
        update_by
        )VALUES(
            '${input.kode}',
            '${input.title}',
            '${input.kode}.pdf',
            '5',
            '${input.sequence}',
            '${input.create_by}',
            '${input.update_by}'
        )`;
       
       const sqlAddDRF = `INSERT INTO drf VALUES(
           '${input.kode}',
           '${input.reference_id}',
           '${input.request_type}',
           '${input.request_date}',
           '${input.est_due_date}',
           '${input.priority}',
           '${input.project_name}',
           '${input.title}',
           '${input.technology}',
           '${input.dev_level}',
           '${input.ext_partner}',
           '${input.int_team}',
           '${input.brief_desc}',
           '${input.detail_req}',
           '${input.standard_testing}',
           ${standartDate},
           '${input.standard_pic}',
           '${input.standard_notes}',
           '${input.advanced_testing}',
           ${advancedDate},
           '${input.advanced_pic}',
           '${input.advanced_notes}',
           null,
           '${input.request_by_name}',
           '${input.request_by_job}',
           null,
           '${input.request_approved_name}',
           '${input.request_approved_job}',
           null,
           '${input.developed_by_name}',
           '${input.developed_by_job}',
           null,
           '${input.development_approved_name}',
           '${input.development_approved_job}',
           null,
           '${input.approved_name}',
           '${input.approved_job}'
       )`;

       const sqlAddApproval = `
       INSERT INTO approval (nama_approval,level_approval,kode_dokumen,employee_id,create_by,update_by)
       VALUES
       ('request by',1,'${input.kode}','${input.request_by}','${input.create_by}','${input.create_by}'),
       ('request approved by',2,'${input.kode}','${input.request_approved}','${input.create_by}','${input.create_by}'),
       ('developed by',3,'${input.kode}','${input.developed_by}','${input.create_by}','${input.create_by}'),
       ('development approved by',4,'${input.kode}','${input.development_approved}','${input.create_by}','${input.create_by}'),
       ('approved by',5,'${input.kode}','${input.approved}','${input.create_by}','${input.create_by}')`;
       try{
            await this.moshelpPGDB.sequelize.query(sqlAddDokumen,null,{raw:true}); //insert dokumen
            await this.moshelpPGDB.sequelize.query(sqlAddDRF,null,{raw:true}); //insert DRF
            await this.moshelpPGDB.sequelize.query(sqlAddApproval,null,{raw:true}); //insert approval
            return{
                success:true
            }
       }catch(e){
           return{
               success:false,
               message:e
           }
       }
    }

    async getDetailPDF(input){
        const sql = `select d.*, a1.employee_id as "request_by", 
        a2.employee_id as "request_approved",
        a3.employee_id as "developed_by",
        a4.employee_id as "development_approved",
        a5.employee_id as "approved"
        from drf d, approval a1, approval a2, approval a3, approval a4, approval a5
        where 
        d.kode_dokumen  = a1.kode_dokumen and 
        a2.kode_dokumen  = d.kode_dokumen and 
        a3.kode_dokumen = d.kode_dokumen and 
        a4.kode_dokumen = d.kode_dokumen and 
        a5.kode_dokumen = d.kode_dokumen and
        a1.level_approval = 1 and 
        a2.level_approval = 2 and 
        a3.level_approval = 3 and 
        a4.level_approval = 4 and 
        a5.level_approval = 5 and
        d.kode_dokumen = ?`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.kode_dokumen]},{raw:true});
            return {
                success:true,
                data:result[0][0]
            };
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }

}

module.exports = DRFDatasource;