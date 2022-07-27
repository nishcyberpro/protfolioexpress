const express = require('express')
const pageSchema = require('../model/Pages')
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const getPages = async (req, res) => {

    let page_data = await pageSchema.find({})

    res.send(page_data)


}



const insertPages = async (req, res) => {
    let { title, content, _id } = req.body;
    const author = mongoose.Types.ObjectId(req.user._id);


    let slug = title.replace(/\s/g, '-')
    slug = slug.replace('/', '-')
    let published_date = new Date();
    let page_data = await pageSchema.create({
        title, slug, content, published_date, author
    })
    res.send(page_data)
}

const editPages = async (req, res, next) => {
    let { title, content, id } = req.body;
    let slug = title.replace(/\s/g, '-')
    published_date = new Date();
    let pagedata = []
    //let pageId = "62c0285383fb82a38fd8955a"
    try {
        pagedata = await pageSchema.findByIdAndUpdate(id, {
            title, content, slug
        }, { new: true })
    }
    catch (err) {
        next(err)
    }
    if (pagedata) {
        res.send(pagedata)
    }
}
const getPagesById = async (req, res) => {

    const _id = req.params.id;
    let pagedata = null;
    if (ObjectId.isValid(_id)) {


        pagedata = await pageSchema.findById(_id)
    }





    if (pagedata) {
        res.send(pagedata)
    }
    else {
        res.send("no data found")
    }
}


const deleltePages = async (req, res) => {
    let pageId = req.params.id
    let pagedata = await pageSchema.findByIdAndDelete(pageId)
    if (pagedata) {
        res.send("item deleted" + pagedata)
        return
    }
    else {
        res.send("no entry found")
        return
    }
}
module.exports = {
    getPages,
    insertPages,
    editPages,
    deleltePages,
    getPagesById
}