"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'prasetio017@gmail.com', // generated ethereal user
      pass: process.env.GOOGLE_EMAIL_PASS // generated ethereal password
    }
});

const mailOptions = {
  from: 'prasetio017@gmail.com',
  to: '',
  subject: "Your register success!",
  html: 'Hello, welcome to the club!'
}


module.exports = {mailOptions, transporter}