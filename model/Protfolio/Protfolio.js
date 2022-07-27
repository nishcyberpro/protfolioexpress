const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProtfolioSchema = new Schema({

    name: String,
    address: String,
    email: String,
    phone_no: Number,
    author: {
        type: ObjectId,
        ref: "User"
    }

    // password:{
    //     type:String,
    //     select:false      TODO: this will not return password feild on find()  . . search for a way to return password  
    // }
});

module.exports = mongoose.model('Protfolio', ProtfolioSchema);