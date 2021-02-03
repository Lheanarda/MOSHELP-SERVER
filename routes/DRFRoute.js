const express = require('express');
const { createDRF, getDetailDRF } = require('../controllers/DRF');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router  
    .route('/')
    .post(protect, createDRF);

router
    .route('/:kode_dokumen')
    .get(protect,getDetailDRF)

module.exports = router;