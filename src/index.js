const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv').config()


const app = express();
const port = 4000;


const db = require('./config/db/index');
db.connect();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


// router
const route = require('./route/index');
route(app);

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})