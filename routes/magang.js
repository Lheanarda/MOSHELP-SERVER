const express = require('express');
const { getAllMagang, addMagang, getSingleMagang, updateMagang, deleteMagang } = require('../controllers/magang');
const router = express.Router();

router
    .route('/')
    .get(getAllMagang)
    .post(addMagang);

router
    .route('/:employee_id')
    .get(getSingleMagang)
    .put(updateMagang)
    .delete(deleteMagang);

module.exports = router;