var express = require('express');
var router = express.Router();
var Auth_mdw = require('../middlewares/auth');
var knex = require('../database');

router.get('/', Auth_mdw.check_login, function (req, res, next) {
  return res.render('frontend/listgroups', {
    email: req.session.email,
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
});

router.get('/listGroups', function (req, res, next) {
  return new Promise(function (resolve, reject) {
    knex
      .select()
      .from('tbl_groups')
      .then((response) => {
        console.log(response.data);
        resolve(
          res.json({
            data: response,
          })
        );
      })
      .catch((error) => reject(error));
  });
});

module.exports = router;
