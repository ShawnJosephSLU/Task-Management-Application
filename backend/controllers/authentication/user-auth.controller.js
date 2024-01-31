// user authentication controller
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

const signInUser = async (req, res, next) => { // handles user SignIn
    try {
      
       const user = await User.findOne({    // check for user by username or email
        $or: [
            { username: req.body.username }, 
            { email: req.body.email }
        ]
    });

    if (!user) {
        return res.status(401).json({
            error: "Authentication failed. User not found."
        });
    }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password); // Compare the passwords
        console.log("Password Match:", passwordMatch);  // log the password match


        if (!passwordMatch) { // Check if passwords match
            return res.status(401).json({
                error: "Authentication failed. Invalid password."
            });
        }

        const token = jwt.sign( // Generate JSON Web token
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3h' }
        );

        console.log("Generated Token:", token); // Log token details


        res.status(200).json({ // Successful login, send token to the client
            message: "Authentication successful",
            token: token,
            expiresIn: 10800, // 3 hrs in seconds
            user: {
                _id: user._id,
                username: user.username
            }
        });

    } catch (error) {
       
        console.error("Login Error:", error);  // Log detailed error information

       
        res.status(500).json({  // Send a response with error details
            error: "Internal Server Error",
            details: error.message
        });
    }
}

const signOutUser = async (req, res, next) => {  //handles user signOut

}

module.exports = { signInUser, signOutUser }
