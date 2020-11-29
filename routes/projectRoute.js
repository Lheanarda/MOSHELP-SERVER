const express = require('express');
const { getProject, addProject, getSingleProject, updateProject, deleteProject } = require('../controllers/project');
const router = express.Router();

router  
    .route('/')
    .get(getProject)
    .post(addProject);

router
    .route('/:kode_project')
    .get(getSingleProject)
    .put(updateProject)
    .delete(deleteProject);

module.exports = router;