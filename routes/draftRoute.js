const express = require('express');
const { addDraftDRF, addDraftDFT_UAT, getDraftByUser, deleteDraftDRF, deleteDraftDFT_UAT, getDetailDraftDRF, getDetailDraftDFT_UAT, updateDraftDRF, updateDraftDFT_UAT } = require('../controllers/draft');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/DRF')
    .post(protect, addDraftDRF);

router
    .route('/DFT_UAT')
    .post(protect,addDraftDFT_UAT);

router
    .route('/user/:employee_id')
    .get(protect,getDraftByUser);

router
    .route('/DRF/:id_draft')
    .delete(protect,deleteDraftDRF)
    .get(protect,getDetailDraftDRF)
    .put(protect,updateDraftDRF)

router
    .route('/DFT_UAT/:id_draft')
    .delete(protect,deleteDraftDFT_UAT)
    .get(protect,getDetailDraftDFT_UAT)
    .put(protect,updateDraftDFT_UAT);



module.exports = router;