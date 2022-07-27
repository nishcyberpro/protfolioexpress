const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ExperienceSchema = new Schema({

    title: String,
    employer: String,
    address: String,
    city: String,
    country: String,
    website: String,
    activities: String,
    datefrom: String,
    dateto: String,
    author: {
        type: ObjectId,
        ref: "User"
    }


});

module.exports = mongoose.model('Experience', ExperienceSchema);