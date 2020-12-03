class ProjectDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllProject(){
        const sql = `SELECT*FROM project ORDER BY create_date`;
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

    async getAuthenticatedProject(input){
        const sql = `select p.kode_project,p.nama_project
        from project p, akses a
        where p.kode_project  = a.kode_project and a.employee_id = ${input.employee_id}`;

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

    async getSingleProject(input){
        const sql = `SELECT*FROM project WHERE kode_project = '${input.kode_project}'`;
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

    async addProject(input){
        const sql = `
        INSERT INTO project (kode_project,nama_project,deskripsi) VALUES
        ('${input.kode_project}','${input.nama_project}','${input.deskripsi}')
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

    async updateProject(input){
        const sql = `
        UPDATE project 
        SET 
        kode_project = '${input.kode_project}',
        nama_project = '${input.nama_project}',
        deskripsi = '${input.deskripsi}',
        update_date = current_timestamp
        WHERE kode_project = '${input.kode_project_awal}'
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

    async deleteProject(input){
        const sql = `DELETE FROM project WHERE kode_project = '${input.kode_project}'`;
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

module.exports = ProjectDatasource;