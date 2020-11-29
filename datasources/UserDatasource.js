class UserDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllUsers(){
        const sql = "SELECT*FROM users ORDER BY create_date";
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

    async getUserAndJob(){
        const sql = "SELECT u.employee_id, u.nama, j.nama_jabatan FROM users u, jabatan j WHERE j.id =u.id_jabatan";
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

    async getSingleUsers(input){
        const sql = `SELECT*FROM users WHERE employee_id = '${input.employee_id}'`;
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

    async addUsers(input){
        const sql = `
        INSERT INTO users (employee_id,nama_akun,nama,company,id_jabatan) VALUES
        ('${input.employee_id}','${input.nama_akun}','${input.nama}','${input.company}','${input.id_jabatan}');
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

    async updateUsers(input){
        const sql = `
        UPDATE users 
        SET employee_id = '${input.employee_id}',
        nama_akun = '${input.nama_akun}',
        nama = '${input.nama}',
        company = '${input.company}',
        id_jabatan = '${input.id_jabatan}'
        WHERE employee_id = '${input.employee_id_awal}'
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

    async deleteUsers(input){
        const sql = `DELETE FROM users WHERE employee_id = '${input.employee_id}'`;
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

module.exports = UserDatasource;