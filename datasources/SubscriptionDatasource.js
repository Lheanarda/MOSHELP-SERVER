class SubscriptionDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async addSubscription(input){
        const sql = `
        INSERT INTO push_subscription(endpoint, auth, p256dh, employee_id)
        VALUES (:endpoint,:auth,:p256dh,:employee_id)
        `;

        try{
            await this.moshelpPGDB.sequelize.query(sql,{
                replacements:{
                    endpoint:input.endpoint,
                    auth:input.auth,
                    p256dh:input.p256dh,
                    employee_id:input.employee_id
                }
            },{raw:true});
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

    async deleteSubscription(input){
        const sql = `DELETE FROM push_subscription 
        WHERE endpoint = ?`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.endpoint]},{raw:true});
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

    async getUserSubscriptionByCreateBy(kode_dokumen){
        const sql = `select ps.endpoint, ps.auth, ps.p256dh
        from push_subscription ps , users u , dokumen d 
        where u.employee_id = d.create_by and ps.employee_id = u.employee_id and 
        d.kode_dokumen  = ?`
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[kode_dokumen]},{raw:true});
            return{
                success:true,
                data:result[0]
            }
        }catch(e){
            console.log(e,"error");
            return{
                success:false,
                message:e
            }
        }

    }

    async getUserSubscriptionByLevelApproval(kode,level){
        const sql = `
        SELECT ps.endpoint, ps.auth, ps.p256dh
        FROM dokumen d, approval a, users u, push_subscription ps
        WHERE d.kode_dokumen = a.kode_dokumen AND
        a.employee_id = u.employee_id AND
        u.employee_id = ps.employee_id AND
        a.level_approval = ? AND
        d.kode_dokumen = ?
        UNION
        SELECT ps.endpoint, ps.auth, ps.p256dh
        FROM dokumen d, approval a, users u, push_subscription ps, magang m
        WHERE d.kode_dokumen = a.kode_dokumen AND
        a.employee_id = m.employee_id AND
        m.pic_employee_id = u.employee_id AND
        u.employee_id = ps.employee_id AND
        a.level_approval = ? AND
        d.kode_dokumen = ?
        `;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[level, kode,level,kode]},{raw:true});
            return{
                success:true,
                data:result[0]
            }
        }catch(e){
            console.log(e,"error");
            return{
                success:false,
                message:e
            }
        }
    }

    async getDocumentAndCurrentLevelApproval (id_approval){
        const sql = `SELECT level_approval, kode_dokumen, u.nama FROM approval a, users u 
        WHERE id=? AND
        u.employee_id = a.employee_id
        UNION
        SELECT level_approval, kode_dokumen, u.nama FROM approval a, users u, magang m
        WHERE id=? AND
        m.pic_employee_id = u.employee_id AND
        u.employee_id = a.employee_id`;
        try{
            const result = await this.moshelpPGDB.sequelize.query(sql,{replacements:[id_approval, id_approval]},{raw:true});
            return{
                success:true,
                data:result[0][0]
            }
        }catch(e){
            console.log(e,"error");
            return{
                success:false,
                message:e
            }
        }
    }
}

module.exports = SubscriptionDatasource;