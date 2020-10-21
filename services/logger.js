const logger = require("debug");

const debug = logger("sendgrid-nodejs-endpoint:server")
const error = logger("sendgrid-nodejs-endpoint:error");
const log = logger("sendgrid-nodejs-endpoint:log")

module.exports = {debug, error, log};