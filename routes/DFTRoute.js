const express = require('express');
const { createDFT, getDetailDFT } = require('../controllers/DFT');
const router = express.Router();

router
    .route('/')
    .post(createDFT);

router
    .route('/:kode_dokumen')
    .get(getDetailDFT);

module.exports = router;