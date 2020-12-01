const express = require('express');
const { getDocumentApproved, getDocumentNotApproved, getDownloadPDF, getApprovedDRF, getSearchNotApprovedDocument, getSearchApprovedDocument, getDocumentsCreatedBy, getDocumentsSignedBy } = require('../controllers/document');
const router = express.Router();

router
    .route('/approved/:employee_id')
    .get(getDocumentApproved);

router
    .route('/not-approved/:employee_id')
    .get(getDocumentNotApproved);

router
    .route('/not-approved/:employee_id/:term')
    .get(getSearchNotApprovedDocument);

router
    .route('/approved/:employee_id/:term')
    .get(getSearchApprovedDocument);

router
    .route('/download/:kode_dokumen')
    .get(getDownloadPDF);

router
    .route('/DRF/:employee_id')
    .get(getApprovedDRF);
    
router
    .route('/created/:employee_id')
    .get(getDocumentsCreatedBy);

router
    .route('/signed/:employee_id')
    .get(getDocumentsSignedBy);
    
module.exports = router;