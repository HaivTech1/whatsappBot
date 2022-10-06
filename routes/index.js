var express = require('express');
var router = express.Router();
var knex = require('../database');
const fs = require('fs');
var Auth_mdw = require('../middlewares/auth');

const SESSIONS_FILE = './whatsapp-sessions.json';

const saveAccountData = (data) => {
  const file = data;
  const saveFile = JSON.stringify(file);
  fs.writeFileSync(SESSIONS_FILE, saveFile, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully!');
    }
  });
};

const getAccountData = () => {
  try {
    var data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf-8'));
    return data;
  } catch (error) {
    console.log(error);
  }
};

router.get('/', Auth_mdw.check_login, function (req, res, next) {
  res.render('frontend/home', {
    email: req.session.email,
    username: req.session.username,
    role: req.session.role,
    // token: req.session._token,
  });
});

router.get('/list-menu', function (req, res, next) {
  return new Promise(function (resolve, reject) {
    knex
      .select()
      .from('tbl_menu')
      .then((response) => {
        resolve(
          res.json({
            data: response,
          })
        );
      })
      .catch((error) => reject(error));
  });
});

router.get('/get-quota', function (req, res, next) {
  const email = req.session.email;
  return new Promise(function (resolve, reject) {
    knex
      .transaction(function (trx) {
        knex('tbl_users')
          .where({
            email: email,
          })
          .select('quota')
          .then()
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then((response) => {
        resolve(
          res.json({
            data: response,
          })
        );
      })
      .catch((error) => reject(error));
  });
});

router.get('/get-devices', function (req, res, next) {
  const email = req.session.email;
  return new Promise(function (resolve, reject) {
    knex
      .transaction(function (trx) {
        knex('tbl_users')
          .where({
            email: email,
          })
          .select('devices')
          .then()
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then((response) => {
        resolve(
          res.json({
            data: response,
          })
        );
      })
      .catch((error) => reject(error));
  });
});

router.get('/get-use-devices', function (req, res, next) {
  const email = req.session.email;
  const files = getAccountData();
  const index = files.find((a) => a.userid == email);
  res.json({
    devices: index ? index.length : 0,
  });
});

router.get('/count-message-outbox', function (req, res, next) {
  const email = req.session.email;
  return new Promise(function (resolve, reject) {
    knex
      .transaction(function (trx) {
        knex('tbl_message')
          .where({
            userid: email,
          })
          .select('*')
          .then()
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then((response) => {
        // console.log(response.length);
        resolve(
          res.json({
            outbox: response.length,
          })
        );
      })
      .catch((error) => reject(error));
  });
});

module.exports = router;
