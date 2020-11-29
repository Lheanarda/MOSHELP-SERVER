const express = require('express');
const { createDRF, getDetailDRF } = require('../controllers/DRF');
const router = express.Router();

router  
    .route('/')
    .post(createDRF);

router
    .route('/:kode_dokumen')
    .get(getDetailDRF)

module.exports = router;