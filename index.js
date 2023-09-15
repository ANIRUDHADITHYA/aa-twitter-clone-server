const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
const userRouters = require('./Routes/UserRoutes');
const tweetRouters = require('./Routes/TweetRoutes');


const app = express();
const cookieParser = require('cookie-parser');


app.get('/', (req, res) => {
    res.send("Welcome!!,  Anirudh Adithya's Twitter Server")
})


app.listen(3001, ()=> {
    console.log("Server Started")
})


mongoose.connect("mongodb://localhost:27017/aa-twitter-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB Connected");
}).catch((error)=>{
    console.log(error.message);
})


app.use(
    cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
})
);

app.use(cookieParser());

app.use(express.json());

app.use('/', authRoutes);
app.use('/user', userRouters);
app.use('/tweets', tweetRouters)