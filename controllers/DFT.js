const Datasource = require('../datasources/Datasource');
const pdf = require('html-pdf');
const path = require('path');
const DFTTemplate = require('../documents-templates/DFT-UAT');

exports.createDFT = async(req,res,next)=>{
    const input = req.body.data;
    const submitOnly = req.body.submitOnly;
    input.tipe_dokumen = 'DFT';
    const addDokumenResult = await Datasource().NomorDokumenDatasource.addDokumen(input);
    input.kode = addDokumenResult.data.kode;
    input.sequence = addDokumenResult.data.sequence;

    
    if(addDokumenResult.success){
        //create skenarios html
        let skenarios='';
        input.skenarios.forEach((skenario,idx)=>{
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
        input.kendalas.forEach((kendala,idx)=>{
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
        //create DFT
        console.log(input);
        pdf.create(DFTTemplate(input,'DFT',skenarios,kendalas),{
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

            const addDFTResult = await Datasource().DFTDatasource.addDFT(input);
            if(addDFTResult.success){
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
            }else{
                res.status(500).json({
                    success:false,
                    message:addDFTResult.message
                });
            }
            
        })
    }else{
        res.status(500).json({
            success:false,
            message:addDokumenResult.message
        });
        return;
    }
    
}

exports.getDetailDFT = async(req,res,next)=>{
    const input = {};
    input.kode_dokumen = req.params.kode_dokumen;
    
    const result = await Datasource().DFTDatasource.getDetailPDF(input);
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