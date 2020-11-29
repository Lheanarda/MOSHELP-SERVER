const express = require('express');
const { getAuthenticatedProject } = require('../controllers/project');
const router = express.Router();

router
    .route('/:employee_id')
    .get(getAuthenticatedProject);

module.exports = router;