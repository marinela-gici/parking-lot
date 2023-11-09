const nodemailerConfig = require('nodemailer');
require("dotenv").config();


module.exports.transporter = nodemailerConfig.createTransport({
  port: process.env.MAIL_PORT,
  host: process.env.MAIL_HOST,
  service:  'Mailgun',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
  secure: false
})
