const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()


const user_route = require("./routes/user")
const pages_route = require("./routes/Pages")
const contact_route = require('./routes/Contact')
const blog_route = require('./routes/Blog')
const portfolio_route = require('./routes/Protfolio')
const getall_route = require('./routes/GetAll')
const cors = require("cors")
const path = require('path')

const app = express();

// global middleware
app.use(express.static('public'))
app.use(express.json());
app.use(cors())

app.use("/api/user", user_route)
app.use("/portfolio", portfolio_route)


app.use("/api/pages", pages_route)
app.use("/api/contact", contact_route)
app.use("/api/blog", blog_route)

app.use("/getall", getall_route)


// var mongoDB = 'mongodb://localhost:27017/mywebsite';




const mongoDB = "mongodb+srv://nsn01:Ln8WrUtEFuVv7Vkr@cluster0.j2vwlvk.mongodb.net/nsn?retryWrites=true&w=majority";

mongoose.connect(mongoDB)
    .then(res => {
        console.log("connected")
    })
    .catch(res => {
        console.log("err")
    });





app.listen((process.env.PORT || 5000), "0.0.0.0", () => {
    console.log("listenting on port 5000")
});