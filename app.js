const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const serviceRoute = require("./src/routes/serviceRoute.js");
const userRoute = require('./src/routes/userRoute.js');

const port = 3000;
const app = express();

const swaggerSpec = require("./src/docs/swagger-config.js");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect("mongodb://0.0.0.0:27017/fiverr");

app.use(express.urlencoded());
app.use(express.json());

app.use("/service" , serviceRoute);


app.use('/users', userRoute);

app.listen(port, () => console.log(`Listening on : ${port}`));
