
const { body, validationResult } = require('express-validator');
const protfolio = require('../model/Protfolio/Protfolio')
const education = require('../model/Protfolio/Education')
const experience = require('../model/Protfolio/Experience')
const mongoose = require('mongoose');
const getportSlug = require("../model/Protfolio/Portslug")
const ObjectId = require('mongoose').Types.ObjectId;



const projects = require('../model/Protfolio/Projects')
const skills = require('../model/Protfolio/Skills')
const bcrypt = require('bcrypt');
require('dotenv').config()

var jwt = require('jsonwebtoken');
const Portslug = require('../model/Protfolio/Portslug');
// get all protfolio by id

const getProtfolio = async (req, res) => {
    const author = mongoose.Types.ObjectId(req.user._id);
    let result = await protfolio.findOne({ author: author })
    if (result) {

        res.send(result)

    } else {
        res.send("Not found")
    }


}
//get all education by id
const getEducation = async (req, res) => {
    console.log(req.user._id)
    const author = mongoose.Types.ObjectId(req.user._id);
    let result = await education.find({ author: author })
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}
const getEducationById = async (req, res) => {
    let id = req.params.id
    let result = []
    if (ObjectId.isValid(id)) {
        result = await education.findById(id)
    }
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}

//get all  experience by user id
const getExperienceById = async (req, res) => {
    let id = req.params.id
    let result = []
    if (ObjectId.isValid(id)) {
        result = await experience.findById(id)
    }
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}
const getExperience = async (req, res) => {
    console.log(req.user._id)
    const author = mongoose.Types.ObjectId(req.user._id);
    let result = await experience.find({ author: author })
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}

//get all projeccts by user id
const getProject = async (req, res) => {
    console.log(req.user._id)
    const author = mongoose.Types.ObjectId(req.user._id);
    let result = await projects.find({ author: author })
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}

const getProjectById = async (req, res) => {
    let id = req.params.id
    let result = []
    if (ObjectId.isValid(id)) {
        result = await projects.findById(id)
    }
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}

//get all skills by user id
const getSkill = async (req, res) => {

    const author = mongoose.Types.ObjectId(req.user._id);
    let result = await skills.find({ author: author })
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}
const getSkillById = async (req, res) => {
    let id = req.params.id
    let result = []
    if (ObjectId.isValid(id)) {
        result = await skills.findById(id)
    }
    if (result) {
        res.send(result)

    } else {
        res.send("Not found")
    }
}

const addProtfolio = async (req, res) => {


    const author = mongoose.Types.ObjectId(req.user._id);
    let { name, address, email, phone_no } = req.body
    let data = await protfolio.create({
        name, address, email, phone_no, author
    })
    if (data) {
        res.send(data)
    }
    else {
        res.send("erro")
    }
}

