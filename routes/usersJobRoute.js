const express = require('express');
const { getUserAndJobs } = require('../controllers/users');
const router = express.Router();

router
    .route('/')
    .get(getUserAndJobs);

module.exports = router;