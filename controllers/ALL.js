const Datasource = require('../datasources/Datasource');

exports.getALLProject = async(req,res,next)=>{
    const result = await Datasource().ALLDatasource.getALLProject();
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

exports.getALLDRF = async(req,res,next)=>{
    const result = await Datasource().ALLDatasource.getALLDRF();
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

exports.getALLDocumentNotApproved = async(req,res,next)=>{
    const result = await Datasource().ALLDatasource.getALLDocumentNotApproved();
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

exports.getALLDocumentApproved = async(req,res,next)=>{
    const result = await Datasource().ALLDatasource.getALLDocumentApproved();
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

exports.getALLDocumentNotApprovedSearch = async(req,res,next)=>{
    const input = {};
    input.term = req.params.term;
    const result = await Datasource().ALLDatasource.getALLDocumentNotApprovedSearch(input);
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

exports.getALLDocumentApprovedSearch = async(req,res,next)=>{
    const input = {};
    input.term = req.params.term;
    const result = await Datasource().ALLDatasource.getALLDocumentApprovedSearch(input);
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


