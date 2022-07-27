const express = require('express')
const blogsSchema = require('../model/Blog')
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;


const getblogs = async (req, res) => {

    let blogs_data = await blogsSchema.find({}).sort({ published_date: 'desc' });

    res.send(blogs_data)


}
const getBlogById = async (req, res) => {
    const _id = req.params.id;
    let blogs_data = null;
    if (ObjectId.isValid(_id)) {


        blogs_data = await blogsSchema.findById(_id)
    }





    if (blogs_data) {
        res.send(blogs_data)
    }
    else {
        res.send("no data found")
    }




}
const getBlogBySlug = async (req, res) => {
    const slug = req.params.slug.replace(/\s/g, '-')


    const blogs_data = await blogsSchema.findOne({ slug: slug })
    console.table(blogs_data)
    res.send(blogs_data)


}



const insertblogs = async (req, res) => {
    let { title, content, featured, filename, images } = req.body;

    const author = mongoose.Types.ObjectId(req.user._id);
    if (req.files) {
        images = req.files.map(el => {
            return 'http://localhost:8000/' + el.filename;
        })

    } else {
        images = []
    }

    let slug = title.replace(/\s/g, '-')
    slug = slug.replace('/', '-')
    let published_date = new Date();
    let blogs_data = await blogsSchema.create({
        title, slug, content, published_date, author, featured, images
    })
    res.send(blogs_data)
    console.log(blogs_data)
}

const editblogs = async (req, res, next) => {
    let { title, content, featured, filename, images } = req.body;

    if (req.files) {
        images = req.files.map(el => {
            return 'http://localhost:8000/' + el.filename;
        })

    } else {
        images = []
    }
    let blogsId = req.params.id
    let slug = title.replace(/\s/g, '-')
    published_date = new Date();

    //let blogsId = "62c0285383fb82a38fd8955a"
    try {
        blogsdata = await blogsSchema.findByIdAndUpdate(blogsId, {
            title, content, slug, published_date, featured, images
        }, { new: true })
    }
    catch (err) {
        next(err)
    }
    if (blogsdata) {
        res.send(blogsdata)
    }
}

const deleteblogs = async (req, res) => {
    let blogsId = req.params.id
    let blogsdata = await blogsSchema.findByIdAndDelete(blogsId)
    if (blogsdata) {
        res.send("item deleted" + blogsdata)
        return
    }
    else {
        res.send("no entry found")
        return
    }
}

const getFeatured = async (req, res) => {

    let blogs_data = await blogsSchema.find({ featured: true }).sort({ published_date: 'desc' }).limit(3);

    res.send(blogs_data)
}
module.exports = {
    getblogs,
    insertblogs,
    editblogs,
    deleteblogs
    , getBlogById,
    getBlogBySlug,
    getFeatured,
}