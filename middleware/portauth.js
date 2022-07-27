const jwt = require("jsonwebtoken")
const Role = require("../model/Roles")
require('dotenv').config()


module.exports = async (req, res, next) => {

    console.log(req.headers.authorization)
    if (req.headers.authorization == 'null' || !req.headers.authorization) {
        console.log("inside no")
        return res.status(401).send({
            data: "Unauthorized"
        })
    }

    const token = req.headers.authorization;

    let decoded = jwt.verify(token, process.env.SECRECT)
    console.table(decoded)
    if (decoded) {
        req.user = decoded
        let role = await Role.findById(req.user.role_id)
        console.log(role)
        if (role.role_name == 'Admin') {
            next()
        }
        else {
            res.status(401).send({
                data: "unauthenticated"
            })
        }



    } else {
        res.status(401).send({
            data: "unauthenticated"
        })
    }


}


