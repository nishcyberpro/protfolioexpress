const contactSchema = require("../model/Contact")
var nodemailer = require('nodemailer');


const getContacts = async (req, res) => {
    let contact_data = await contactSchema.find({})
    res.send(contact_data)

}

const setContacts = async (req, res) => {

    let { name, email, phone_no, message } = req.body
    let contact_data = await contactSchema.create({
        name, email, phone_no, message
    })
    if (contact_data) {


        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5ab80971d368d0",
                pass: "e2ac4766efd249"
            }
        });


        // send mail with defined transport object
        let info = transport.sendMail({
            from: email, // sender address
            to: "nishcyber420@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: message, // plain text body
            // html body
        }, (err, data) => {
            if (err) console.log(err);
            console.log(data);
        });
        res.send(contact_data)
        return
    }
    return
}

const deleteContacts = async (req, res) => {
    let id = req.params.id
    let result = await contactSchema.findByIdAndDelete(id)
    if (result) {

        res.send(result)
    }
}
module.exports = {
    getContacts,
    setContacts,
    deleteContacts,

}