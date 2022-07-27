const express = require('express')

const router = express.Router();
const page_Controller = require('../controller/Pages')
const pageSchema = require('../model/Pages')
const auth = require('../middleware/portauth')

const { body, validationResult } = require('express-validator');



const checkValidation = async (req, res, next) => {

    let slug = req.body.title.replace(/\s/g, '-')
    // let page_id = "62c0285383fb82a38fd8955a"
    let pagedata = await pageSchema.findOne({ slug: slug })


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




router.get('', page_Controller.getPages)
router.post('', auth, checkValidation, page_Controller.insertPages)
router.put('', auth, page_Controller.editPages)
router.delete('/:id', auth, page_Controller.deleltePages)
router.get("/:id", page_Controller.getPagesById)
router.put("/:id", auth, page_Controller.editPages)



module.exports = router