const dateFormat = require('dateformat');
const dotenv = require('dotenv');
dotenv.config({path:'../config/config.env'}); //ENV CONFIG

module.exports=(data,mode,skenarios,kendalas)=>{
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="${process.env.ENDPOINT}/style/dft-uat.css">
        <title>Document</title>
    </head>
    <body>
        <div class="title">${mode==='DFT'?'Developer Flow Test (DFT)':'User Acceptance Test (UAT)'}</div>
        <div class="info mt-1">
            <div class="info__divide">
                <div class="info__left">
                    <div class="info--name">Document</div>
                    <div class="info--val">${data.kode ? data.kode : data.kode_dokumen}</div>
                </div>
                <div class="info__right">
                    <div class="info--name">Project Name</div>
                    <div class="info--val">${data.project_name?data.project_name:'-'}</div>
                </div>
            </div>
            <div class="info__divide">
                <div class="info__left">
                    <div class="info--name">Request By</div>
                    <div class="info--val">${data.request_by?data.request_by:'-'}</div>
                </div>
                <div class="info__right">
                    <div class="info--name">Create Date</div>
                    <div class="info--val">${data.create_date? dateFormat(data.create_date,"mmm dS, yyyy"):'-'}</div>
                </div>
            </div>
            <div class="info__item">
                <div class="info__name">Approved By</div>
                <div class="info__val">${data.approved_by?data.approved_by:'-'}</div>
            </div>
            <div class="info__item">
                <div class="info__name">Document Type</div>
                <div class="info__val">${data.document_type?data.document_type:'-'}</div>
            </div>
        </div>

        <div class="skenario">
            <div class="skenario__row skenario--head">
                <div class="skenario__no">No</div>
                <div class="skenario__skenario">Skenario Testing</div>
                <div class="skenario__user1">Check List User 1</div>
                <div class="skenario__user2">Check List User 2</div>
                <div class="skenario__ket">Keterangan</div>
                <div class="skenario__referensi">Referensi</div>
            </div>
            ${skenarios}
        </div>

        <div class="kendala">
            <div class="kendala__row kendala--head">
                <div class="kendala__no">No</div>
                <div class="kendala__kendala">Kendala</div>
                <div class="kendala__check">Check List</div>
                <div class="kendala__ket">Keterangan</div>
                <div class="kendala__referensi">Referensi</div>
            </div>
            ${kendalas}
        </div>

        <div class="approval mt-1">
            <div class="approval__box">
                <div class="approval__name">User I</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.user1_date?dateFormat(data.user1_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.user1_date?'<span>SIGNED</span>':'-'}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.user1?data.user1:'-'}</div>
                </div>
            </div>
            <div class="approval__box">
                <div class="approval__name">User II</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.user2_date?dateFormat(data.user2_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.user2_date?'<span>SIGNED</span>':'-'}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.user2?data.user2:'-'}</div>
                </div>
            </div>
            <div class="approval__box">
                <div class="approval__name">Checked By</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.checked_by_date?dateFormat(data.checked_by_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.checked_by_date?'<span>SIGNED</span>':'-'}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.checked_by_name?data.checked_by_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.checked_by_job?data.checked_by_job:'-'}</div>
                </div>
            </div>
            <div class="approval__box">
                <div class="approval__name">Request By</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.request_by_date?dateFormat(data.request_by_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.request_by_date? '<span>SIGNED</span>' :''}</div>
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
                <div class="approval__name">Approved By</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.approved_by_date?dateFormat(data.approved_by_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.approved_by_date? '<span>SIGNED</span>' :''}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.approved_by_name?data.approved_by_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.approved_by_job?data.approved_by_job:'-'}</div>
                </div>
            </div>

            <div class="approval__box border-right">
                <div class="approval__name">Approved</div>
                <div class="approval__item">
                    <div class="approval__item-name">Date :</div>
                    <div class="approval__item-val">${data.approved_date?dateFormat(data.approved_date,"mmm dS, yyyy"):'-'}</div>
                </div>
                <div class="approval__ttd">${data.approved_date? '<span>SIGNED</span>' :''}</div>
                <div class="approval__item">
                    <div class="approval__item-name">Name :</div>
                    <div class="approval__item-val">${data.approved_name?data.approved_name:'-'}</div>
                </div>
                <div class="approval__item">
                    <div class="approval__item-name">J.Title :</div>
                    <div class="approval__item-val">${data.approve_job?data.approve_job:'-'}</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `
}