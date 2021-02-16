const Datasource = require('../datasources/Datasource');
const path = require('path');

exports.getDocumentApproved = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;

    const result = await Datasource().DocumentDatasource.getDocumentsApproved(input);

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

exports.getDocumentNotApproved = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;

    const result = await Datasource().DocumentDatasource.getDocumentsNotApproved(input);
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

exports.getSearchNotApprovedDocument = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    input.term = req.params.term;
    const result = await Datasource().DocumentDatasource.getSearchNotApprovedDocument(input);
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

exports.getSearchApprovedDocument = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    input.term = req.params.term;
    const result = await Datasource().DocumentDatasource.getSearchApprovedDocument(input);
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

exports.getDownloadPDF = async(req,res,next)=>{
    const fileName = `${req.params.kode_dokumen}.pdf`;
    const filePath = path.join(__dirname,`../public/documents/${fileName}`);
    res.sendFile(filePath,{
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    },err=>{
        if(err){
            res.status(500).json({
                success:false,
                message : err
            })
        }
    })
}

exports.getApprovedDRF = async (req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().DocumentDatasource.getApprovedDRF(input);

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

exports.getDocumentsCreatedBy = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().DocumentDatasource.getDocumentsCreatedBy(input);

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

exports.getDocumentsSignedBy = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result = await Datasource().DocumentDatasource.getDocumentsSignedBy(input);
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

exports.abortDocument = async(req,res,next)=>{
    const input = req.body.data;
    const result = await Datasource().DocumentDatasource.abortDocument(input);
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

exports.getDocumentChartData =async(req,res,next)=>{
    const input = {
        kode_project:req.params.kode_project
    }
    const result = await Datasource().DocumentDatasource.getDocumentChartData(input);
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