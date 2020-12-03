const express = require('express');
const { getALLProject, getALLDRF, getALLDocumentNotApproved,getALLDocumentApproved, getALLDocumentNotApprovedSearch, getALLDocumentApprovedSearch } = require('../controllers/ALL');
const router = express.Router();

router
    .route('/project')
    .get(getALLProject)

router
    .route('/DRF')
    .get(getALLDRF);

router
    .route('/dokumen/not-approved')
    .get(getALLDocumentNotApproved);

router
    .route('/dokumen/approved')
    .get(getALLDocumentApproved);

router
    .route('/dokumen/not-approved/:term')
    .get(getALLDocumentNotApprovedSearch);

router
    .route('/dokumen/approved/:term')
    .get(getALLDocumentApprovedSearch);

module.exports = router;