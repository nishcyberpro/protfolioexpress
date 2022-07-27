const blogSchema = require('../model/Blog')
const pageSchema = require('../model/Pages')
const portSchema = require('../model/Protfolio/Protfolio')

const educationSchema = require('../model/Protfolio/Education')

const experienceSchema = require('../model/Protfolio/Experience')
const projectSchema = require('../model/Protfolio/Projects')
const portslugSchema = require('../model/Protfolio/Portslug')
const skillSchema = require('../model/Protfolio/Skills')
const ObjectId = require('mongoose').Types.ObjectId;

const mongoose = require('mongoose');


const projects = require('../model/Protfolio/Projects')
const skills = require('../model/Protfolio/Skills')

const getBlogDataBySlug = async (req, res) => {
    let slug = req.params.id
    let result = await blogSchema.findOne({ slug: slug })

    res.send(result)
}
const getPortfolioDataById = async (req, res) => {
    let slug = req.params.id
    let portdata = await portslugSchema.findOne({ slug: slug })
    console.log(portdata)
    const author = mongoose.Types.ObjectId(portdata.author);
    let allData = []

    let about = await portSchema.find({ author: author })
    let tag = "about"
    allData = { [tag]: about }
    let education = await educationSchema.find({ author: author })
    tag = "education"
    allData = { ...allData, [tag]: education }
    let experience = await experienceSchema.find({ author: author })
    tag = "experience"
    allData = { ...allData, [tag]: experience }

    let project = await projectSchema.find({ author: author })
    tag = "project"
    allData = { ...allData, [tag]: project }

    let skill = await skillSchema.find({ author: author })
    tag = "skill"
    allData = { ...allData, [tag]: skill }
    console.log(allData)
    res.send(allData)





}

const getPageBySlug = async (req, res) => {
    let slug = req.params.id
    let result = await pageSchema.findOne({ slug: slug })

    res.send(result)
}

module.exports = {
    getBlogDataBySlug,
    getPageBySlug,
    getPortfolioDataById

}