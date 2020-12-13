class ALLDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }
    async getALLProject(){
        const sql = `select kode_project , nama_project 
        from project p 
        where kode_project != 'ALL'`;
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

    async getALLDRF(){
        const sql = `select kode_dokumen,nama_project from dokumen d , nomor_dokumen nd 
        where nd.sequence = d.nomor_dokumen and nd.tipe_dokumen ='DRF' and d.approved='Y'`;
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

    async getALLDocumentNotApproved(){
        const sql = `select kode_dokumen ,nama_project ,create_date ,update_date 
        from dokumen d 
        where d.approved ='N'
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

    async getALLDocumentApproved(){
        const sql = `select kode_dokumen ,nama_project ,create_date ,update_date 
        from dokumen d 
        where d.approved ='Y'
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

    async getALLDocumentNotApprovedSearch(input){
        const sql = `select kode_dokumen ,nama_project ,create_date ,update_date 
        from dokumen d 
        where d.approved ='N' and lower(kode_dokumen) like '%${input.term}%'
        ORDER BY update_date DESC 
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

    async getALLDocumentApprovedSearch(input){
        const sql = `select kode_dokumen ,nama_project ,create_date ,update_date 
        from dokumen d 
        where d.approved ='Y' and lower(kode_dokumen) like '%${input.term}%'
        ORDER BY update_date DESC 
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
}

module.exports = ALLDatasource;