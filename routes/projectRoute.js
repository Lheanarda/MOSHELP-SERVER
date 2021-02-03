const express = require('express');
const { getProject, addProject, getSingleProject, updateProject, deleteProject } = require('../controllers/project');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router  
    .route('/')
    .get(protect, getProject)
    .post(protect,addProject);

router
    .route('/:kode_project')
    .get(protect,getSingleProject)
    .put(protect,updateProject)
    .delete(protect,deleteProject);

module.exports = router;