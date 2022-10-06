var express = require('express');
var router = express.Router();
var Auth_mdw = require('../middlewares/auth');

router.get('/', Auth_mdw.check_login, function (req, res, next) {
  return res.render('frontend/listmessage');
});

module.exports = router;
