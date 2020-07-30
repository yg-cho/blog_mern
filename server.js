const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const dotEnv = require("dotenv");
dotEnv.config();

const app = express();

const profileRoute = require("./routes/profile");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/post");



//Database 연결
require("./config/database");


//middle ware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
// passport config
require('./config/passport')(passport);

app.use("/profile", profileRoute);
app.use("/users", usersRouter);
app.use("/post", postRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`server started at ${PORT}`));