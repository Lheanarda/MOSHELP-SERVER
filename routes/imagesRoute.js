const express = require('express');
const { addImages } = require('../controllers/images');

const router = express.Router();

//router
router
    .route('/')
    .post(addImages);


module.exports= router;