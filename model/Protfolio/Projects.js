const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProjectsSchema = new Schema({

    title: String,
    role: String,
    address: String,
    city: String,
    country: String,
    website: String,
    author: {
        type: ObjectId,
        ref: "User"
    }


});

module.exports = mongoose.model('Projects', ProjectsSchema);