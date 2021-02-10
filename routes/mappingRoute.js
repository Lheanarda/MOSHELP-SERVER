const express = require('express');
const { addMapping, getAllMapping, getDetailMapping, deleteMapping, updateMapping, getMappingByUserAccess, getMappingByTipeDokumen } = require('../controllers/mapping');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .get(protect,getAllMapping)
    .post(protect,addMapping);

router
    .route('/detail/:id_mapping')
    .get(protect,getDetailMapping)
    .delete(protect,deleteMapping)
    .put(protect,updateMapping);

router
    .route('/user/:tipe_dokumen/:employee_id')
    .get(protect,getMappingByUserAccess)

router
    .route('/user/:tipe_dokumen')
    .get(protect,getMappingByTipeDokumen)

module.exports = router;