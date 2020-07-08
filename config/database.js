const mongoose = require("mongoose");



//db connect
const db = "mongodb+srv://root:root@cluster0.hckax.mongodb.net/blog?retryWrites=true&w=majority";

//db setting
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err.message));

