// task routes

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');


router.post('/', taskController.createNewTask); // asynchronously creates a new task


module.exports = router;