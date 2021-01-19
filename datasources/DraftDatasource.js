class DraftDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getDraftByUser(input){
       const sql = `
       select id_draft_drf as "id",projects, title,'DRF' as "tipe", update_date as "date" from draft_drf dd 
        where employee_id = ?
        union
        select id_draft_dft_uat as "id",projects, project_name as "title", tipe_dokumen as "tipe", update_date_draft as "date" from draft_dft_uat ddu 
        where employee_id = ?
        order by "date" desc`;
                    
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id,input.employee_id]},{raw:true});
            return{
                success:true,
                data:result[0]
            }
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }

    async addDraftDRF(input){
        const sql = `
        INSERT INTO draft_drf (
            reference_id,
            request_type,
            request_date,
            est_due_date,
            priority,
            project_name,
            title,
            technology,
            dev_level,
            ext_partner,
            int_team,
            brief_desc,
            detail_req,
            standard_testing,
            standard_date,
            standard_pic,
            standard_notes,
            advanced_testing,
            advanced_date,
            advanced_pic,
            advanced_notes,
            request_by_date,
            request_by_name,
            request_by_job,
            request_approved_date,
            request_approved_name,
            request_approved_job,
            developed_by_date,
            developed_by_name,
            developed_by_job,
            development_approved_date,
            development_approved_name,
            development_approved_job,
            approved_date,
            approved_name,
            approved_job,
            employee_id,
            projects,
            request_by,
            request_approved,
            developed_by,
            development_approved,
            approved
        ) VALUES (
            :reference_id,
            :request_type,
            :request_date,
            :est_due_date,
            :priority,
            :project_name,
            :title,
            :technology,
            :dev_level,
            :ext_partner,
            :int_team,
            :brief_desc,
            :detail_req,
            :standard_testing,
            :standard_date,
            :standard_pic,
            :standard_notes,
            :advanced_testing,
            :advanced_date,
            :advanced_pic,
            :advanced_notes,
            :request_by_date,
            :request_by_name,
            :request_by_job,
            :request_approved_date,
            :request_approved_name,
            :request_approved_job,
            :developed_by_date,
            :developed_by_name,
            :developed_by_job,
            :development_approved_date,
            :development_approved_name,
            :development_approved_job,
            :approved_date,
            :approved_name,
            :approved_job,
            :employee_id,
            :projects,
            :request_by,
            :request_approved,
            :developed_by,
            :development_approved,
            :approved
        );
        `;

        try{
            await this.moshelpPGDB.sequelize.query(sql,{
                replacements:{
                    reference_id : input.reference_id,
                    request_type : input.request_type,
                    request_date: input.request_date ? input.request_date :null,
                    est_due_date: input.est_due_date ? input.est_due_date : null,
                    priority: input.priority,
                    project_name: input.project_name,
                    title: input.title,
                    technology: input.technology,
                    dev_level: input.dev_level,
                    ext_partner: input.ext_partner,
                    int_team: input.int_team,
                    brief_desc: input.brief_desc,
                    detail_req: input.detail_req,
                    standard_testing: input.standard_testing,
                    standard_date: input.standard_date ? input.standard_date : null,
                    standard_pic: input.standard_pic,
                    standard_notes: input.standard_notes,
                    advanced_testing: input.advanced_testing,
                    advanced_date: input.advanced_date ? input.advanced_date : null,
                    advanced_pic: input.advanced_pic,
                    advanced_notes: input.advanced_notes,
                    request_by_date: null,
                    request_by_name: input.request_by_name,
                    request_by_job: input.request_by_job,
                    request_approved_date: null,
                    request_approved_name: input.request_approved_name,
                    request_approved_job: input.request_approved_job,
                    developed_by_date: null,
                    developed_by_name: input.developed_by_name,
                    developed_by_job: input.developed_by_job,
                    development_approved_date: null,
                    development_approved_name: input.development_approved_name,
                    development_approved_job: input.development_approved_job,
                    approved_date:null,
                    approved_name: input.approved_name,
                    approved_job: input.approved_job,
                    employee_id: input.employee_id,
                    projects: input.projects ? input.projects : null,
                    request_by: input.request_by ? input.request_by : null,
                    request_approved: input.request_approved ? input.request_approved : null,
                    developed_by: input.developed_by ? input.developed_by:null,
                    development_approved: input.development_approved ? input.development_approved : null,
                    approved: input.approved ? input.approved : null
                }
            },{raw:true});
            return{
                success:true
            }
        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }
    }

    async updateDraftDRF(input){
        const sql = `UPDATE draft_drf SET
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
            advanced_pic =:advanced_pic,
            advanced_notes = :advanced_notes,
            request_by_date = :request_by_date,
            request_by_name = :request_by_name,
            request_by_job = :request_by_job,
            request_approved_date =:request_approved_date,
            request_approved_name =:request_approved_name,
            request_approved_job = :request_approved_job,
            developed_by_date = :developed_by_date,
            developed_by_name = :developed_by_name,
            developed_by_job = :developed_by_job,
            development_approved_date = :development_approved_date,
            development_approved_name = :development_approved_name,
            development_approved_job = :development_approved_job,
            approved_date = :approved_date,
            approved_name = :approved_name,
            approved_job = :approved_job,
            employee_id = :employee_id,
            projects = :projects,
            request_by = :request_by,
            request_approved = :request_approved,
            developed_by = :developed_by,
            development_approved = :development_approved,
            approved = :approved,
            update_date = CURRENT_TIMESTAMP
        WHERE id_draft_drf = :id_draft `;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{
                replacements:{
                    reference_id : input.reference_id,
                    request_type : input.request_type,
                    request_date: input.request_date ? input.request_date :null,
                    est_due_date: input.est_due_date ? input.est_due_date : null,
                    priority: input.priority,
                    project_name: input.project_name,
                    title: input.title,
                    technology: input.technology,
                    dev_level: input.dev_level,
                    ext_partner: input.ext_partner,
                    int_team: input.int_team,
                    brief_desc: input.brief_desc,
                    detail_req: input.detail_req,
                    standard_testing: input.standard_testing,
                    standard_date: input.standard_date ? input.standard_date : null,
                    standard_pic: input.standard_pic,
                    standard_notes: input.standard_notes,
                    advanced_testing: input.advanced_testing,
                    advanced_date: input.advanced_date ? input.advanced_date : null,
                    advanced_pic: input.advanced_pic,
                    advanced_notes: input.advanced_notes,
                    request_by_date: null,
                    request_by_name: input.request_by_name,
                    request_by_job: input.request_by_job,
                    request_approved_date: null,
                    request_approved_name: input.request_approved_name,
                    request_approved_job: input.request_approved_job,
                    developed_by_date: null,
                    developed_by_name: input.developed_by_name,
                    developed_by_job: input.developed_by_job,
                    development_approved_date: null,
                    development_approved_name: input.development_approved_name,
                    development_approved_job: input.development_approved_job,
                    approved_date:null,
                    approved_name: input.approved_name,
                    approved_job: input.approved_job,
                    employee_id: input.employee_id,
                    projects: input.projects ? input.projects : null,
                    request_by: input.request_by ? input.request_by : null,
                    request_approved: input.request_approved ? input.request_approved : null,
                    developed_by: input.developed_by ? input.developed_by:null,
                    development_approved: input.development_approved ? input.development_approved : null,
                    approved: input.approved ? input.approved : null,
                    id_draft:input.id_draft
                }
            },{raw:true});
            return{
                success:true
            }
        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }
    }
    async deleteDRF(input){
        const sql = `DELETE FROM draft_drf WHERE id_draft_drf = ?`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.id]},{raw:true});
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

    async addDraftDFT_UAT(input){
        const sqlInsertDraft = `INSERT INTO draft_dft_uat (
            request_by,
            project_name,
            create_date,
            approved_by,
            document_type,
            user1,
            user2,
            checked_by_name,
            checked_by_job,
            request_by_name,
            request_by_job,
            approved_by_name,
            approved_by_job,
            approved_name,
            approved_job,
            tipe_dokumen,
            user1_date,
            user2_date,
            checked_by_date,
            request_by_date,
            approved_by_date,
            approved_date,
            tipe,
            platform,
            employee_id,
            user1_id,
            user2_id,
            checked_by_id,
            request_by_id,
            approved_by_id,
            approved_id,
            projects,
            projects_name
        ) VALUES (
            :request_by,
            :project_name,
            :create_date,
            :approved_by,
            :document_type,
            :user1,
            :user2,
            :checked_by_name,
            :checked_by_job,
            :request_by_name,
            :request_by_job,
            :approved_by_name,
            :approved_by_job,
            :approved_name,
            :approved_job,
            :tipe_dokumen,
            :user1_date,
            :user2_date,
            :checked_by_date,
            :request_by_date,
            :approved_by_date,
            :approved_date,
            :tipe,
            :platform,
            :employee_id,
            :user1_id,
            :user2_id,
            :checked_by_id,
            :request_by_id,
            :approved_by_id,
            :approved_id,
            :projects,
            :projects_name
        )`;

        const sqlId = `SELECT id_draft_dft_uat FROM draft_dft_uat WHERE id_draft_dft_uat = (SELECT MAX(id_draft_dft_uat) FROM draft_dft_uat)`;
        //skenario sql
        let skenarioSqlInput ='';
        const generateSkenarioSQL = (input,sql,id)=>{
            input.skenarios.forEach((skenario,idx)=>{
                sql+= `(
                    ${skenario.skenario ? `'${skenario.skenario}'` : null},
                    ${skenario.keterangan ? `'${skenario.keterangan}'` : null},
                    '${skenario.checklist1 ? 'Y':'N'}',
                    '${skenario.checklist2 ? 'Y':'N'}',
                    ${skenario.referensi ? `'${skenario.referensi}'`:null},
                    '${id}'
                    )`;
                
                if(idx !== input.skenarios.length-1){
                    sql+=',';
                }
            });
            return sql;
        }

        //kendala sql
        let kendalaSqlInput = '';
        
        const generateKendalaSQL = (input,sql,id) =>{
            if(input.kendalas.length>0){
                input.kendalas.forEach((kendala,idx)=>{
                    sql+=`(
                        ${kendala.kendala ? `'${kendala.kendala}'`:null},
                        ${kendala.keterangan ? `'${kendala.keterangan}'`:null},
                        '${kendala.checklist?'Y':'N'}',
                        ${kendala.referensi ? `'${kendala.referensi}'`:null},
                        '${id}'
                    )`;
        
                    if(idx !== input.kendalas.length-1){
                        sql+=',';
                    }
                });
                return sql;
            }
        }
        

        try{
            await this.moshelpPGDB.sequelize.query(sqlInsertDraft,{
                replacements:{
                    request_by : input.request_by,
                    project_name : input.project_name,
                    create_date : input.create_date,
                    approved_by : input.approved_by,
                    document_type : input.document_type,
                    user1 : input.user1,
                    user2 : input.user2,
                    checked_by_name : input.checked_by_name,
                    checked_by_job : input.checked_by_job,
                    request_by_name : input.request_by_name,
                    request_by_job : input.request_by_job,
                    approved_by_name : input.approved_by_name,
                    approved_by_job : input.approved_by_job,
                    approved_name: input.approved_name,
                    approved_job : input.approved_job,
                    tipe_dokumen : input.tipe_dokumen,
                    user1_date : null,
                    user2_date : null,
                    checked_by_date : null,
                    request_by_date : null,
                    approved_by_date : null,
                    approved_date : null,
                    tipe : input.tipe,
                    platform : input.platform,
                    employee_id : input.employee_id,
                    user1_id : input.user1_id ? input.user1_id : null,
                    user2_id : input.user2_id ? input.user2_id : null,
                    checked_by_id : input.checked_by_id ? input.checked_by_id : null,
                    request_by_id : input.request_by_id ? input.request_by_id : null,
                    approved_by_id : input.approved_by_id ? input.approved_by_id : null,
                    approved_id : input.approved_id ? input.approved_id : null,
                    projects : input.projects ? input.projects:null,
                    projects_name:input.projects_name
                }
            },{raw:true});

            const lastInserted = await this.moshelpPGDB.sequelize.query(sqlId,null,{raw:true});
            const id = lastInserted[0][0].id_draft_dft_uat;

            skenarioSqlInput = generateSkenarioSQL(input,skenarioSqlInput,id);
            kendalaSqlInput = generateKendalaSQL(input,kendalaSqlInput,id);

            const sqlAddSkenario = `INSERT INTO draft_skenario (
                skenario,
                keterangan,
                checklist1,
                checklist2,
                referensi,
                id_draft_dft_uat
            )VALUES${skenarioSqlInput}`;

            const sqlAddKendala = `INSERT INTO draft_kendala (
                kendala,
                keterangan,
                checklist,
                referensi,
                id_draft_dft_uat
            )VALUES ${kendalaSqlInput}`;

            await this.moshelpPGDB.sequelize.query(sqlAddSkenario,null,{raw:true});
            if(input.kendalas.length>0){
                await this.moshelpPGDB.sequelize.query(sqlAddKendala,null,{raw:true});
            }
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
    async updateDraftDFT_UAT(input){
        const sqlUpdateDraft = `UPDATE draft_dft_uat SET
            request_by = :request_by,
            project_name = :project_name,
            create_date = :create_date,
            approved_by = :approved_by,
            document_type = :document_type,
            user1 = :user1,
            user2 = :user2,
            checked_by_name = :checked_by_name,
            checked_by_job = :checked_by_job,
            request_by_name = :request_by_name,
            request_by_job = :request_by_job,
            approved_by_name = :approved_by_name,
            approved_by_job = :approved_by_job,
            approved_name = :approved_name,
            approved_job = :approved_job,
            tipe_dokumen = :tipe_dokumen,
            user1_date = :user1_date,
            user2_date = :user2_date,
            checked_by_date = :checked_by_date,
            request_by_date = :request_by_date,
            approved_by_date = :approved_by_date,
            approved_date = :approved_date,
            tipe = :tipe,
            platform = :platform,
            employee_id = :employee_id,
            user1_id = :user1_id,
            user2_id = :user2_id,
            checked_by_id = :checked_by_id,
            request_by_id = :request_by_id,
            approved_by_id = :approved_by_id,
            approved_id = :approved_id,
            projects = :projects,
            projects_name = :projects_name,
            update_date_draft = current_timestamp
            WHERE
            id_draft_dft_uat = :id_draft`;
        
        const sqlDeleteSkenario = `DELETE FROM draft_skenario WHERE id_draft_dft_uat = :id_draft`;
        const sqlDeleteKendala = `DELETE FROM draft_kendala WHERE id_draft_dft_uat = :id_draft`;
        //skenario sql
        let skenarioSqlInput ='';
        const generateSkenarioSQL = (input,sql,id)=>{
            input.skenarios.forEach((skenario,idx)=>{
                sql+= `(
                    ${skenario.skenario ? `'${skenario.skenario}'` : null},
                    ${skenario.keterangan ? `'${skenario.keterangan}'` : null},
                    '${skenario.checklist1 ? 'Y':'N'}',
                    '${skenario.checklist2 ? 'Y':'N'}',
                    ${skenario.referensi ? `'${skenario.referensi}'`:null},
                    '${id}'
                    )`;
                
                if(idx !== input.skenarios.length-1){
                    sql+=',';
                }
            });
            return sql;
        }

        //kendala sql
        let kendalaSqlInput = '';
        
        const generateKendalaSQL = (input,sql,id) =>{
            if(input.kendalas.length>0){
                input.kendalas.forEach((kendala,idx)=>{
                    sql+=`(
                        ${kendala.kendala ? `'${kendala.kendala}'`:null},
                        ${kendala.keterangan ? `'${kendala.keterangan}'`:null},
                        '${kendala.checklist?'Y':'N'}',
                        ${kendala.referensi ? `'${kendala.referensi}'`:null},
                        '${id}'
                    )`;
        
                    if(idx !== input.kendalas.length-1){
                        sql+=',';
                    }
                });
                return sql;
            }
        }

        try{
            //update
            await this.moshelpPGDB.sequelize.query(sqlUpdateDraft,{
                replacements:{
                    request_by : input.request_by,
                    project_name : input.project_name,
                    create_date : input.create_date,
                    approved_by : input.approved_by,
                    document_type : input.document_type,
                    user1 : input.user1,
                    user2 : input.user2,
                    checked_by_name : input.checked_by_name,
                    checked_by_job : input.checked_by_job,
                    request_by_name : input.request_by_name,
                    request_by_job : input.request_by_job,
                    approved_by_name : input.approved_by_name,
                    approved_by_job : input.approved_by_job,
                    approved_name : input.approved_name,
                    approved_job : input.approved_job,
                    tipe_dokumen : input.tipe_dokumen,
                    user1_date : null,
                    user2_date : null,
                    checked_by_date : null,
                    request_by_date : null,
                    approved_by_date : null,
                    approved_date : null,
                    tipe : input.tipe,
                    platform : input.platform,
                    employee_id : input.employee_id,
                    user1_id : input.user1_id ? input.user1_id : null,
                    user2_id : input.user2_id ? input.user2_id : null,
                    checked_by_id : input.checked_by_id ? input.checked_by_id : null,
                    request_by_id : input.request_by_id ? input.request_by_id : null,
                    approved_by_id : input.approved_by_id ? input.approved_by_id : null,
                    approved_id : input.approved_id ? input.approved_id : null,
                    projects : input.projects ? input.projects:null,
                    projects_name:input.projects_name,
                    id_draft : input.id_draft
                }
            },{raw:true});
            
            //delete
            await this.moshelpPGDB.sequelize.query(sqlDeleteKendala,{replacements:{id_draft:input.id_draft}},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDeleteSkenario,{replacements:{id_draft:input.id_draft}},{raw:true});

            //insert kendala & skenario

            skenarioSqlInput = generateSkenarioSQL(input,skenarioSqlInput,input.id_draft);
            kendalaSqlInput = generateKendalaSQL(input,kendalaSqlInput,input.id_draft);

            const sqlAddSkenario = `INSERT INTO draft_skenario (
                skenario,
                keterangan,
                checklist1,
                checklist2,
                referensi,
                id_draft_dft_uat
            )VALUES${skenarioSqlInput}`;

            const sqlAddKendala = `INSERT INTO draft_kendala (
                kendala,
                keterangan,
                checklist,
                referensi,
                id_draft_dft_uat
            )VALUES ${kendalaSqlInput}`;

            await this.moshelpPGDB.sequelize.query(sqlAddSkenario,null,{raw:true});
            if(input.kendalas.length>0){
                await this.moshelpPGDB.sequelize.query(sqlAddKendala,null,{raw:true});
            }
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
    async deleteDFT_UAT(input){
        const sqlDeleteSkenario = `DELETE FROM draft_skenario WHERE id_draft_dft_uat = ?`;
        const sqlDeleteKendala = `DELETE FROM draft_kendala WHERE id_draft_dft_uat = ?`;
        const sqlDeleteDraft = `DELETE FROM draft_dft_uat WHERE id_draft_dft_uat = ?`;
        try{
            await this.moshelpPGDB.sequelize.query(sqlDeleteSkenario,{replacements:[input.id]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDeleteKendala,{replacements:[input.id]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDeleteDraft,{replacements:[input.id]},{raw:true});
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

    async getDetailDraftDRF(input){
        const sql = `SELECT*FROM draft_drf WHERE id_draft_drf = ?`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.id_draft]},{raw:true});
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

    async getDetailDraftDFT_UAT(input){
        const sqlMain =`SELECT*FROM draft_dft_uat WHERE id_draft_dft_uat = ?`;
        const sqlSkenario = `select CAST(row_number() OVER (ORDER BY skenario ) as int) as no, skenario , checklist1 , checklist2 , keterangan , referensi FROM draft_skenario WHERE id_draft_dft_uat = ?`;
        const sqlKendala = `select CAST(row_number() OVER (ORDER BY kendala ) as int) AS no, kendala , checklist , keterangan, referensi FROM draft_kendala dk WHERE id_draft_dft_uat = ?`;

        try{
            const resultMain = await this.moshelpPGDB.sequelize.query(sqlMain,{replacements:[input.id_draft]},{raw:true});
            const resultSkenario = await this.moshelpPGDB.sequelize.query(sqlSkenario,{replacements:[input.id_draft]},{raw:true});
            const resultKendala = await this.moshelpPGDB.sequelize.query(sqlKendala,{replacements:[input.id_draft]},{raw:true});
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

module.exports = DraftDatasource;