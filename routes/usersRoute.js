const express = require('express');
const { getUsers, addUsers, getSingleUsers, updateUsers, deleteUsers } = require('../controllers/users');
const router = express.Router();

router
    .route('/')
    .get(getUsers)
    .post(addUsers);

router  
    .route('/:employee_id')
    .get(getSingleUsers)
    .put(updateUsers)
    .delete(deleteUsers)

module.exports = router;