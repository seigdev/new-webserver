const Phrase = require("../models/phrase_model");

// add phrase to database
const store = (req, res, next) => {
  var clause = req.body.clause;
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
