const express = require('express');
const { getDocumentApproved, getDocumentNotApproved, getDownloadPDF, getApprovedDRF, getSearchNotApprovedDocument, getSearchApprovedDocument, getDocumentsCreatedBy, getDocumentsSignedBy, abortDocument, getDocumentChartData } = require('../controllers/document');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/approved/:employee_id')
    .get(protect, getDocumentApproved);

router
    .route('/not-approved/:employee_id')
    .get(protect,getDocumentNotApproved);

router
    .route('/not-approved/:employee_id/:term')
    .get(protect,getSearchNotApprovedDocument);

router
    .route('/approved/:employee_id/:term')
    .get(protect,getSearchApprovedDocument);

router
    .route('/download/:kode_dokumen')
    .get(protect,getDownloadPDF);

router
    .route('/DRF/:employee_id')
    .get(protect,getApprovedDRF);
    
router
    .route('/created/:employee_id')
    .get(protect,getDocumentsCreatedBy);

router
    .route('/signed/:employee_id')
    .get(protect,getDocumentsSignedBy);

router
    .route('/abort')
    .post(protect,abortDocument);

router
    .route('/chart/:kode_project')
    .get(getDocumentChartData)
    
module.exports = router;