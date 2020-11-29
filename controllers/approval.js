const Datasource = require('../datasources/Datasource');

exports.getNeedToBeSigned = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result =await Datasource().ApprovalDatasource.getNeedToBeSigned(input);
    if(result.success){
        res.status(200).json({
            success:true,
            data:result.data
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}