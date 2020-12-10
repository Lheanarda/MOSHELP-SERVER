const Datasource = require('../datasources/Datasource');

exports.getAllMagang = async(req,res,next)=>{
    const result = await Datasource().MagangDatasource.getAllMagang();
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

exports.getSingleMagang = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().MagangDatasource.getSingleMagang(input);
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

exports.addMagang = async(req,res,next)=>{
    const input = req.body;
    const result = await Datasource().MagangDatasource.addMagang(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'new intern has been added'
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.updateMagang = async(req,res,next)=>{
    const input = req.body;
    input.employee_id_awal = req.params.employee_id;
    const result = await Datasource().MagangDatasource.updateMagang(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`intern ${input.employee_id} has been updated`
        });
    }else{
        res.status(500).json({
            success:false,
            messgae:result.message
        })
    }
}

exports.deleteMagang = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().MagangDatasource.deleteMagang(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`Intern ${input.employee_id} has been deleted`
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}
