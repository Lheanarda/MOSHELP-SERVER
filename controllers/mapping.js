const Datasource = require('../datasources/Datasource');

exports.getAllMapping = async(req,res,next)=>{
    const result = await Datasource().MappingDatasource.getAllMapping();
    if(result.success){
        res.status(200).json({
            success:true,
            data:result.data
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.getMappingByTipeDokumen = async(req,res,next)=>{
    const input={
        tipe_dokumen:req.params.tipe_dokumen
    }
    const result = await Datasource().MappingDatasource.getMappingByTipeDokumen(input);
    if(result.success){
        res.status(200).json({
            success:true,
            data:result.data
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.getDetailMapping = async(req,res,next)=>{
    const input={
        id_mapping:req.params.id_mapping
    }
    const result = await Datasource().MappingDatasource.getDetailMapping(input);
    if(result.success){
        res.status(200).json({
            success:true,
            data:result.data
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.addMapping = async(req,res,next)=>{
    const input = req.body.data;
    const result = await Datasource().MappingDatasource.addMapping(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'New mapping has been added'
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.deleteMapping = async(req,res,next)=>{
    const input = {
        id_mapping:req.params.id_mapping
    }
    const result = await Datasource().MappingDatasource.deleteMapping(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:`Mapping ${input.id_mapping} has been deleted`
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.updateMapping = async(req,res,next)=>{
    const input = req.body.data;
    input.id_mapping = req.params.id_mapping;
    const result = await Datasource().MappingDatasource.updateMapping(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'Mapping has been updated'
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.getMappingByUserAccess = async(req,res,next)=>{
    console.log("test", req.params);
    const input={
        employee_id : req.params.employee_id,
        tipe_dokumen:req.params.tipe_dokumen
    }
    const result = await Datasource().MappingDatasource.getMappingByUserAccess(input);
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