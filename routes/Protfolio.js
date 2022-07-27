const express = require('express')

const router = express.Router();
const protfolio_controller = require('../controller/Protfolio')
const auth = require('../middleware/authentication')


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

//get routes to get all data from given user id
router.get("/portfolio", auth, protfolio_controller.getProtfolio)
router.get("/education", auth, protfolio_controller.getEducation)
router.get("/experience", auth, protfolio_controller.getExperience)

router.get("/projects", auth, protfolio_controller.getProject)

router.get("/skills/:id", protfolio_controller.getSkillById)

router.get("/education/:id", protfolio_controller.getEducationById)
router.get("/experience/:id", protfolio_controller.getExperienceById)

router.get("/projects/:id", protfolio_controller.getProjectById)

router.get("/skill", auth, protfolio_controller.getSkill)
router.get("/get/:id", protfolio_controller.getPortfolioBySlug)
router.post("/get", auth, protfolio_controller.checkportSlug)

//add data
router.post("/portfolio", auth, protfolio_controller.addProtfolio)
router.post("/education", auth, protfolio_controller.addEducation)
router.post("/experience", auth, protfolio_controller.addExperience)
router.post("/projects", auth, protfolio_controller.addProjects)
router.post("/skills", auth, protfolio_controller.addSkills)

//edit data
router.put("/portfolio", auth, protfolio_controller.updateProtfolio)
router.put("/education", auth, protfolio_controller.updateEducation)
router.put("/experience", auth, protfolio_controller.updateExperience)
router.put("/projects", auth, protfolio_controller.updateProjects)
router.put("/skills", auth, protfolio_controller.updateSkills)
//delete data
router.delete("/portfolio", auth, protfolio_controller.deleteProtfolio)
router.delete("/education/:id", auth, protfolio_controller.deleteEducation)
router.delete("/experience/:id", auth, protfolio_controller.deleteExperience)
router.delete("/projects/:id", auth, protfolio_controller.deleteProjects)
router.delete("/skills/:id", auth, protfolio_controller.deleteSkills)

module.exports = router