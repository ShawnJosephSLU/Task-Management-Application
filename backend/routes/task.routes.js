// task routes

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const checkAuthUser = require('../middleware/check-auth-user')


router.post('/', checkAuthUser ,taskController.createNewTask); // asynchronously creates a new task
router.get('/',checkAuthUser ,taskController.getFilteredTasks); // asynchronously fetches all tasks from the database


module.exports = router;