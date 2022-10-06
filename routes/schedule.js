var express = require('express');
var router = express.Router();
var Auth_mdw = require('../middlewares/auth');
var knex = require('../database');
const fs = require('fs');
var uuid = require('uuid');
var randomstring = require('randomstring');
const { Validator } = require('node-input-validator');

const SESSIONS_FILE = './schedule.json';

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
  return res.render('frontend/schedule', {
    email: req.session.email,
  });
});

router.get('/listSchedule', function (req, res, next) {
  var data = getAccountData();
  const scheduled = data.filter((a) => a.userid === req.session.email);
  res.json({
    data: scheduled,
  });
});

router.post('/create', function (req, res, next) {
  const v = new Validator(req.body, {
    sender: 'required',
    date: 'required',
    time: 'required',
    message: 'required',
  });
  v.check().then((matched) => {
    if (!matched) {
      res.json({ errors: [v.errors] });
    } else {
      try {
        var data = getAccountData();
        data.push({
          id: uuid['v4'](),
          date: req.body.date + ' ' + req.body.time,
          sender: req.body.sender,
          message: req.body.message,
          userid: req.session.email,
          status: 'Pending',
        });
        saveAccountData(data);
        res.status(200).json({
          data: data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.delete('/delete/:id', function (req, res, next) {
  const id = req.params.id;
  const files = getAccountData();
  const index = files.findIndex((a) => a.id == id);
  // const number = files.find((a) => a.id == id);

  if (index > -1) {
    files.splice(index, 1);
  }
  saveAccountData(files);
  const newData = getAccountData();
  res.status(200).json({
    data: newData,
  });
});

router.get('/edit/:id', function (req, res, next) {
  console.log(req.params.id);
  const id = req.params.id;
  const files = getAccountData();
  const data = files.find((a) => a.id == id);
  res.status(200).json({
    data: data,
  });
});

router.post('/update/:id', function (req, res, next) {
  const v = new Validator(req.body, {
    sender: 'required',
    date: 'required',
    time: 'required',
    message: 'required',
  });

  v.check().then((matched) => {
    if (!matched) {
      res.json({ warning: [v.errors] });
    } else {
      let id = req.params.id;
      console.log(id);
    }
  });
});

module.exports = router;
