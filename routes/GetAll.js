const express = require('express')
const multer = require('multer');
const path = require("path")

const router = express.Router();
const all_controller = require('../controller/GetAll')



router.get('/blog/:id', all_controller.getBlogDataBySlug)
router.get('/page/:id', all_controller.getPageBySlug)
router.get('/portfolio/:id', all_controller.getPortfolioDataById)




module.exports = router