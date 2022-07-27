const express = require('express')

const router = express.Router();
const User = require("../model/user")
const auth = require("../middleware/authentication")

const user_controller = require("../controller/user")

//const authentication = require("../middleware/authentication")

const { body, validationResult } = require('express-validator');

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

const checkValidation = validate([
    body('email').isEmail().custom(value => {
        return User.findOne({ email: value }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    // password must be at least 5 chars long
    body('password').isLength({ min: 8 })


])

// router.post("/signup",user_controller.signup)
router.post("/signup", checkValidation, user_controller.signup)
router.post("/login", user_controller.login)
router.post("/data", auth, user_controller.getUser)

module.exports = router