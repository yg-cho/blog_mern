const mongoose = require("mongoose");






const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        handle: {
            type: String,
            required: true,
            max: 40
        },
        company: {
            type: String
        },
        website: {
            type: String
        },
        location: {
            type: String
        },
        status: {
            type: String,
            required: true
        },
        skills: {
            type: [String],
            required: true
        },
        bio: {
            type: Boolean
        },
        githubusername: {
            type: String
        },
        experience: [],
        education: []


    },
    {
        timestamps: true
    }
);











module.exports = mongoose.model("profile", profileSchema);