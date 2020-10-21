var express = require('express');
var router = express.Router();

/* POST mail. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
