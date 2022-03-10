require('dotenv').config();
const express = require('express');
const cors = require('cors'); //note: verificar os hearders de origin 
const bodyParser = require('body-parser');

const server = express();
server.use(cors());
server.use(bodyParser.json());

const routes = require('./routes.js');

server.use('/api', routes);


//false = allows parsing the URL-encoded data with the querystring library
server.use(bodyParser.urlencoded({extended: false}));

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log('Server up on http://localhost:%d', process.env.PORT);
})

