const User = require("../models/user.model"); // Changed userModel to User
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); // Make sure to import mongoose

const createNewUsers = async (req, res) => { 
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password

        const newUser = new User({ // Use the correct User model
            _id: new mongoose.Types.ObjectId(), 
            displayName: req.body.displayName,  
            username: req.body.username,  
            email: req.body.email,   
            password: hashedPassword,  
        });
        
        const result = await newUser.save();

        res.status(201).json({
            message: "New user created",
            user: newUser
        });
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
    }
}

const getAllUserNames = async (req, res, next) => {
    try {
        const users = await User.find();
        const userDisplayNames = users.map(user => {
            return {
                id: user._id,
                displayName: user.displayName
            };
        });
        res.status(200).json(userDisplayNames);
    } catch (error) {
        res.status(500).send('An error occurred');
    }
}



module.exports = { createNewUsers, getAllUsers,getAllUserNames };
