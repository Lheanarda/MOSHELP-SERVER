const Datasource = require('../datasources/Datasource');
const DRFTemplate = require('../documents-templates/DRF');
const pdf = require('html-pdf');
const path = require('path');

exports.createDRF = async(req,res,next)=>{
    const input = req.body.data;
    const submitOnly = req.body.submitOnly;
    input.tipe_dokumen = 'DRF';

    const addDokumenResult = await Datasource().NomorDokumenDatasource.addDokumen(input);
    if(addDokumenResult.success){
        input.kode = addDokumenResult.data.kode;
        input.sequence = addDokumenResult.data.sequence;

        const addDRFResult = await Datasource().DRFDatasource.addDRF(input);

        if(addDRFResult.success){
            //create DRF
            pdf.create(DRFTemplate(input),{
                format:'A4',
                orientation:'portrait',
                border:{
                    top:'2.54cm',
                    left:'2.54cm',
                    right:'2.54cm',
                    bottom:'2.54cm'
                }
            }).toFile(`private-document-storage/${input.kode}.pdf`,err=>{
                if(err){
                    return Promise.reject(new Error('Failed To Create Document'))
                }

                const filePath = path.join(__dirname,`../private-document-storage/${input.kode}.pdf`);
                if(submitOnly){
                    res.status(200).json({
                        success:true,
                        message:`${input.kode} has been created`
                    })
                }else{
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
            })
        }else{
            console.log(addDRFResult);
            res.status(500).json({
                success:false,
                message:addDRFResult.message
            })
        }
    }else{
        res.status(500).json({
            success:false,
            message:addDokumenResult.message
        })
    }
}

exports.getDetailDRF = async(req,res,next)=>{
    const input = {};
    input.kode_dokumen = req.params.kode_dokumen;
    const result = await Datasource().DRFDatasource.getDetailPDF(input);
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

