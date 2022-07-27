const express = require('express')
const multer = require('multer');
const path = require("path")

const router = express.Router();
const blog_controller = require('../controller/Blogs')
const blogSchema = require('../model/Blog')
const auth = require('../middleware/portauth')
const { body, validationResult } = require('express-validator');



const checkValidation = async (req, res, next) => {
    console.log(req.body)
    let slug = req.body.title.replace(/\s/g, '-')
    // let page_id = "62c0285383fb82a38fd8955a"
    let pagedata = await blogSchema.findOne({ slug: slug })


    if (pagedata) {
        // if (pagedata._id.toString() == page_id) {
        //     next();
        //     return
        // }
        // console.log(pagedata._id.toString())
        //console.log(page_data)
        res.send("data exist")
        return
    }
    next()

}
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))



    }
}
)

const upload = multer({ storage: storage })



router.get('', blog_controller.getblogs)
router.get('/featured', blog_controller.getFeatured)
router.post('', auth, upload.array('photos', 12), checkValidation, blog_controller.insertblogs)
router.delete('/:id', auth, blog_controller.deleteblogs)
router.get("/:id", blog_controller.getBlogById)

//router.get("/content/:slug", blog_controller.getBlogBySlug)
router.put('', auth, upload.array('photos', 12), blog_controller.editblogs)


module.exports = router