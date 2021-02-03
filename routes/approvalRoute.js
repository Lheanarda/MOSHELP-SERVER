const express = require('express');
const { getNeedToBeSigned, onSignedDRF, onSignedDFT_UAT, onRejectDocument, onGetCreatedRejectedDocuments,onGetDocumentsRejectedBy, onUpdateDocumentDRF, onUpdateDocumentDFT_UAT } = require('../controllers/approval');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/need-sign/:employee_id')
    .get(protect, getNeedToBeSigned);

router
    .route('/sign-DRF')
    .post(protect,onSignedDRF);

router
    .route('/sign-DFT-UAT')
    .post(protect,onSignedDFT_UAT);

router
    .route('/reject')
    .put(protect,onRejectDocument);

router
    .route('/reject/create/:employee_id')
    .get(protect,onGetCreatedRejectedDocuments);

router
    .route('/reject/by/:employee_id')
    .get(protect,onGetDocumentsRejectedBy);

router
    .route('/update/DRF/:id_approval')
    .put(protect,onUpdateDocumentDRF);

router
    .route('/update/DFT_UAT/:id_approval')
    .put(protect,onUpdateDocumentDFT_UAT)

module.exports = router;