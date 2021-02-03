const express = require('express');
const { getAuthenticatedProject } = require('../controllers/project');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/:employee_id')
    .get(protect,getAuthenticatedProject);

module.exports = router;