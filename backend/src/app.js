const express =  require('express');
require('dotenv').config();

const app = express();
const dbConnect = require('../config/dbConnect');

//connect to database
dbConnect();

// enable body parsing
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Dev Request Logging
const morgan = require('morgan');
app.use(morgan('dev'));


app.get('/',  (req, res) => {
  res.send('Hello, world!');
});


// import and use user router
const userRouter = require('../routes/user.routes');
app.use('/user', userRouter);

// import and use task router
const taskRouter = require('../routes/task.routes');
app.use('/task' , taskRouter);

module.exports = app;