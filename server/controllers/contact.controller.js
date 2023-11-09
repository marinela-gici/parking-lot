const {transporter} = require('../config/nodemailer.config');

module.exports = {
  contact: async (req, res) => {
    try {
      let errors = {};
      const {token, firstName, lastName, email, subject, message} = req.body;
      if (!token) {
        errors["token"] = {message: "reCAPTCHA is required! Please, try again!"};
      }
      if (!firstName) {
        errors["firstName"] = {message: "First name is required!"};
      }
      if (!lastName) {
        errors["lastName"] = {message: "Last name is required!"};
      }
      if (!email) {
        errors["email"] = {message: "Email is required!"};
      }
      if (!subject) {
        errors["subject"] = {message: "Subject is required!"};
      }
      if (!message) {
        errors["message"] = {message: "Message is required!"};
      }

      if (Object.keys(errors).length !== 0) {
        return res.status(400).json({errors: errors})
      }

      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        {
          method: "POST"
        }
      );
      const data = await response.json();
      if (data.success) {
        transporter.sendMail({
          from: email,
          replyTo: email,
          to: process.env.ADMIN_EMAIL,
          subject: `New email from web - ${subject}`,
          text: message
        })
        .then(info => {
          console.log(info);
          res.json({message: "Success!"})
        })
        .catch(err => {
          console.error(err);
          res.status(500).json(err);
        })
      } else {
        res.status(500).json({message: "reCAPTCHA not verified! Please, try again!"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Error verifying reCAPTCHA"});
    }
  }
}
