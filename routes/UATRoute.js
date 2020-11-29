const express = require('express');
const { createUAT, getDetailUAT } = require('../controllers/UAT');
const router = express.Router();

router
    .route('/')
    .post(createUAT);

router
    .route('/:kode_dokumen')
    .get(getDetailUAT);

module.exports = router;