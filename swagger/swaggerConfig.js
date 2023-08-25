const fs = require('fs');
const customCss = fs.readFileSync('swagger/swagger.css', "utf8");
const swaggerDocument = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");
const options = {
    customCss,
    customfavIcon: "/favicon.ico",
    customSiteTitle: "CS-INBOUND-API- Swagger"
}
module.exports = { swaggerServe: swaggerUi.serve, swaggerSetup: swaggerUi.setup(swaggerDocument, options) };
