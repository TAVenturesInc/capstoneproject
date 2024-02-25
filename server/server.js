const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(require("./routes/auth/login"));
app.use(require("./routes/auth/register"));
app.use(require("./routes/auth/profile"));
app.use(require("./routes/games"));

// Get MongoDB driver connection
const dbo = require("./db/conn");

app.listen(port, async () => {
  // Perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`${process.env.SESSION_SECRET}`)
  console.log(`Server is running on port: ${port}`);
});
