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
      pass: "eightninemo65",
    },
  });

  // Email data
  const mailOptions = {
    from: "eightninemo@gmail.com",
    to: "eightninemo@gmail.com",
    subject: "Hello, World!",
    text: "This is the email body.",
  };
  let phrase = Phrase({
    clause: req.body.clause,
  });
  console.log(phrase);
  if (clause != "") {
    phrase
      .save()
      .then((response) => {
        res.status(200).json({
          status: true,
          message: "Phrase Saved Successfully",
          data: response,
        });

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
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
