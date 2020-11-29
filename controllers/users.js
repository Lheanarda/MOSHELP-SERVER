const Datasource = require('../datasources/Datasource');

exports.getUsers = async(req,res,next)=>{
    const result = await Datasource().UsersDatasource.getAllUsers();

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

exports.getUserAndJobs = async(req,res,next)=>{
    const result = await Datasource().UsersDatasource.getUserAndJob();
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

exports.getSingleUsers = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().UsersDatasource.getSingleUsers(input);
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

exports.addUsers = async(req,res,next)=>{
    const input = req.body;
    const result = await Datasource().UsersDatasource.addUsers(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'new user has been added'
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.updateUsers = async(req,res,next)=>{
    const input = req.body;
    input.employee_id_awal = req.params.employee_id;
    const result = await Datasource().UsersDatasource.updateUsers(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`users ${input.employee_id} has been updated`
        });
    }else{
        res.status(500).json({
            success:false,
            messgae:result.message
        })
    }
}

exports.deleteUsers = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().UsersDatasource.deleteUsers(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`jabatan ${input.employee_id} has been deleted`
        });
    }else{
        res.status(500).json({
            success:false,
            messgae:result.message
        })
    }
}