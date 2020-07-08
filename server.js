const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
dotEnv.config();

const app = express();


//Database 연결
require("./config/database");


//middle ware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log("server started"));