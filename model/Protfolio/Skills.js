const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SkillsSchema = new Schema({

    title: String,
    description: String,

    author: {
        type: ObjectId,
        ref: "User"
    }


});

module.exports = mongoose.model('Skills', SkillsSchema);