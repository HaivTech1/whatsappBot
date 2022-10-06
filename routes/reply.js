var express = require('express');
var router = express.Router();
var Auth_mdw = require('../middlewares/auth');
const fs = require('fs');
const { Validator } = require('node-input-validator');
var uuid = require('uuid');

const SESSIONS_FILE = './reply.json';
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
  return res.render('frontend/reply', {
    email: req.session.email,
  });
});

router.get('/listReply', function (req, res, next) {
  var data = getAccountData();
  res.json({
    data: data,
  });
});

router.delete('/delete/:id', function (req, res, next) {
  const id = req.params.id;
  const files = getAccountData();
  const index = files.findIndex((a) => a.id == id);

  if (index > -1) {
    files.splice(index, 1);
  }
  saveAccountData(files);
  const newData = getAccountData();
  res.status(200).json({
    data: newData,
  });
});

router.post('/create', function (req, res, next) {
  const v = new Validator(req.body, {
    body: 'required',
    reply: 'required',
  });
  v.check().then((matched) => {
    if (!matched) {
      res.json({ errors: [v.errors] });
    } else {
      try {
        var data = getAccountData();
        data.push({
          id: uuid['v4'](),
          body: req.body.body,
          reply: req.body.reply,
          userid: req.session.email,
        });
        const newData = saveAccountData(data);
        res.status(200).json({
          data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    }
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
    body: 'required',
    reply: 'required',
  });

  v.check().then((matched) => {
    if (!matched) {
      res.json({ warning: [v.errors] });
    } else {
      let id = req.params.id;
      console.log(id);

      const files = getAccountData();
      const data = files.map((a) => {
        if (a.id == id) {
          return { ...a, body: req.body.body, reply: req.body.reply };
        }
        return a;
      });

      const newData = saveAccountData(data);
      res.status(200).json({
        data: newData,
      });
    }
  });
});

module.exports = router;
