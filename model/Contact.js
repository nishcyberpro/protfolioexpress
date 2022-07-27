const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ContactsSchema = new Schema({
    name: String,
    email: String,
    phone_no: Number,
    message: String


    // password:{
    //     type:String,
    //     select:false      TODO: this will not return password feild on find()  . . search for a way to return password  
    // }
});

module.exports = mongoose.model('Contacts', ContactsSchema);