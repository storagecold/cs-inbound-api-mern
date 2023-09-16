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

const userAuthRoutes = require("./app/routes/UserRoutes");
const organizationRoutes = require("./app/routes/OrganizationRoutes");
const companyRoutes = require("./app/routes/CompanyRoutes");
const accountRoutes = require("./app/routes/AccountRoutes");
const amadRoutes = require("./app/routes/AmadRoutes");
const addressRoutes = require("./app/routes/AddressRoutes");
const partyLedgerRoutes = require("./app/routes/PartyLedgerRoutes");
const nikasiRoutes = require("./app/routes/NikasiRoutes");
const accessTokenRoutes = require("./app/routes/AccessToken");
app.use("/api/v1/accessToken", accessTokenRoutes);
app.use("/api/v1/", userAuthRoutes);
app.use("/api/v1/", organizationRoutes);
app.use("/api/v1/", companyRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", amadRoutes);
app.use("/api/v1", addressRoutes);
app.use("/api/v1", partyLedgerRoutes);
app.use("/api/v1", nikasiRoutes);

const server = http.listen(process.env.PORT, function () {
  console.log(chalk.green("✓"), " App is running at", process.env.PORT);
});

io.listen(server);
