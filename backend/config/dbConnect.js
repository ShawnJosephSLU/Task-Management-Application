const mongoose = require("mongoose");

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_CONN_URL);
        console.log("Database Connection Successful:");
    } catch (error) {
        console.log("Database Connection Error:", error);
    }
};

module.exports = dbConnect;
