const express = require('express');
const { getNeedToBeSigned, onSignedDRF, onSignedDFT_UAT, onRejectDocument, onGetCreatedRejectedDocuments,onGetDocumentsRejectedBy, onUpdateDocumentDRF, onUpdateDocumentDFT_UAT } = require('../controllers/approval');
const router = express.Router();

router
    .route('/need-sign/:employee_id')
    .get(getNeedToBeSigned);

router
    .route('/sign-DRF')
    .post(onSignedDRF);

router
    .route('/sign-DFT-UAT')
    .post(onSignedDFT_UAT);

router
    .route('/reject')
    .put(onRejectDocument);

router
    .route('/reject/create/:employee_id')
    .get(onGetCreatedRejectedDocuments);

router
    .route('/reject/by/:employee_id')
    .get(onGetDocumentsRejectedBy);

router
    .route('/update/DRF/:id_approval')
    .put(onUpdateDocumentDRF);

router
    .route('/update/DFT_UAT/:id_approval')
    .put(onUpdateDocumentDFT_UAT)

module.exports = router;