const addEducation = async (req, res) => {
    console.log("here")
    let { title, organization, address, city, country, website, datefrom, dateto } = req.body
    const author = mongoose.Types.ObjectId(req.user._id);

    let data = await education.create({
        title, organization, address, city, country, website, author
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }
}
const addExperience = async (req, res) => {

    const author = mongoose.Types.ObjectId(req.user._id);

    let { title, employer, address, city, country, website, activities, datefrom, dateto } = req.body

    let data = await experience.create({
        title, employer, address, city, country, website, activities, author, datefrom, dateto
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }
}

const addProjects = async (req, res) => {

    const author = mongoose.Types.ObjectId(req.user._id);
    let { title, role, address, city, country, website } = req.body


    let data = await projects.create({
        title, role, address, city, country, website, author
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }

}

const addSkills = async (req, res) => {


    const author = mongoose.Types.ObjectId(req.user._id);
    let { title, description } = req.body
    let data = await skills.create({
        title, description, author
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }
}
const updateProtfolio = async (req, res) => {


    let { name, address, email, phone_no } = req.body
    const author = mongoose.Types.ObjectId(req.user._id);



    let result = []
    try {
        result = await protfolio.findOneAndUpdate({ author: author }, {
            name, address, email, phone_no
        }, { new: true })
    }
    catch (err) {
        next(err)
    }
    if (result) {
        res.send(result)
    }
    else {
        res.status(401).send({
            data: "unauthenticated"
        })
    }


}
const updateEducation = async (req, res) => {
    let { title, organization, address, city, country, website, id, datefrom, dateto } = req.body
    const author = mongoose.Types.ObjectId(req.user._id);

    let data = await education.findByIdAndUpdate(id, {
        title, organization, address, city, country, website, author, datefrom, dateto
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }
}
const updateExperience = async (req, res) => {
    let { title, employer, address, city, country, website, activities, id, datefrom, dateto } = req.body
    const author = mongoose.Types.ObjectId(req.user._id);

    let data = await experience.findByIdAndUpdate(id, {
        title, employer, address, city, country, website, activities, author, datefrom, dateto
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }
}
const updateProjects = async (req, res) => {
    let { title, role, address, city, country, website, id } = req.body
    const author = mongoose.Types.ObjectId(req.user._id);

    let data = await projects.findByIdAndUpdate(id, {
        title, role, address, city, country, website, author
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }
}
const updateSkills = async (req, res) => {
    let { title, description, id } = req.body
    const author = mongoose.Types.ObjectId(req.user._id);

    let data = await skills.findByIdAndUpdate(id, {
        title, description, author
    })
    if (data) {
        res.send(data)


    }
    else {
        res.send("error")
    }
}
const deleteProtfolio = async (req, res) => {
    // let pageId = req.params.id
    // let pagedata = await pageSchema.findByIdAndDelete(pageId)
    // if (pagedata) {
    //     res.send("item deleted" + pagedata)
    //     return
    // }
    // else {
    //     res.send("no entry found")
    //     return
    // }
}
const deleteEducation = async (req, res) => {
    let pageId = req.params.id
    let pagedata = await education.findByIdAndDelete(pageId)
    if (pagedata) {
        res.send("item deleted" + pagedata)
        return
    }
    else {
        res.send("no entry found")
        return
    }
}
const deleteExperience = async (req, res) => {
    let pageId = req.params.id
    let pagedata = await experience.findByIdAndDelete(pageId)
    if (pagedata) {
        res.send("item deleted" + pagedata)
        return
    }
    else {
        res.send("no entry found")
        return
    }
}
const deleteProjects = async (req, res) => {
    let pageId = req.params.id
    let pagedata = await projects.findByIdAndDelete(pageId)
    if (pagedata) {
        res.send("item deleted" + pagedata)
        return
    }
    else {
        res.send("no entry found")
        return
    }
}
const deleteSkills = async (req, res) => {
    let pageId = req.params.id
    let pagedata = await skills.findByIdAndDelete(pageId)
    if (pagedata) {
        res.send("item deleted" + pagedata)
        return
    }
    else {
        res.send("no entry found")
        return
    }
}


const getPortfolioBySlug = async (req, res) => {

    let id = req.params.id
    let result = await protfolio.findById(id)
    res.send(result)

}
// res.send("in getport slug" + req.params.id)



// getPortfolioBySlug()

const setPortfolioBySlug = (req, res) => {

}

const checkportSlug = async (req, res) => {
    console.log(req.body.linkslug)
    let slug = req.body.linkslug
    const author = mongoose.Types.ObjectId(req.user._id);

    let result = await getportSlug.findOne({ slug: slug })
    if (result) {

        res.send("data exist")
    }
    else {
        let data = await getportSlug.create({
            slug, author

        })
        if (data) {
            res.send(data)
        }
        else {
            res.send("error")
        }
    }
}

module.exports = {
    getProtfolio,
    getEducation,
    getEducationById,
    getExperience,
    getExperienceById,
    getProject,
    getProjectById,
    getSkill,
    getSkillById,
    addProtfolio,
    addEducation,
    addExperience,
    addProjects,
    addSkills,
    updateProtfolio,
    updateEducation,
    updateExperience,
    updateExperience,
    updateProjects,
    updateSkills,
    deleteProtfolio,
    deleteEducation,
    deleteExperience,
    deleteProjects,
    deleteSkills,
    getPortfolioBySlug,
    setPortfolioBySlug,
    checkportSlug,

}