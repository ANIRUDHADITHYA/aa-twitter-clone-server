const { saveTweet } = require('../Middlewares/TweetMw');
const jwt = require('jsonwebtoken');
const Tweets = require('../Models/TweetModel');
const router = require('express').Router();

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    

    if (!token) {
        
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
        
    }

    jwt.verify(token, 'aa twitter clone key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        req.user = decoded;
        next();
    });
}
router.post("/save-tweet", verifyToken, saveTweet);
router.get('/all', async (req, res) => {
    try {
      const tweets = await Tweets.find();
      res.json(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving tweets' });
    }
  });


module.exports = router;
