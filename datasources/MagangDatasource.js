class MagangDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllMagang(){
        const sql = `SELECT m.*, j.nama_jabatan, u.nama as "nama_pic"
        FROM magang m, jabatan j, users u
        WHERE j.id = m.id_jabatan AND u.employee_id = m.pic_employee_id
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
        const sql = `SELECT*FROM magang WHERE employee_id = ?`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id]},{raw:true});
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
            :employee_id,
            :nama,
            :pic_employee_id,
            current_timestamp,
            current_timestamp,
            :id_jabatan
        );
        `;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:{
                employee_id:input.employee_id,
                nama:input.nama,
                pic_employee_id:input.pic_employee_id,
                id_jabatan:input.id_jabatan
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

    async updateMagang(input){
        const sql = `
        UPDATE magang
        SET employee_id = :employee_id ,
        nama = :nama ,
        pic_employee_id = :pic_employee_id ,
        update_date = current_timestamp,
        id_jabatan = :id_jabatan 
        WHERE employee_id = :employee_id_awal 
        `;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:{
                employee_id:input.employee_id,
                nama:input.nama,
                pic_employee_id:input.pic_employee_id,
                id_jabatan:input.id_jabatan,
                employee_id_awal:input.employee_id_awal
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

    async deleteMagang(input){
        const sql = `DELETE FROM magang WHERE employee_id = ?`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id]},{raw:true});
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