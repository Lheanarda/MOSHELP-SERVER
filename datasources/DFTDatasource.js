class DFTDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async addDFT(input){
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
                '${input.project_name}',
                '${input.kode}.pdf',
                '6',
                '${input.sequence}',
                '${input.create_by}',
                '${input.update_by}'
            )`;
        
        const sqlAddDFT = `INSERT INTO dft_uat VALUES(
            '${input.kode}',
            '${input.request_by}',
            '${input.project_name}',
            '${input.create_date}',
            '${input.approved_by}',
            '${input.document_type}',
            '${input.user1}',
            '${input.user2}',
            '${input.checked_by_name}',
            '${input.checked_by_job}',
            '${input.request_by_name}',
            '${input.request_by_job}',
            '${input.approved_by_name}',
            '${input.approved_by_job}',
            '${input.approved_name}',
            '${input.approved_job}',
            '${input.tipe_dokumen}',
            null,
            null,
            null,
            null,
            null,
            null,
            '${input.tipe}',
            '${input.platform}'
        )`;

        //skenario sql
        let skenarioSqlInput ='';
        input.skenarios.forEach((skenario,idx)=>{
            skenarioSqlInput+= `(
                '${skenario.skenario}',
                '${skenario.keterangan ? skenario.keterangan : ''}',
                '${skenario.checklist1 ? 'Y':'N'}',
                '${skenario.checklist2 ? 'Y':'N'}',
                '${input.kode}',
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
                    '${input.kode}',
                    '${kendala.referensi ? kendala.referensi : ''}'
                )`;
    
                if(idx !== input.kendalas.length-1){
                    kendalaSqlInput+=',';
                }
            });
        }

        const sqlAddSkenario = `INSERT INTO skenario (skenario,keterangan,checklist1,checklist2,kode_dokumen,referensi) VALUES ${skenarioSqlInput}`;
        const sqlAddKendala = `INSERT INTO kendala  (kendala,keterangan,checklist,kode_dokumen,referensi) VALUES ${kendalaSqlInput}`;

        const sqlAddApproval = `INSERT INTO approval (nama_approval,level_approval,kode_dokumen,employee_id,create_by,update_by) VALUES 
        ('User 1',1,'${input.kode}','${input.user1_id}','${input.create_by}','${input.create_by}'),
        ('User 2',2,'${input.kode}','${input.user2_id}','${input.create_by}','${input.create_by}'),
        ('Checked By',3,'${input.kode}','${input.checked_by_id}','${input.create_by}','${input.create_by}'),
        ('Request By',4,'${input.kode}','${input.request_by_id}','${input.create_by}','${input.create_by}'),
        ('Approved By',5,'${input.kode}','${input.approved_by_id}','${input.create_by}','${input.create_by}'),
        ('Approved',6,'${input.kode}','${input.approved_id}','${input.create_by}','${input.create_by}')`;

        try{
            await this.moshelpPGDB.sequelize.query(sqlAddDokumen,null,{raw:true}); //insert dokumen
            await this.moshelpPGDB.sequelize.query(sqlAddDFT,null,{raw:true}); //insert DFT
            await this.moshelpPGDB.sequelize.query(sqlAddSkenario,null,{raw:true}); //insert skenario
            if(input.kendalas.length>0){
                await this.moshelpPGDB.sequelize.query(sqlAddKendala,null,{raw:true});//insert kendala
            }
            await this.moshelpPGDB.sequelize.query(sqlAddApproval,null,{raw:true}); //insert approval

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

    async getDetailPDF(input){
        const sqlMain = `select d.*, a1.employee_id as "user1_id", a2.employee_id as "user2_id", a3.employee_id as "checked_by_id", a4.employee_id as "request_by_id", a5.employee_id as "approved_by_id", a6.employee_id as "approved_id"
        FROM dft_uat d, approval a1, approval a2 , approval a3 , approval a4 , approval a5 , approval a6 
        where d.kode_dokumen  = a1.kode_dokumen and 
        d.kode_dokumen = a2.kode_dokumen and 
        d.kode_dokumen = a3.kode_dokumen and 
        d.kode_dokumen = a4.kode_dokumen and 
        d.kode_dokumen = a5.kode_dokumen and 
        d.kode_dokumen = a6.kode_dokumen and 
        a1.level_approval = 1 and 
        a2.level_approval = 2 and 
        a3.level_approval = 3 and 
        a4.level_approval = 4 and 
        a5.level_approval = 5 and 
        a6.level_approval = 6 and
        d.kode_dokumen = ?`;
        const sqlSkenario = `SELECT skenario,keterangan,checklist1,checklist2,referensi FROM skenario WHERE kode_dokumen = ?`;
        const sqlKendala = `SELECT kendala,keterangan, checklist,referensi FROM kendala WHERE kode_dokumen = ?`;

        try{
            const resultMain = await this.moshelpPGDB.sequelize.query(sqlMain,{replacements:[input.kode_dokumen]},{raw:true});
            const resultSkenario = await this.moshelpPGDB.sequelize.query(sqlSkenario,{replacements:[input.kode_dokumen]},{raw:true});
            const resultKendala = await this.moshelpPGDB.sequelize.query(sqlKendala,{replacements:[input.kode_dokumen]},{raw:true});
            return{
                success:true,
                data:{
                    main:resultMain[0][0],
                    skenarios:resultSkenario[0],
                    kendalas : resultKendala[0]
                }
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


module.exports = DFTDatasource;