const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const serviceRoute = require("./src/routes/serviceRoute.js");
const userRoute = require('./src/routes/userRoute.js');
const orderRoute = require('./src/routes/orderRoute.js');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const port = 3000;
const app = express();

const swaggerSpec = require("./src/docs/swagger-config.js");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const serviceObserver = require("./src/notification/observer/serviceObserver.js");
const userObserver = require("./src/notification/observer/userObserver.js");
const notificationManager = require("./src/notification/notificationManager.js");
notificationManager.subscribe(serviceObserver);
notificationManager.subscribe(userObserver);

mongoose.connect("mongodb://0.0.0.0:27017/fiverr");

app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.xml());

app.use("/service", serviceRoute);
app.use("/users", userRoute);


app.use('/order', orderRoute);

app.listen(port, () => console.log(`Listening on : ${port}`));
