const express = require("express");
const router = express.Router();

const PhraseController = require("../controllers/phrase_controller");

router.post("/store-clause", PhraseController.store);

module.exports = router;
