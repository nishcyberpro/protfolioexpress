const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PagesSchema = new Schema({
    title: String,
    slug: String,
    content: String,
    author: {
        type: [ObjectId],
        ref: "User"
    }


    // password:{
    //     type:String,
    //     select:false      TODO: this will not return password feild on find()  . . search for a way to return password  
    // }
});

module.exports = mongoose.model('Pages', PagesSchema);