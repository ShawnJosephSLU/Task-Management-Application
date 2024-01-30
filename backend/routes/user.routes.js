const express = require('express');
const  userController = require('../controllers/user.controllers');
const router =  express.Router();

router.post('/', userController.createNewUsers); //  creates a new user

router.get('/', userController.getAllUsers) // fetches all users from the database

router.get('/displayNames', userController.getAllUserNames ) // fetches only the display name for all users

module.exports = router;