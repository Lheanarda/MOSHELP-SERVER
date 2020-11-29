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

exports.getDownloadPDF = async(req,res,next)=>{
    const fileName = `${req.params.kode_dokumen}.pdf`;
    const filePath = path.join(__dirname,`../private-document-storage/${fileName}`);
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