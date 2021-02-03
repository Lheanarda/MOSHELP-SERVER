const express = require('express');
const { addSubscription, deleteSubscription } = require('../controllers/subscription');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(protect, addSubscription);

router
    .route('/unsub')
    .post(protect,deleteSubscription);

module.exports = router;