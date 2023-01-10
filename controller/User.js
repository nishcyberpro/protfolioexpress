const User = require("../model/User");
const router = require("../routes/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
require('dotenv').config()

var jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {

    let { name, email, password } = req.body

    let role_id = "62bf2708c3274453d7718ab9"

    // let user = await User.create({
    //     name: "1111",
    //     email: "tesfsdfasdfsSDFdsdfting@testing.com",
    //     afsd: "afsdf"
    // })

    const saltRounds = 10;
    let hashed_password = await bcrypt.hash(password, saltRounds);

    let user = await User.create({
        name,
        email,
        password: hashed_password,
        role_id,
    })

    if (user) {
        res.send(user)
    }
}




const login = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.send('E-mail or password empty');

    }
    // Load hash from your password DB.

    let user = await User.findOne({ email })
    if (!user) {
        return res.send("User not found")
    }

    let status = await bcrypt.compare(password, user.password);
    if (!status) {
        return res.send({ data: "Invalid Credential" })
    }
    console.log(user);
    // console.log()
    let user_obj = user.toObject();
    delete user_obj.password;

    var access_token = jwt.sign(user_obj, process.env.SECRECT);

    //var refresh_token = jwt.sign(user_obj, process.env.REFRESH_TOKEN_SECRET);

    // save refresh_tokens in Database

    res.send({
        data: "success",
        access_token,

    })

}

const getUser = async (req, res) => {
    const _id = req.user._id;
    const userrole = req.role_name
    console.log(userrole)
    let user_data = await User.findById(_id)
    let user_obj = user_data.toObject();
    delete user_obj.password;
    delete user_obj._id;
    delete user_obj.role_id
    user_obj = { ...user_obj, role: userrole }
    res.send(user_obj)

}

module.exports = {
    login,
    signup,
    getUser,
}
