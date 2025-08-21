const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
require('dotenv').config();

// Use environment variables if available, otherwise fall back to config
const MONGO_URI_FINAL = process.env.MONGO_URI || MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY || require("./config/keys").SECRET_KEY;

// TODO:middleware

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//TODO: Routes

app.use("/auth", require("./routes/authRoute"));
app.use("/", require("./routes/courseRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/profile", require("./routes/profileRoute"));
app.use("/enroll-course", require("./routes/enrollRoute"));

//TODO: Deploy:

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//TODO: Database and server created

const PORT = process.env.PORT || 5000;
mongoose
  .connect(MONGO_URI_FINAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });
