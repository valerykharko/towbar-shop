require("dotenv").config();
const express = require("express");
const path = require("path");
const sequelize = require("./database/db");
const models = require("./database/models/models");
const PORT = process.env.PORT || 5000;
const server = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const bodyParser = require("body-parser");

server.use(cors());
server.use(express.json());
server.use(
  express.static(path.resolve(__dirname, "database/static/documents"))
);
server.use(express.static(path.resolve(__dirname, "database/static/images")));
server.use(fileUpload({}));
server.use(bodyParser.urlencoded({ extends: false }));
server.use("/api", router);

// Обработка ошибок, последний Middleware
server.use(errorHandler);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();