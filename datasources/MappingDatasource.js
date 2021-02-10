class MappingDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getAllMapping(){
        const sql = `SELECT*FROM project_mapping`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,null,{raw:true});
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

    async getMappingByTipeDokumen(input){
        const sql = `SELECT*FROM project_mapping WHERE tipe_dokumen = ? ORDER BY nama_mapping`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.tipe_dokumen]},{raw:true});
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

    async getDetailMapping(input){
        const sql = `SELECT dm.nama_field, u.nama, u.employee_id, j.nama_jabatan FROM detail_mapping dm, users u, jabatan j
        WHERE u.employee_id = dm.employee_id AND id_mapping = ? AND 
        j.id = u.id_jabatan
        UNION
        SELECT dm.nama_field, m.nama, m.employee_id, j.nama_jabatan 
        FROM detail_mapping dm, users u, jabatan j, magang m
        WHERE m.employee_id = dm.employee_id AND m.pic_employee_id = u.employee_id AND id_mapping =  ?  AND 
        j.id = m.id_jabatan`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.id_mapping,input.id_mapping]},{raw:true});
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

    async addMapping(input){
        const sqlMainMapping = `INSERT INTO project_mapping (
            nama_mapping,
            tipe_dokumen,
            kode_project
        )VALUES(
            :nama, :tipe, :kode_project
        );
        `;

        const sqlLastId = `SELECT id_mapping FROM project_mapping WHERE id_mapping = (SELECT MAX(id_mapping) FROM project_mapping)`;

        const sqlDetailMappingDRF = `INSERT INTO detail_mapping (
            id_mapping,
            employee_id,
            nama_field
        ) VALUES 
        (?, ${input.request_by}, 'request_by'),
        (?, ${input.request_approved},'request_approved'),
        (?, ${input.developed_by},'developed_by'),
        (?, ${input.development_approved},'development_approved'),
        (?, ${input.approved},'approved')`;

        const sqlDetailMappingDFT_UAT = `INSERT INTO detail_mapping(
            id_mapping,
            employee_id,
            nama_field
        ) VALUES 
        (?, ${input.user1_id},'user1_id'),
        (?,${input.user2_id},'user2_id'),
        (?,${input.cheked_by_id},'checked_by_id'),
        (?,${input.request_by_id},'request_by_id'),
        (?,${input.approved_by_id},'approved_by_id'),
        (?,${input.approved_id},'approved_id')`;

        try{
            await this.moshelpPGDB.sequelize.query(sqlMainMapping,{replacements:{
                nama:input.nama_mapping,
                tipe:input.tipe_dokumen,
                kode_project:input.project
            }},{raw:true});

            const resultQueryId = await this.moshelpPGDB.sequelize.query(sqlLastId,null,{raw:true});
            const generatedMappingId = resultQueryId[0][0].id_mapping;

            switch(input.tipe_dokumen){
                case 'DRF':
                    await this.moshelpPGDB.sequelize.query(sqlDetailMappingDRF,{replacements:[
                        generatedMappingId,generatedMappingId,generatedMappingId,generatedMappingId,generatedMappingId
                    ]},{raw:true})
                    break;
                case 'DFT':
                case 'UAT':
                    await this.moshelpPGDB.sequelize.query(sqlDetailMappingDFT_UAT,{replacements:[
                        generatedMappingId,generatedMappingId,generatedMappingId,generatedMappingId,generatedMappingId,generatedMappingId
                    ]},{raw:true})
                    break;
                default:
                    return;
            }

            return{
                success:true
            }

        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }
    }

    async deleteMapping(input){
        const sqlMainMapping = `DELETE FROM project_mapping WHERE id_mapping = ?`;
        const sqlDetailMapping = `DELETE FROM detail_mapping WHERE id_mapping = ?`;
        try{
            await this.moshelpPGDB.sequelize.query(sqlDetailMapping,{replacements:[input.id_mapping]},{raw:true});
            await this.moshelpPGDB.sequelize.query(sqlMainMapping,{replacements:[input.id_mapping]},{raw:true});
            
            return{
                success:true
            }

        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }

    }

    async updateMapping(input){
        const sqlUpdateMainMapping = `UPDATE project_mapping 
        SET
        nama_mapping = :nama_mapping,
        kode_project = :kode_project
        WHERE id_mapping = :id_mapping`;

        const sqlUpdateDRFMapping = `
        update detail_mapping as dm 
        set 
        employee_id = u.employee_id
        from (values 
            (:id1,:request_by,'request_by'),
            (:id2,:request_approved,'request_approved'),
            (:id3,:developed_by,'developed_by'),
            (:id4,:development_approved,'development_approved'),
            (:id5,:approved,'approved')
        ) as u(id_mapping,employee_id,nama_field)
        where dm.id_mapping = u.id_mapping and dm.nama_field = u.nama_field 
        `;

        const sqlUpdateDFT_UAT = `
        update detail_mapping as dm 
        set 
        employee_id = u.employee_id
        from (values 
            (:id1,:user1_id,'user1_id'),
            (:id2,:user2_id,'user2_id'),
            (:id3,:cheked_by_id,'checked_by_id'),
            (:id4,:request_by_id,'request_by_id'),
            (:id5,:approved_by_id,'approved_by_id'),
            (:id6,:approved_id,'approved_id')
        ) as u(id_mapping,employee_id,nama_field)
        where dm.id_mapping = u.id_mapping and dm.nama_field = u.nama_field 
        `;

         try{
            await this.moshelpPGDB.sequelize.query(sqlUpdateMainMapping,{
                replacements:{
                    id_mapping:input.id_mapping,
                    nama_mapping:input.nama_mapping,
                    kode_project:input.project
                }
            },{raw:true});

            switch(input.tipe_dokumen){
                case 'DRF':
                await this.moshelpPGDB.sequelize.query(sqlUpdateDRFMapping,{replacements:{
                    id1:Number(input.id_mapping),
                    id2:Number(input.id_mapping),
                    id3:Number(input.id_mapping),
                    id4:Number(input.id_mapping),
                    id5:Number(input.id_mapping),
                    request_by:Number(input.request_by),
                    request_approved:Number(input.request_approved),
                    developed_by:Number(input.developed_by),
                    development_approved:Number(input.development_approved),
                    approved:Number(input.approved)
                }});
                    break;
                case 'DFT':
                case 'UAT':
                await this.moshelpPGDB.sequelize.query(sqlUpdateDFT_UAT,{replacements:{
                    id1:Number(input.id_mapping),
                    id2:Number(input.id_mapping),
                    id3:Number(input.id_mapping),
                    id4:Number(input.id_mapping),
                    id5:Number(input.id_mapping),
                    id6:Number(input.id_mapping),
                    user1_id:Number(input.user1_id),
                    user2_id:Number(input.user2_id),
                    cheked_by_id:Number(input.cheked_by_id),
                    request_by_id:Number(input.request_by_id),
                    approved_by_id:Number(input.approved_by_id),
                    approved_id:Number(input.approved_id)
                }})
                    break;
                default:
                    return;
                
            }
            return {
                success:true
            };
        }catch(e){
            console.log(e);
            return{
                success:false,
                message:e
            }
        }
    }

    async getMappingByUserAccess(input){
        const sql = `select pm.*
        from project p , users u , akses a2 ,project_mapping pm 
        where a2.employee_id  = u.employee_id and p.kode_project = a2.kode_project and pm.kode_project = p.kode_project and 
        u.employee_id = ? and pm.tipe_dokumen = ?
        ORDER BY pm.nama_mapping`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.employee_id,input.tipe_dokumen]},{raw:true});
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

module.exports = MappingDatasource;