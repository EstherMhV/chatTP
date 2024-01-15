const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const port = 3000;
const app = express();

const swaggerSpec = require("./src/docs/swagger-config.js");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect("mongodb://0.0.0.0:27017/fiverr");

app.use(express.urlencoded());
app.use(express.json());

app.listen(port, () => console.log(`Listening on : ${port}`));
