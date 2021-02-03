const express = require('express');
const { createUAT, getDetailUAT } = require('../controllers/UAT');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(protect, createUAT);

router
    .route('/:kode_dokumen')
    .get(protect,getDetailUAT);

module.exports = router;