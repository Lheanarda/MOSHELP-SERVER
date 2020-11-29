class ApprovalDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async getNeedToBeSigned(input){
        const sql = `
        select d.kode_dokumen, d.nama_project, d.update_date
        from dokumen d, approval a
        where 
        a.kode_dokumen  = d.kode_dokumen and 
        a.employee_id = ${input.employee_id} and 
        a.approved = 'N' and 
        a.level_approval = (select min (level_approval) from approval where approved ='N' and kode_dokumen = a.kode_dokumen);`;

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
}

module.exports = ApprovalDatasource;