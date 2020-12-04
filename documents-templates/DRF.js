const dateFormat = require('dateformat');
const dotenv = require('dotenv');
dotenv.config({path:'../config/config.env'}); //ENV CONFIG

module.exports=(data)=>{
    return` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="${process.env.ENDPOINT}/style/ckeditor.css">
        <link rel="stylesheet" type="text/css" href="${process.env.ENDPOINT}/style/drf.css">
        
    </head>
    <body>
        <div class="header">
            <div class="header--left">
                <img src="${process.env.ENDPOINT}/images/logo-enseval.png" alt="Logo Enseval" class="header__logo">
                <div class="header__info">
                    <p>PT. Enseval Putera Megatrading Tbk.
                    <p class="header__strong">Digital Business Division</p>
                    <p>e-Commerce Development</p>
                </div>
            </div>
            <div class="header--right">
                <div class="header--top">
                    <div class="header__divide ">
                        <div class ="table-group">
                            <div class="table-group__name">Request ID</div>
                            <div class="table-group__value">${data.kode ? data.kode : data.kode_dokumen}</div>
                        </div>
                        <div class ="table-group">
                            <div class="table-group__name">Reference ID</div>
                            <div class="table-group__value">${data.reference_id?data.reference_id:'-'}</div>
                        </div>
                        <div class ="table-group">
                            <div class="table-group__name">Request Type</div>
                            <div class="table-group__value table-group--checkbox">
                                <div class="table-group__checkbox">${
                                    data.request_type==='new'?'X':''
                                }</div>
                                <div class="table-group__checkbox-val">New</div>
                                <div class="table-group__checkbox">${
                                    data.request_type==='change'?'X':''
                                }</div>
                                <div class="table-group__checkbox-val">Change</div>
                            </div>
                        </div>
                    </div>
                    <div class="header__divide">
                        <div class ="table-group border-right">
                            <div class="table-group__name">Request Date</div>
                            <div class="table-group__value">${dateFormat(data.request_date,"mmm dS, yyyy")}</div>
                        </div>
                        <div class ="table-group border-right">
                            <div class="table-group__name">Est.Due Date</div>
                            <div class="table-group__value">${data.est_due_date?dateFormat(data.est_due_date,"mmm dS, yyyy"):'-'}</div>
                        </div>
                        <div class ="table-group border-right">
                            <div class="table-group__name">Priority</div>
                            <div class="table-group__value table-group--checkbox">
                                <div class="table-group__checkbox">${
                                    data.priority==='high'?'X':''
                                }</div>
                                <div class="table-group__checkbox-val">High</div>
                                <div class="table-group__checkbox">${
                                    data.priority==='medium'?'X':''
                                }</div>
                                <div class="table-group__checkbox-val">Medium</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header--bottom">
                    <div class="table-group__name">Document Type</div>
                    <div class="table-group__value">Documents are confidential and limited to Digital Business only</div>
                </div>
            </div>
        </div>
                            
        <div class="title-container">
            <div class ="title">Development Request Form</div>      
            <img src="${process.env.ENDPOINT}/images/ISO_Logo.png" alt="Logo ISO" class="iso"/>              
        </div>
        
                                
        <div class="projects">
            <div class="projects--left">Projects</div>
            <div class="projects--right">
                ${data.project_name?data.project_name:'-'}
            </div>
        </div>


        <div class="info mt-1 border-top">
            <div class="info--left">Title</div>
            <div class="info--right">${data.title?data.title:'-'}</div>
        </div>
        <div class="info">
            <div class="info--left">Technology</div>
            <div class="info--right">${data.technology?data.technology:'-'}</div>
        </div>
        <div class="info">
            <div class="info--left">Dev. Level</div>
            <div class="info--right">
                <div class="info__checkbox">
                    <div class="info__check">${data.dev_level==='projects'?'X':''}</div>
                    <div class="info__val">Projects</div>

                    <div class="info__check">${data.dev_level==='module'?'X':''}</div>
                    <div class="info__val">Module</div>

                    <div class="info__check">${data.dev_level==='feature'?'X':''}</div>
                    <div class="info__val">Feature</div>
                </div>
            </div>
        </div>
        <div class="info">
            <div class="info--left">Ext. Partner</div>
            <div class="info--right">${data.ext_partner?data.ext_partner:'-'}</div>
        </div>
        <div class="info">
            <div class="info--left">Int. Team</div>
            <div class="info--right">${data.int_team?data.int_team:'-'}</div>
        </div>
        <div class="info">
            <div class="info--left">Brief Description</div>
            <div class="info--right">${data.brief_desc?data.brief_desc:'-'}</div>
        </div>


        <div class="detail mt-1">
            <div class="detail__title">Detail Request</div>
            <div class="detail__content ckeditor">
                ${data.detail_req}
            </div>
        </div>

        <div class="check mt-1">
            <div class="check__title">Development Request Check</div>
            <div class="check__testing">
                <div class="check--top">
                    <div class="check__name">Standard Testing</div>
                    <div class="check__checkbox">${data.standard_testing==='ok'?'X':''}</div>
                    <div class="check__value">OK</div>
                    <div class="check__checkbox">${data.standard_testing==='no'?'X':''}</div>
                    <div class="check__value">No OK</div>
                </div>
                <div class="check--middle mt-1">
                    <div class="check--name">Date :</div>
                    <div class="check--val">${data.standard_date?dateFormat(data.standard_date,"mmm dS, yyyy") :'-'}</div>
                    <div class="check--name">PIC :</div>
                    <div class="check--val">${data.standard_pic?data.standard_pic:'-'}</div>
                </div>
                <div class="check--bottom mt-1">
                    <div class="check--name">Notes :</div>
                    <div class="check--val">${data.standard_notes?data.standard_notes:'-'}</div>
                </div>
            </div>
            <div class="check__testing">
                <div class="check--top">
                    <div class="check__name">Advanced Testing</div>
                    <div class="check__checkbox">${data.advanced_testing==='ok'?'X':''}</div>
                    <div class="check__value">OK</div>
                    <div class="check__checkbox">${data.advanced_testing==='no'?'X':''}</div>
                    <div class="check__value">No OK</div>
                </div>
                <div class="check--middle mt-1">
                    <div class="check--name">Date :</div>
                    <div class="check--val">${data.advanced_date?dateFormat(data.advanced_date,"mmm dS, yyyy"):'-'}</div>
                    <div class="check--name">PIC :</div>
                    <div class="check--val">${data.advanced_pic?data.advanced_pic:'-'}</div>
                </div>
                <div class="check--bottom mt-1">
                    <div class="check--name">Notes :</div>
                    <div class="check--val">${data.advanced_notes?data.advanced_notes:'-'}</div>
                </div>
            </div>
        </div>

        <div class="approval mt-1">
            <div class="approval__box">
                <div class="approval__name">Requested By</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.request_by_date?dateFormat(data.request_by_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.request_by_date?'<span>SIGNED</span>':'-'}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.request_by_name?data.request_by_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.request_by_job?data.request_by_job:'-'}</div>
                </div>
            </div>
            <div class="approval__box">
                <div class="approval__name">Request Approved By</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.request_approved_date?dateFormat(data.request_approved_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.request_approved_date?'<span>SIGNED</span>':'-'}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.request_approved_name?data.request_approved_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.request_approved_job?data.request_approved_job:'-'}</div>
                </div>
            </div>
            <div class="approval__box">
                <div class="approval__name">Developed By</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.developed_by_date?dateFormat(data.developed_by_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.developed_by_date?'<span>SIGNED</span>':'-'}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.developed_by_name?data.developed_by_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.developed_by_job?data.developed_by_job:'-'}</div>
                </div>
            </div>
            <div class="approval__box">
                <div class="approval__name">Development Approved By</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.development_approved_date?dateFormat(data.development_approved_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.development_approved_date? '<span>SIGNED</span>' :''}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.development_approved_name?data.development_approved_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.development_approved_job?data.development_approved_job:'-'}</div>
                </div>
            </div>
            <div class="approval__box border-right">
                <div class="approval__name">Actual Finish Date</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.approved_date?dateFormat(data.approved_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__name mt-1 border-top">Approved By</div>
                <div class="approval__ttd-small">${data.approved_date?'<span>SIGNED</span>' :''}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.approved_name?data.approved_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.approved_job?data.approved_job:'-'}</div>
                </div>
            </div>
        </div>
    </body>
    </html>`
    }