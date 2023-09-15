const Tweet = require('../Models/TweetModel');
const jwt = require('jsonwebtoken');

module.exports.saveTweet = async (req, res, next) => {
    try {
        const { author_username, first_name, last_name, tweet } = req.body;

        const token = req.headers.authorization;
        jwt.verify(token, 'aa twitter clone key', 
        async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const newTweet = new Tweet({
                author_username,
                first_name,
                last_name,
                tweet,
                user_id: decoded.userId,
            });

            await newTweet.save();
            res.status(201).json({ message: 'Tweet posted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving your tweet' });
    }
};
