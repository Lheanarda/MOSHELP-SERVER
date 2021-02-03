const express = require('express');
const { getAllMagang, addMagang, getSingleMagang, updateMagang, deleteMagang } = require('../controllers/magang');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .get(protect, getAllMagang)
    .post(protect,addMagang);

router
    .route('/:employee_id')
    .get(protect,getSingleMagang)
    .put(protect,updateMagang)
    .delete(protect,deleteMagang);

module.exports = router;