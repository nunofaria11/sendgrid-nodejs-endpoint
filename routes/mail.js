const express = require('express');
const sendgridMail = require('@sendgrid/mail');
const router = express.Router();
const logger = require("../services/logger")

// Initialize Sendgrid API key
if (process.env.SENDGRID_API_KEY) {
  logger.debug("SendGrid API Key:" + process.env.SENDGRID_API_KEY);
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
}


/* POST mail. */
router.post('/', function(req, res, next) {
  
  sendMail(req.body).then(
    () => res.sendStatus(200),
    () => res.sendStatus(500),
  );
});

/**
 * Sends an email using SendGrid API.
 * @param {Object} params A parameters object with the following properties:
 *  @param {String|Array} params.to
 *  @param {String|Array} params.bcc
 *  @param {String|Array} params.from
 *  @param {String} params.subject
 *  @param {String} params.text
 *  @param {String} params.html
 * @returns Promise
 */
function sendMail(params) {
  logger.debug("Sending email...");
    var msg = {
        to: params.to,
        bcc: params.bcc,
        from: params.from,
        subject: params.subject,
        text: params.text,
        html: params.html,
    };
    return sendgridMail.send(msg).then(
      (result) => {
        logger.debug("Email sent succesfully.", result)
        return result;
      },
      (err) => {
        logger.error("An error occurred when sending email.", err);
        return Promise.reject(err);
      }
    );
}


module.exports = router;
