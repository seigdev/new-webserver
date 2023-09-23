const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phraseSchema = new Schema(
  {
    clause: {
      type: String,
    },
  },
  { timestamps: true }
);

const Phrase = mongoose.model("Phrase", phraseSchema);
module.exports = Phrase;
