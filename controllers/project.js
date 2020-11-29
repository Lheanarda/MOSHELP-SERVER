const Datasource = require('../datasources/Datasource');

exports.getProject = async(req,res,next)=>{
    const result = await Datasource().ProjectDatasource.getAllProject();
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

exports.getAuthenticatedProject = async(req,res,next)=>{
    const input = {};
    const employee_id = req.params.employee_id;
    input.employee_id = employee_id;
    const result = await Datasource().ProjectDatasource.getAuthenticatedProject(input);
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

exports.getSingleProject = async(req,res,next)=>{
    const input = {};
    input.kode_project =req.params.kode_project;
    const result = await Datasource().ProjectDatasource.getSingleProject(input);
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

exports.addProject = async(req,res,next)=>{
    const input = req.body;
    const result = await Datasource().ProjectDatasource.addProject(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'new project has been added'
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.updateProject = async(req,res,next)=>{
    const input = req.body;
    input.kode_project_awal = req.params.kode_project;
    const result = await Datasource().ProjectDatasource.updateProject(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`project ${input.kode_project} has been updated`
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.deleteProject = async(req,res,next)=>{
    const input = {};
    input.kode_project = req.params.kode_project;
    const result = await Datasource().ProjectDatasource.deleteProject(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`project ${input.kode_project} has been deleted`
        });
    }else{
        res.status(500).json({
            success:false,
            messgae:result.message
        })
    }
}