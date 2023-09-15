const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");


module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "aa twitter clone key",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const user = await User.findById(decodedToken.id);
                    if (user) {
                        res.json({ 
                            status: true, 
                            user: {
                                "username":user.username, 
                                "first_name": user.first_name, 
                                "last_name": user.last_name,
                                "email":user.email,
                                "followers": user.followers,
                                "following": user.following,
                            } 
                        });
                    } else {
                        res.json({ status: false });
                    }
                    next();
                }

            })
    } else {
        res.json({ status: false });

    }
}