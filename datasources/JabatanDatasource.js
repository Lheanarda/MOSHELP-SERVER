class JabatanDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllJabatan(){
        const sql = "SELECT*FROM jabatan ORDER BY id";
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

    async getSingleJabatan(inputs){
        const sql = `SELECT*FROM jabatan WHERE id = ?`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[inputs.id]},{raw:true});
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

    async addJabatan(input){
        const sql = `INSERT INTO jabatan(nama_jabatan,deskripsi) VALUES(?,?)`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.nama_jabatan,input.deskripsi]},{raw:true});
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

    async updateJabatan(input){
        const sql = `UPDATE jabatan
        SET nama_jabatan =  :jabatan,
        deskripsi = :deskripsi,
        update_date = current_timestamp
        WHERE id = :id `;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:{
                jabatan:input.nama_jabatan,
                deskripsi:input.deskripsi,
                id:input.id
            }},{raw:true});
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

    async deleteJabatan(input){
        const sql = `DELETE FROM jabatan WHERE id =?`;
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
}

module.exports = JabatanDatasource;