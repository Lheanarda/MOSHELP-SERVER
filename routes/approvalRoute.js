const express = require('express');
const { getNeedToBeSigned } = require('../controllers/approval');
const router = express.Router();

router
    .route('/:employee_id')
    .get(getNeedToBeSigned);

module.exports = router;