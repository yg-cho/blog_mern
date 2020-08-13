const mongoose = require("mongoose");

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}


//db setting
mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://root:root@cluster0.hckax.mongodb.net/blog?retryWrites=true&w=majority", dbOptions)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err.message));
mongoose.Promise = global.Promise;
