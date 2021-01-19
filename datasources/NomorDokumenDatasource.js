class NomorDokumenDatasource{
    constructor({moshelpPGDB}){
        this.moshelpPGDB = moshelpPGDB;
    }

    async addDokumen(input){
        const sql = `INSERT INTO nomor_dokumen(tipe_dokumen,kode_project) VALUES (?,?)`;
        const sqlLastNomor = `SELECT*FROM nomor_dokumen WHERE sequence = (SELECT MAX(sequence) FROM nomor_dokumen)`;
        try{
            await this.moshelpPGDB.sequelize.query(sql,{replacements:[input.tipe_dokumen,input.projects]},{raw:true}); //insert
            const result = await this.moshelpPGDB.sequelize.query(sqlLastNomor,null,{raw:true}); //select last
            const data = result[0][0];
            //generate kode
            const kode = `${data.tipe_dokumen.toUpperCase()}-${data.kode_project}-${data.tahun}-${data.sequence.toString().padStart(5,'0')}`;
            return {
                success:true,
                data:{kode,sequence : data.sequence}
            };
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }
}

module.exports = NomorDokumenDatasource;