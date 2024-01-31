const express = require('express');
const  userController = require('../controllers/user.controllers');
const authController = require('../controllers/authentication/user-auth.controller');
const checkAuth = require('../middleware/check-auth-user');
const router =  express.Router();


router.post('/', userController.createNewUsers); //  creates a new user

router.get('/', userController.getAllUsers) // fetches all users from the database

router.get('/displayNames', userController.getAllUserNames ) // fetches only the display name for all users

router.post('/signin', authController.signInUser) // signs the user in 

module.exports = router;