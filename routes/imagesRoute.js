const express = require('express');
const { addImages } = require('../controllers/images');
const { protect } = require('../middlewares/auth');

const router = express.Router();

//router
router
    .route('/')
    .post(protect, addImages);


module.exports= router;