class DocumentDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getDocumentsNotApproved(input){
        const sql = `
        SELECT d.kode_dokumen, d.nama_project, d.create_date, d.update_date 
        FROM dokumen d, nomor_dokumen nd, project p, akses a
        WHERE d.nomor_dokumen = nd.sequence AND 
        nd.kode_project = p.kode_project AND 
        p.kode_project = a.kode_project and
        d.approved = 'N' AND
        a.employee_id = ?
        ORDER BY update_date DESC 
        LIMIT 10
        `;
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

    async getDocumentsApproved(input){
        const sql = `
        SELECT d.kode_dokumen, d.nama_project,d.create_date, d.update_date 
        FROM dokumen d, nomor_dokumen nd, project p, akses a
        WHERE d.nomor_dokumen = nd.sequence AND 
        nd.kode_project = p.kode_project AND 
        p.kode_project = a.kode_project and
        d.approved = 'Y' AND
        a.employee_id = ?
        ORDER BY update_date DESC
        LIMIT 10`;
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

    async getApprovedDRF(input){
        const sql = `select d.kode_dokumen, d.nama_project
        from dokumen d, nomor_dokumen nd , project p , akses a 
        where 
        d.nomor_dokumen = nd.sequence and 
        nd.kode_project = p.kode_project and 
        p.kode_project = a.kode_project and 
        nd.tipe_dokumen = 'DRF' and 
        d.approved = 'Y' and
        a.employee_id = ?`;
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

    async getSearchNotApprovedDocument(input){
        const sql = `SELECT d.kode_dokumen, d.nama_project, d.create_date, d.update_date 
        FROM dokumen d, nomor_dokumen nd, project p, akses a
        WHERE d.nomor_dokumen = nd.sequence AND 
        nd.kode_project = p.kode_project AND 
        p.kode_project = a.kode_project and
        d.approved = 'N' AND
        a.employee_id = ? and 
        lower(d.kode_dokumen) like '%${input.term.toLowerCase()}%'
        ORDER BY update_date DESC`;
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

    async getSearchApprovedDocument(input){
        const sql = `SELECT d.kode_dokumen, d.nama_project,d.create_date, d.update_date 
        FROM dokumen d, nomor_dokumen nd, project p, akses a
        WHERE d.nomor_dokumen = nd.sequence AND 
        nd.kode_project = p.kode_project AND 
        p.kode_project = a.kode_project and
        d.approved = 'Y' AND
        a.employee_id = ? and 
        lower(d.kode_dokumen) like '%${input.term.toLowerCase()}%'
        ORDER BY update_date DESC`;
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

    async getDocumentsCreatedBy(input){
        const sql = `
        SELECT kode_dokumen, nama_project, create_date,create_date, update_date 
        FROM dokumen 
        WHERE create_by = ?
        ORDER BY update_date DESC`;
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

    async getDocumentsSignedBy(input){
        const sql = `
        SELECT a.kode_dokumen, d.nama_project , d.create_date , d.update_date 
        from approval a , dokumen d
        where a.kode_dokumen = d.kode_dokumen and 
        a.employee_id =?  and 
        a.approved = 'Y'
        UNION
        SELECT a.kode_dokumen, d2.nama_project , d2.create_date , d2.update_date 
        from approval a , dokumen d2
        where a.kode_dokumen = d2.kode_dokumen and 
        a.employee_id IN (select m2.employee_id from users u2 , magang m2 where m2.pic_employee_id = u2.employee_id and u2.employee_id =?)  and 
        a.approved = 'Y'
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

    async abortDocument(input){
        const sqlDeleteDRF = `DELETE FROM drf WHERE kode_dokumen = ?`;
        const sqlDeleteApproval = `DELETE FROM approval WHERE kode_dokumen = ?`;
        const sqlDeleteSkenario =  `DELETE FROM skenario WHERE kode_dokumen = ?`;
        const sqlDeleteKendala = `DELETE FROM kendala WHERE kode_dokumen = ?`;
        const sqlDeleteDFT_UAT =  `DELETE FROM dft_uat WHERE kode_dokumen = ?`;
        const sqlDeleteDocument = `DELETE FROM dokumen WHERE kode_dokumen = ?`;
        const sqlInsertDeletedDocument = `INSERT INTO deleted_documents VALUES (?,?,?)`;

        try{
            if(input.tipe==='DRF'){
                await this.moshelpPGDB.sequelize.query(sqlDeleteDRF,{replacements:[input.kode_dokumen]},{raw:true});
            }else if (input.tipe==='DFT' || input.tipe==='UAT'){
                await this.moshelpPGDB.sequelize.query(sqlDeleteSkenario,{replacements:[input.kode_dokumen]},{raw:true});
                await this.moshelpPGDB.sequelize.query(sqlDeleteKendala,{replacements:[input.kode_dokumen]},{raw:true});
                await this.moshelpPGDB.sequelize.query(sqlDeleteDFT_UAT,{replacements:[input.kode_dokumen]},{raw:true});
            }
            await this.moshelpPGDB.sequelize.query(sqlDeleteApproval,{replacements:[input.kode_dokumen]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlDeleteDocument,{replacements:[input.kode_dokumen]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlInsertDeletedDocument,{replacements:[
                input.kode_dokumen,input.employee_id,input.keterangan
            ]},{raw:true});
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
}

module.exports = DocumentDatasource;
