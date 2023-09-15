const UserModel = require("../Models/UserModel");

const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, "aa twitter clone key", {
        expiresIn: maxAge,
    })
}

const handleErrors = (err) => {
    let errors = {email: "", username: "", password: ""}

    if(err.message === "Incorrect Email") errors.email = "Email is not registered"

    if(err.message === "Incorrect Password") errors.email = "Password is wrong"

    if (err.code === 11000 && err.keyPattern.username) {
        errors.email = "Username already exists."
        return errors;
    }
    if (err.code === 11000 && err.keyPattern.email) {
        errors.email = "Email already exists."
        return errors;
    }
    if( err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.signup = async (req, res, next) => {
    try {
        const { first_name, last_name, email, username, password, followers, following } = req.body;
        const user = await UserModel.create({ first_name, last_name, email, username, password, followers, following  });
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(201).json({ user: user._id, created: true });

    } catch (error) {
        console.log(error)
        const errors = handleErrors(error);
        res.json({errors, created: false});

    }
};
module.exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await UserModel.login( email, password);
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(200).json({ user: user._id, created: true });

    } catch (error) {
        console.log(error)
        const errors = handleErrors(error);
        res.json({errors, created: false});

    }
};