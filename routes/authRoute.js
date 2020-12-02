const express = require('express');
const { getLoginUserAdmin } = require('../controllers/users');
const router = express.Router();

router
    .route('/admin/:employee_id')
    .get(getLoginUserAdmin);

module.exports = router;