const Datasource = require('../datasources/Datasource');
const DRFTemplate = require('../documents-templates/DRF');
const pdf = require('html-pdf');
const path = require('path');
const {pushNotif} = require('../helpers/push-notification');

exports.createDRF = async(req,res,next)=>{
    const input = req.body.data;
    const submitOnly = req.body.submitOnly;
    input.tipe_dokumen = 'DRF';

    const addDokumenResult = await Datasource().NomorDokumenDatasource.addDokumen(input);
    
    if(addDokumenResult.success){
        input.kode = addDokumenResult.data.kode;
        input.sequence = addDokumenResult.data.sequence;

        //create DRF
        pdf.create(DRFTemplate(input),{
            format:'A4',
            orientation:'portrait',
            border:{
                top:'1.54cm',
                left:'1.54cm',
                right:'1.54cm',
                bottom:'1.54cm'
            }
        }).toFile(`public/documents/${input.kode}.pdf`, async (err)=>{
            if(err){
                res.status(500).json({
                    success:false,
                    message : 'Fail to create document, Please try again'
                });
                return;
            }
            const addDRFResult = await Datasource().DRFDatasource.addDRF(input);
            if(addDRFResult.success){
                const filePath = path.join(__dirname,`../public/documents/${input.kode}.pdf`);
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

                //SEND NOTIFICATION
                const subs = await Datasource().SubscriptionDatasource.getUserSubscriptionByLevelApproval(input.kode,1);
                if (subs.success && subs.data.length>0){
                    subs.data.forEach(sub=>{
                        pushNotif(sub,{
                            title:`Sign Document`,
                            body:`Document ${input.kode} need to be signed`,
                            url:'/#/sign'
                        })
                    })
                }

            }else{
                console.log(addDRFResult);
                res.status(500).json({
                    success:false,
                    message:addDRFResult.message
                })
            }

            
        })
        
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

