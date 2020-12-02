class AksesDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllAkses(){
        const sql = `select a.*, u.nama, p.nama_project from akses a, users u, project p
        where a.employee_id = u.employee_id and a.kode_project = p.kode_project  
        ORDER BY update_date DESC;`;
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

    async getSingleAkses(input){
        const sql = `SELECT*FROM akses WHERE kode_project = '${input.kode_project}' AND employee_id= '${input.employee_id}'`;
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

    async getAksesByEmployee (input){
        const sql = `SELECT*FROM akses WHERE employee_id = '${input.employee_id}'`;
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

    async getAksesByProject(input){
        const sql = `SELECT*FROM akses WHERE kode_project = '${input.kode_project}'`;
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

    async addAkses(input){
        const sql = `
        INSERT INTO akses (kode_project,employee_id)
        VALUES ('${input.kode_project}','${input.employee_id}')
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

    async updateAkses(input){
        const sql = `
        UPDATE akses
        SET
        kode_project = '${input.kode_project}',
        employee_id = '${input.employee_id}',
        update_date = current_timestamp
        WHERE
        kode_project = '${input.kode_project_awal}' AND 
        employee_id = '${input.employee_id_awal}'
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

    async deleteAkses(input){
        const sql=  `DELETE FROM akses WHERE kode_project = '${input.kode_project}' AND employee_id = '${input.employee_id}'`;
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

module.exports = AksesDatasource;