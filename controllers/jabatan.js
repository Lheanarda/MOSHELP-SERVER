const Datasource = require('../datasources/Datasource');


exports.getJabatan = async(req,res,next)=>{
    const result = await Datasource().JabatanDatasource.getAllJabatan();
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

exports.getSingleJabatan = async(req,res,next)=>{
    const input = {};
    input.id = req.params.id;
    const result = await Datasource().JabatanDatasource.getSingleJabatan(input);
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

exports.addJabatan = async(req,res,next)=>{
    const input = req.body;
    const result = await Datasource().JabatanDatasource.addJabatan(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'new jabatan has been added'
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}


exports.updateJabatan = async(req,res,next)=>{
    const input = req.body;
    input.id = req.params.id;
    const result = await Datasource().JabatanDatasource.updateJabatan(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`jabatan ${input.id} has been updated`
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.deleteJabatan = async(req,res,next)=>{
    const input = {};
    input.id = req.params.id;
    const result = await Datasource().JabatanDatasource.deleteJabatan(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`jabatan ${input.id} has been deleted`
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}