const Datasource = require('../datasources/Datasource');

exports.addDraftDRF = async(req,res,next)=>{
    const input = req.body.data;
    const result = await Datasource().DraftDatasource.addDraftDRF(input);

    if(result.success){
        res.status(200).json({
            success:true,
            message:'new draft has been added'
        });
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.addDraftDFT_UAT = async(req,res,next)=>{
    const input = req.body.data;
    const result = await Datasource().DraftDatasource.addDraftDFT_UAT(input);
    
    if(result.success){
        res.status(200).json({
            success:true,
            message:'new draft has been added'
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }

}

exports.updateDraftDRF = async(req,res,next)=>{
    const input = req.body.data;
    input.id_draft = req.params.id_draft;
    const result = await Datasource().DraftDatasource.updateDraftDRF(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'draft has been updated'
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.getDraftByUser = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().DraftDatasource.getDraftByUser(input);
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

exports.deleteDraftDRF = async(req,res,next)=>{
    const input = {};;
    input.id = req.params.id_draft;
    const result = await Datasource().DraftDatasource.deleteDRF(input);
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

exports.deleteDraftDFT_UAT = async(req,res,next)=>{
    const input = {};
    input.id = req.params.id_draft;
    const result = await Datasource().DraftDatasource.deleteDFT_UAT(input);
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

exports.getDetailDraftDRF = async(req,res,next)=>{
    const input = {};
    input.id_draft = req.params.id_draft;
    const result = await Datasource().DraftDatasource.getDetailDraftDRF(input);
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

exports.getDetailDraftDFT_UAT = async(req,res,next)=>{
    const input = {};
    input.id_draft = req.params.id_draft;
    const result = await Datasource().DraftDatasource.getDetailDraftDFT_UAT(input);
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

exports.updateDraftDFT_UAT = async(req,res,next)=>{
    const input = req.body.data;
    input.id_draft = req.params.id_draft;
    const result = await Datasource().DraftDatasource.updateDraftDFT_UAT(input);
    if(result.success){
        res.status(200).json({
            success:true
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}