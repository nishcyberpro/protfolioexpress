const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EducationSchema = new Schema({

    title: String,
    organization: String,
    address: String,
    city: String,
    country: String,
    website: String,
    datefrom: String,
    dateto: String,
    author: {
        type: ObjectId,
        ref: "User"
    }


});

module.exports = mongoose.model('Education', EducationSchema);