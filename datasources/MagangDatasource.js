class MagangDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllMagang(){
        const sql = `SELECT m.*, j.nama_jabatan 
        FROM magang m, jabatan j
        WHERE j.id = m.id_jabatan
        ORDER BY create_date DESC`;
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

    async getSingleMagang(input){
        const sql = `SELECT*FROM magang WHERE employee_id = '${input.employee_id}'`;
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

    async addMagang(input){
        const sql = `
        INSERT INTO magang VALUES (
            '${input.employee_id}',
            '${input.nama}',
            '${input.pic_employee_id}',
            current_timestamp,
            current_timestamp,
            ${input.id_jabatan}
        );
        `;
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

    async updateMagang(input){
        const sql = `
        UPDATE magang
        SET employee_id = '${input.employee_id}',
        nama = '${input.nama}',
        pic_employee_id = '${input.pic_employee_id}',
        update_date = current_timestamp,
        id_jabatan = '${input.id_jabatan}'
        WHERE employee_id = ${input.employee_id_awal}
        `;
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

    async deleteMagang(input){
        const sql = `DELETE FROM magang WHERE employee_id = '${input.employee_id}'`;
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

module.exports = MagangDatasource;