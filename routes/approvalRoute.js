const express = require('express');
const { getNeedToBeSigned, onSignedDRF, onSignedDFT_UAT } = require('../controllers/approval');
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

module.exports = router;