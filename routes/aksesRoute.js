const express = require('express');
const { getAkses, addAkses, getSingleAkses, updateAkses, deleteAkses, getAksesByProject, getAksesByEmployee } = require('../controllers/akses');
const router = express.Router();

router
    .route('/')
    .get(getAkses)
    .post(addAkses);

router
    .route('/single/:kode_project/:employee_id')
    .get(getSingleAkses)
    .put(updateAkses)
    .delete(deleteAkses)

router
    .route('/project/:kode_project')
    .get(getAksesByProject);

router
    .route('/employee/:employee_id')
    .get(getAksesByEmployee);

module.exports = router;