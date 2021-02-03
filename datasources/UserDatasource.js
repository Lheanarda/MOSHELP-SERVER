class UserDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllUsers(){
        const sql = `select u.*, j.nama_jabatan FROM users u, jabatan j 
        where j.id = u.id_jabatan 
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

    async getUserAndJob(){
        const sql = `SELECT u.employee_id, u.nama, j.nama_jabatan 
        FROM users u, jabatan j
        WHERE j.id =u.id_jabatan
        union 
        select m.employee_id ,m.nama ,j2.nama_jabatan 
        from users u2 , magang m ,jabatan j2 
        where m.pic_employee_id = u2.employee_id and j2.id = m.id_jabatan 
        ORDER BY nama
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

    async getSingleUsers(input){
        const sql = `SELECT*FROM users WHERE employee_id = ?`;
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

    async addUsers(input){
        const sql = `
        INSERT INTO users (employee_id,nama_akun,nama,company,id_jabatan) VALUES
        (?,?,?,?,?);
        `;

        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:[
                input.employee_id,input.nama_akun,input.nama,input.company,input.id_jabatan
            ]},{raw:true});
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
        SET employee_id = ?,
        nama_akun = ?,
        nama = ?,
        company = ?,
        id_jabatan = ?
        WHERE employee_id = ?
        `;

        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:[
                input.employee_id,input.nama_akun,input.nama,input.company,input.id_jabatan,input.employee_id_awal
            ]},{raw:true});
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
        const sql = `DELETE FROM users WHERE employee_id = ?`;
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
    
    async getLoginUserAdmin(input){
        const sql = `SELECT * FROM admin_users WHERE employee_id = ?`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id]},{raw:true});
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

    async getLoginUsers(input){
        const sql = `SELECT employee_id, create_date,id_jabatan,nama FROM users WHERE employee_id = ?`
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id]},{raw:true});
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
}

module.exports = UserDatasource;