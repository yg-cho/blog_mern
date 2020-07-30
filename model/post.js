const mongoose = require("mongoose");





const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        likes: [
            {
                user: {
                    type: mongoose.SChema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ],
        reply: [],

    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("post", postSchema);