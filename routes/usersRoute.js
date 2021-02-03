const express = require('express');
const { getUsers, addUsers, getSingleUsers, updateUsers, deleteUsers } = require('../controllers/users');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .get(protect, getUsers)
    .post(protect,addUsers);

router  
    .route('/:employee_id')
    .get(protect,getSingleUsers)
    .put(protect,updateUsers)
    .delete(protect,deleteUsers)

module.exports = router;