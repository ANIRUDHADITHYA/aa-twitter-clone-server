const express = require('express');
const router = express.Router();
const User = require("../Models/UserModel");

router.get('/get-usernames', async (req, res) => {
    try {
        const users = await User.find({}, 'username first_name last_name');
        const userFields = users.map((user) => ({
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
        }));

        res.json(userFields);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        
        const user = await User.findOne({ username }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
