const express = require('express');
const { createDFT, getDetailDFT } = require('../controllers/DFT');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(protect,createDFT);

router
    .route('/:kode_dokumen')
    .get(protect,getDetailDFT);

module.exports = router;