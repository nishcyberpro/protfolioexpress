const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()


const user_route = require("./routes/User")
const pages_route = require("./routes/Pages")
const contact_route = require('./routes/Contact')
const blog_route = require('./routes/Blog')
const portfolio_route = require('./routes/Protfolio')
const getall_route = require('./routes/GetAll')
const cors = require("cors")
const path = require('path')

const app = express();
app.get('/', (req, res) => {
    res.send('hello world')
})
// global middleware
app.use(express.static('public'))
app.use(express.json());
app.use(cors())

app.use("/api/User", user_route)
app.use("/Portfolio", portfolio_route)


app.use("/api/Pages", pages_route)
app.use("/api/Contact", contact_route)
app.use("/api/Blog", blog_route)

app.use("/Getall", getall_route)


// var mongoDB = 'mongodb://localhost:27017/mywebsite';




const mongoDB = "mongodb+srv://nsn01:Ln8WrUtEFuVv7Vkr@cluster0.j2vwlvk.mongodb.net/nsn?retryWrites=true&w=majority";

mongoose.connect(mongoDB)
    .then(res => {
        console.log("connected")
    })
    .catch(res => {
        console.log("err")
    });





app.listen((process.env.PORT || 3000), "0.0.0.0", () => {
    console.log("listenting on port 5000")
});
