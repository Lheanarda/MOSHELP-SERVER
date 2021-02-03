const express = require('express');
const { getALLProject, getALLDRF, getALLDocumentNotApproved,getALLDocumentApproved, getALLDocumentNotApprovedSearch, getALLDocumentApprovedSearch } = require('../controllers/ALL');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/project')
    .get(protect,getALLProject)

router
    .route('/DRF')
    .get(protect,getALLDRF);

router
    .route('/dokumen/not-approved')
    .get(protect,getALLDocumentNotApproved);

router
    .route('/dokumen/approved')
    .get(protect,getALLDocumentApproved);

router
    .route('/dokumen/not-approved/:term')
    .get(protect,getALLDocumentNotApprovedSearch);

router
    .route('/dokumen/approved/:term')
    .get(protect,getALLDocumentApprovedSearch);

module.exports = router;