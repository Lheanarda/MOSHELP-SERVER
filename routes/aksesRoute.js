const express = require('express');
const { getAkses, addAkses, getSingleAkses, updateAkses, deleteAkses, getAksesByProject, getAksesByEmployee, getIfAksesAll } = require('../controllers/akses');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .get(protect, getAkses)
    .post(protect,addAkses);

router
    .route('/single/:kode_project/:employee_id')
    .get(protect,getSingleAkses)
    .put(protect,updateAkses)
    .delete(protect,deleteAkses)

router
    .route('/project/:kode_project')
    .get(protect,getAksesByProject);

router
    .route('/employee/:employee_id')
    .get(protect,getAksesByEmployee);

router
    .route('/ALL/:employee_id')
    .get(protect,getIfAksesAll)

module.exports = router;