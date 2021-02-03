const express = require('express');
const { getJabatan, addJabatan, updateJabatan, deleteJabatan, getSingleJabatan } = require('../controllers/jabatan');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .get(protect, getJabatan)
    .post(protect,addJabatan);

router
    .route('/:id')
    .get(protect,getSingleJabatan)
    .put(protect,updateJabatan)
    .delete(protect,deleteJabatan);


module.exports = router;