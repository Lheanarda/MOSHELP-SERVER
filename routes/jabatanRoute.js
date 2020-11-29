const express = require('express');
const { getJabatan, addJabatan, updateJabatan, deleteJabatan, getSingleJabatan } = require('../controllers/jabatan');
const router = express.Router();

router
    .route('/')
    .get(getJabatan)
    .post(addJabatan);

router
    .route('/:id')
    .get(getSingleJabatan)
    .put(updateJabatan)
    .delete(deleteJabatan);


module.exports = router;