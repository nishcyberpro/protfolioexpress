const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Portslug = new Schema({

    slug: String,
    author: {
        type: ObjectId,
        ref: "User"
    }


});

module.exports = mongoose.model('Portslug', Portslug);