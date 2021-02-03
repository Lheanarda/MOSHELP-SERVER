const express = require('express');
const { getUserAndJobs } = require('../controllers/users');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .get(protect, getUserAndJobs);

module.exports = router;