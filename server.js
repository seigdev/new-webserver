const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const port = 3000;
const PhraseRoute = require("./routes/phrase_route");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// change connection string
mongoose.connect(
  "mongodb+srv://sooreoluwa:sooredatabase@cluster0.epsmb5x.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.on("connected", () => {
  console.log("Databases connection established.");
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", PhraseRoute);
