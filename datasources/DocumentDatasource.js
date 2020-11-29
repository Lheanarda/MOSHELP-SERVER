class DocumentDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getDocumentsNotApproved(input){
        const sql = `
        SELECT d.kode_dokumen, d.nama_project, d.update_date 
        FROM dokumen d, nomor_dokumen nd, project p, akses a
        WHERE d.nomor_dokumen = nd.sequence AND 
        nd.kode_project = p.kode_project AND 
        p.kode_project = a.kode_project and
        d.approved = 'N' AND
        a.employee_id = ${input.employee_id}
        ORDER BY update_date DESC 
        LIMIT 10
        `;
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

    async getDocumentsApproved(input){
        const sql = `
        SELECT d.kode_dokumen, d.nama_project, d.update_date 
        FROM dokumen d, nomor_dokumen nd, project p, akses a
        WHERE d.nomor_dokumen = nd.sequence AND 
        nd.kode_project = p.kode_project AND 
        p.kode_project = a.kode_project and
        d.approved = 'Y' AND
        a.employee_id = ${input.employee_id}
        ORDER BY update_date DESC
        LIMIT 10`;
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
}

module.exports = DocumentDatasource;