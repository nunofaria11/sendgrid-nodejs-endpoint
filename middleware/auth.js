const logger = require('../services/logger');
const auth = require('http-auth');
const authConnect = require("http-auth-connect");

const scheme = process.env.AUTH_SCHEME;
const realm = process.env.AUTH_REALM    || "sendgrid-nodejs-endpoint";
const file = process.env.AUTH_PASSFILE  || (__dirname + "/../users.passfile")

let method;
switch(scheme) {

    case "Digest":
        logger.debug("Generating Digest auth middleware...");
        method = auth.digest({realm, file});
        break;

    case "Basic":
        logger.debug("Generating Basic auth middleware...");
        method = auth.basic({realm, file});
        break;

    default:
        logger.debug("Not generating auth middleware...");
        method = null;
        break;

}

if (method) {
    
    method.on("success", (result, req) => {
        logger.debug(`User authenticated: ${result.user}`);
    });

    method.on("fail", (result, req) => {
        logger.debug(`User authentication failed: ${result.user}`);
    });

    method.on("error", (error, req) => {
        logger.debug(`Authentication error: ${error.code + " - " + error.message}`);
    });

    module.exports = authConnect(method);
} else {
    module.exports = (req, res, next) => next();
}