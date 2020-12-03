const Datasource = require('../datasources/Datasource');

exports.getAkses = async(req,res,next)=>{
    const result = await Datasource().AksesDatasource.getAllAkses();
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

exports.getSingleAkses = async(req,res,next)=>{
    const input = {};
    input.kode_project = req.params.kode_project;
    input.employee_id = req.params.employee_id;
    const result = await Datasource().AksesDatasource.getSingleAkses(input);
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

exports.getAksesByEmployee = async(req,res,next)=>{
    const input={};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().AksesDatasource.getAksesByEmployee(input);
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

exports.getIfAksesAll = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().AksesDatasource.getIfAksesAll(input);
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

exports.getAksesByProject = async(req,res,next)=>{
    const input = {};
    input.kode_project = req.params.kode_project;
    const result = await Datasource().AksesDatasource.getAksesByProject(input);
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

exports.addAkses = async(req,res,next)=>{
    const input = req.body;
    const result = await Datasource().AksesDatasource.addAkses(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'new akses has been added'
        });
    }else{
        res.status(500).json({
            success:false,
            messgae:result.message
        })
    }
}

exports.updateAkses = async(req,res,next)=>{
    const input = req.body;
    input.kode_project_awal = req.params.kode_project;
    input.employee_id_awal = req.params.employee_id;

    const result = await Datasource().AksesDatasource.updateAkses(input);

    if(result.success){
        res.status(200).json({
            success:true,
            message:`akses ${input.employee_id_awal} has been updated`
        });
    }else{
        res.status(500).json({
            success:false,
            messgae:result.message
        })
    }
}


exports.deleteAkses = async(req,res,next)=>{
    const input = {};
    input.kode_project = req.params.kode_project;
    input.employee_id = req.params.employee_id;
    const result = await Datasource().AksesDatasource.deleteAkses(input);

    if(result.success){
        res.status(200).json({
            success:true,
            message:`akses ${input.employee_id} untuk ${input.kode_project} has been deleted`
        });
    }else{
        res.status(500).json({
            success:false,
            messgae:result.message
        })
    }
}