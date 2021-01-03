const express = require('express');
const sendgridMail = require('@sendgrid/mail');
const router = express.Router();
const logger = require("../services/logger");
const dotenv = require('dotenv');
dotenv.config()

// Initialize Sendgrid API key
if (process.env.SENDGRID_API_KEY) {
  logger.debug("SendGrid API Key:" + process.env.SENDGRID_API_KEY);
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const from = process.env.FROM;
const allowedRecipients = (process.env.ALLOWED_RECIPIENTS || "").split(" ");

/* POST mail. */
router.post('/', function (req, res, next) {

  try {
    sendMail(req.body).then(
      () => res.sendStatus(200),
      () => res.sendStatus(500)
    );
  } catch (ex) {
    logger.error("An error occurred when sending email.", ex);
    res.sendStatus(400);
  }
  
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
  
  if (params.to && !validateAllowedRecipients(params.to)) {
    throw new Error("Recipient not allowed");
  }
  if (params.cc && !validateAllowedRecipients(params.cc)) {
    throw new Error("Recipient not allowed");
  }
  if (params.bcc && !validateAllowedRecipients(params.bcc)) {
    throw new Error("Recipient not allowed");
  }

  const msg = {
    from: from,
    to: params.to,
    bcc: params.bcc,
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

function validateAllowedRecipients(recipients) {

  if (allowedRecipients.length === 0) {
    return true;
  }
  
  if (!Array.isArray(recipients)) {
    recipients = [recipients];
  }

  for (let i = 0; i < recipients.length; i++) {
    if (!allowedRecipients.includes(recipients[i])) {
      return false;
    }
  }
  
  return true;
}

module.exports = router;
