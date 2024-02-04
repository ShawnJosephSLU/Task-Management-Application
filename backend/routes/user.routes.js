const express = require("express");
const userController = require("../controllers/user.controllers");
const authController = require("../controllers/authentication/user-auth.controller");
const router = express.Router();
const checkAuthUser = require("../middleware/check-auth-user");

router.post("/signup", userController.createNewUsers); //  creates a new user
router.get("/", userController.getAllUsers); // fetches all users from the database
router.get("/displayNames", userController.getAllUserNames); // fetches only the display name for all users
router.post("/signin", authController.signInUser); // signs the user in
router.post('/signout', checkAuthUser, authController.signOutUser); //signs user out

module.exports = router;
