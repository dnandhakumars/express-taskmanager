const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const connectDB = require("./db/connect");
const notfound = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")

require("dotenv").config();

const app = express();

const taskRoutes = require("./routes/tasks");

// middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing x-form-data-urlencoded
app.use(upload.any());

// routes
app.use("/api/v1/tasks", taskRoutes);


app.use(notfound)
app.use(errorHandler)

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
