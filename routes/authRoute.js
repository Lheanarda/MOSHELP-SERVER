const express = require('express');
const { getLoginUserAdmin, getLoginUsers } = require('../controllers/users');
const router = express.Router();

router
    .route('/admin/:employee_id')
    .get(getLoginUserAdmin);

router
    .route('/users/:employee_id')
    .get(getLoginUsers);

module.exports = router;