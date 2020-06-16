const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const faculty = require('./routes/api/faculty');
const cors = require('cors');
const app = express();

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/college-management-system',{useNewUrlParser: true,useUnifiedTopology:false ,useCreateIndex:true,useFindAndModify:false })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const corsOption = {
  exposedHeaders: ['Authorization','x-auth-token']
}

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use("/api/users", users);
app.use("/api/admin",admin);
app.use("/api/faculty",faculty);



const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port}!`));