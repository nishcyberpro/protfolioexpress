const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
    title: String,
    slug: String,
    content: String,
    published_date: Date,
    featured_image: String,
    featured: {
        type: Boolean,
        default: false
    },
    author: {
        type: ObjectId,
        ref: "User"
    },
    images: {
        type: []
    }



    // password:{
    //     type:String,
    //     select:false      TODO: this will not return password feild on find()  . . search for a way to return password  
    // }
});

module.exports = mongoose.model('Blog', BlogSchema);