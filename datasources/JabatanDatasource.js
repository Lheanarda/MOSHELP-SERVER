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
        const sql = `SELECT*FROM jabatan WHERE id = ${inputs.id}`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,null,{raw:true});
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
        const sql = `INSERT INTO jabatan(nama_jabatan,deskripsi) VALUES('${input.nama_jabatan}','${input.deskripsi}')`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,null,{raw:true});
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
        SET nama_jabatan = '${input.nama_jabatan}',
        deskripsi = '${input.deskripsi}',
        update_date = current_timestamp
        WHERE id = ${input.id}`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,null,{raw:true});
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
        const sql = `DELETE FROM jabatan WHERE id ='${input.id}'`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,null,{raw:true});
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