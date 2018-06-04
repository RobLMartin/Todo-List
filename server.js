// const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// const users = require("./routes/api/users");
// const profile = require("./routes/api/profile");
// const posts = require("./routes/api/posts");

const app = require("express")();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// // Passport Config
require("./config/passport")(passport);

//use routes
// app.use("/api/users", users);
// app.use("/api/profile", profile);
// app.use("/api/posts", posts);

app.listen(port, () => console.log(`Server running on port ${port}`));