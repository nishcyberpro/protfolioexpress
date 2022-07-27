const UserSchema = require('./model/User')
const ContactsSchema = require('./model/Contact')
const ProtfolioSchema = require('./model/Protfolio')
const PagesSchema = require('./model/Pages')


const createUser = async (req, res) => {
    let name = "nimanta"
    let email = "dfd@gd.cpm"
    let role_id = "62bf26fbc3274d7718ab7"
    let password = "password"

    let users = await UserSchema.create({
        name, email, role_id, password
    })

}
const createBlog = async (req, res) => {
    let title = "first blog"
    let featured_image = "img.jpged"
    let published_date = new Date()
    let content = "thissi shterdfsdfjdslfjsdlfjdsfjdsfd"
    let author = "62bf26fbc3274453d7718ab7"
    let blogs = BlogSchema.create({
        title, featured_image, published_date, content, author
    })

}

const createPage = async (req, res) => {

    let title = "new page"
    let content = "new conetent"
    let published_date = new Date();
    let author = "62bf26fbc3274453d7718ab7"
    let pages = PagesSchema.create({
        title, content, published_date, author
    })
}

const createContact = async (req, res) => {

    let name = "nishanta"
    let email = "this@that.com"
    let phone_no = 980808080
    let message = "i am interestedin your country"
    let contacts = ContactsSchema.create({
        name, email, phone_no, message
    })
}

let createProtfolio = async (req, res) => {
    let personal_details = {
        name: "nsihata",
        email: "dfdfd",
        phone_no: 3434343,
        address: "dfdfnfdfd"
    }
    let education_details = [
        {
            title: "+2",
            oranization: "whitefield",
            address: "nayavzar",
            dateFrom: "2022-07-01T17:38:58.257+00:00",
            dateTo: "2023-07-01T17:38:58.257+00:00"
        },
        {
            title: "+2",
            oranization: "whitefield",
            address: "nayavzar",
            dateFrom: "2022-07-01T17:38:58.257+00:00",
            dateTo: "2023-07-01T17:38:58.257+00:00"
        }
    ]
    ProtfolioSchema.create({
        personal_details, education_details
    })
}