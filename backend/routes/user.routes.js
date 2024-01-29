const express = require('express');
const  userController = require('../controllers/user.controllers');
const router =  express.Router();

router.post('/', userController.createNewUsers); //  creates a new user

router.get('/', userController.getAllUsers) // fetches all users from the database

module.exports = router;