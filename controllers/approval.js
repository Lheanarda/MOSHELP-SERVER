const Datasource = require('../datasources/Datasource');
const DRFTemplate = require('../documents-templates/DRF');
const DFT_UATTemplate = require('../documents-templates/DFT-UAT');
const pdf = require('html-pdf');
const path = require('path');

exports.getNeedToBeSigned = async(req,res,next)=>{
    const input = {};
    input.employee_id = req.params.employee_id;
    const result =await Datasource().ApprovalDatasource.getNeedToBeSigned(input);
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

exports.onSignedDRF = async(req,res,next)=>{
    const approveOnly = req.body.approveOnly;
    const input = req.body.data;
    const dokumen = req.body.dokumen;


    pdf.create(DRFTemplate(dokumen),{
        format:'A4',
        orientation:'portrait',
        border:{
            top:'1.54cm',
            left:'1.54cm',
            right:'1.54cm',
            bottom:'1.54cm'
        }
    }).toFile(`public/documents/${input.kode_dokumen}.pdf`,async (err)=>{
        if(err){
            res.status(500).json({
                success:false,
                message : 'Fail to create document, Please try again'
            });
            return;
        }
        const result = await Datasource().ApprovalDatasource.onSignedDRF(input);

        if(result.success){
            const filePath = path.join(__dirname,`../public/documents/${input.kode_dokumen}.pdf`);
            if(approveOnly){
                res.status(200).json({
                    success:true,
                    message:`${input.kode_dokumen} has been signed`
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
        }else{
            res.status(500).json({
                success:false,
                message:result.message
            })
        }
        
    })

    
}

exports.onSignedDFT_UAT = async(req,res,next)=>{
    const approveOnly = req.body.approveOnly;
    const input = req.body.data;
    const dokumen = req.body.dokumen;


    let skenarios='';
    dokumen.skenarios.forEach((skenario,idx)=>{
        skenarios+= `
        <div class="skenario__row">
            <div class="skenario__no">${idx+1}</div>
            <div class="skenario__skenario">${skenario.skenario ? skenario.skenario :'-'}</div>
            <div class="skenario__user1">
                ${skenario.checklist1?'<i class="fa fa-check" aria-hidden="true"></i>':'X'}
            </div>
            <div class="skenario__user2">
                ${skenario.checklist2?'<i class="fa fa-check" aria-hidden="true"></i>':'X'}
            </div>
            <div class="skenario__ket">${skenario.keterangan?skenario.keterangan:'-'}</div>

            <div class="skenario__referensi">${skenario.referensi?skenario.referensi:'-'} </div>
        </div>
        `
    });

    //create kendala HTML
    let kendalas = '';
    dokumen.kendalas.forEach((kendala,idx)=>{
        kendalas+=`
        <div class="kendala__row">
            <div class="kendala__no">${idx+1}</div>
            <div class="kendala__kendala">${kendala.kendala ? kendala.kendala : '-'}</div>
            <div class="kendala__check">${kendala.checklist?'<i class="fa fa-check" aria-hidden="true"></i>':'X'}</div>
            <div class="kendala__ket">${kendala.keterangan ? kendala.keterangan : '-'}</div>
            <div class="kendala__referensi">${kendala.referensi ? kendala.referensi : '-'}</div>
        </div>
        `
    });

    //re-create DFT UAT
    pdf.create(DFT_UATTemplate(dokumen,input.tipe_dokumen,skenarios,kendalas),{
        format:'A4',
        orientation:'portrait',
        border:{
            top:'1.54cm',
            left:'1.54cm',
            right:'1.54cm',
            bottom:'1.54cm'
        }
    }).toFile(`public/documents/${input.kode_dokumen}.pdf`,async(err)=>{
        if(err){
            res.status(500).json({
                success:false,
                message : 'Fail to create document, Please try again'
            });
            return;
        }

        const result = await Datasource().ApprovalDatasource.onSignedDFT_UAT(input);
        if(result.success){
            const filePath = path.join(__dirname,`../public/documents/${input.kode_dokumen}.pdf`);
            if(approveOnly){
                res.status(200).json({
                    success:true,
                    message:`${input.kode_dokumen} has been signed`
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
        }else{
            res.status(500).json({
                success:false,
                message:result.message
            })
        }

        
    })

    
}