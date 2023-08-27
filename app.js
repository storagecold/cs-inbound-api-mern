require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
const DBSetup = require("./app/config/DB");
const path = require("path");

const app = express();
app.use(cors());

const http = require("http").Server(app);
const socketio = require("socket.io");
const io = socketio(http);

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
const { swaggerServe, swaggerSetup } = require("./swagger/swaggerConfig");
// swagger
app.use("/api/v1/swagger-ui", swaggerServe, swaggerSetup);

const userAuthRoutes = require("./app/routes/UserRoute");
const accountRoutes = require("./app/routes/AccountRoute");
const amadRoutes = require("./app/routes/AmadRoute");

app.use("/api/v1/", userAuthRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", amadRoutes);

const server = http.listen(process.env.PORT, function () {
  console.log(chalk.green("✓"), " App is running at", process.env.PORT);
});

io.listen(server);
