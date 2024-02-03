const express = require("express");
require("dotenv").config();

const app = express();
const dbConnect = require("../config/dbConnect");

//connect to database
dbConnect();

// handle cors errors
const CLIENT_SIDE_URL = "http://localhost:5173";
const cors = require("cors");
app.use(cors({ origin: CLIENT_SIDE_URL })); //

// enable body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dev Request Logging
const morgan = require("morgan");
app.use(morgan("dev"));

// root route
app.get("/", (req, res) => {
    res.send("Task Management Api");
});

// import and use user router
const userRouter = require("../routes/user.routes");
app.use("/user", userRouter);

// import and use task router
const taskRouter = require("../routes/task.routes");
app.use("/task", taskRouter);

//error handler
const { notFound, errorHandler } = require("../middleware/error-handler");
app.use(notFound);
app.use(errorHandler);

module.exports = app;
