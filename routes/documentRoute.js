const express = require('express');
const { getDocumentApproved, getDocumentNotApproved, getDownloadPDF } = require('../controllers/document');
const router = express.Router();

router
    .route('/approved/:employee_id')
    .get(getDocumentApproved);

router
    .route('/not-approved/:employee_id')
    .get(getDocumentNotApproved);

router
    .route('/download/:kode_dokumen')
    .get(getDownloadPDF)
module.exports = router;