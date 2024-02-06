const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/games"));
app.use(require("./routes/records"));

// Get MongoDB driver connection
const dbo = require("./db/conn");

app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
