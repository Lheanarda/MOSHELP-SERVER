const express = require('express');
const { addDraftDRF, addDraftDFT_UAT, getDraftByUser, deleteDraftDRF, deleteDraftDFT_UAT, getDetailDraftDRF, getDetailDraftDFT_UAT, updateDraftDRF, updateDraftDFT_UAT } = require('../controllers/draft');
const router = express.Router();

router
    .route('/DRF')
    .post(addDraftDRF);

router
    .route('/DFT_UAT')
    .post(addDraftDFT_UAT);

router
    .route('/user/:employee_id')
    .get(getDraftByUser);

router
    .route('/DRF/:id_draft')
    .delete(deleteDraftDRF)
    .get(getDetailDraftDRF)
    .put(updateDraftDRF)

router
    .route('/DFT_UAT/:id_draft')
    .delete(deleteDraftDFT_UAT)
    .get(getDetailDraftDFT_UAT)
    .put(updateDraftDFT_UAT);



module.exports = router;