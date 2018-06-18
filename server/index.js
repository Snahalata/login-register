//system libraries
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//take the system port or take 3000 if not available
const port = process.env.port || 3000;

//declaring the path for user routes
const user = require('./controller/user');

//initializing the node server
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//redirecting to the required routes
app.use('/user',user);


//server is listening on port 
app.listen(port,()=>{
    console.log("server has started on port "+port);
})

