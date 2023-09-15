const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    author_username: {
        type: String,
        required: [true, "Required Author"]
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
        required: [true, "Last Name is Required"],
    },
    tweet: {
        type: String,
        required: [true, "Last Name is Required"],

    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: String,
        
    }

});


module.exports = mongoose.model("Tweets", tweetSchema);