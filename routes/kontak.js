var express = require('express');
var router = express.Router();
var Auth_mdw = require('../middlewares/auth');
var knex = require('../database');
const { Validator } = require('node-input-validator');
var uuid = require('uuid');
const { getAccountData, saveAccountData } = require('../helpers/formatter');

router.get('/', Auth_mdw.check_login, function (req, res, next) {
  return res.render('frontend/kontak', {
    email: req.session.email,
  });
});

router.get('/listKontak', function (req, res, next) {
  var data = getAccountData();
  res.json({
    data: data,
  });

  // return new Promise(function (resolve, reject) {
  //   knex
  //     .select()
  //     .from('tbl_contacts')
  //     .then((response) => {
  //       resolve(
  //       );
  //     })
  //     .catch((error) => reject(error));
  // });
});

router.post('/create', function (req, res, next) {
  const v = new Validator(req.body, {
    hp: 'required',
    name: 'required',
  });
  v.check().then((matched) => {
    if (!matched) {
      res.json({ errors: [v.errors] });
    } else {
      let Datapost = [
        {
          hp: req.body.hp,
          name: req.body.name,
        },
      ];

      var data = getAccountData();

      data.push({
        id: uuid['v4'](),
        hp: req.body.hp,
        name: req.body.name,
        userid: req.session.email,
      }),
        saveAccountData(data);

      knex
        .transaction(function (trx) {
          knex('tbl_contacts')
            .transacting(trx)
            .insert(Datapost)
            .then()
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (resp) {
          res.status(200).json({
            status: true,
            message: resp,
          });
        })
        .catch(function (err) {
          res.status(500).json({
            status: 500,
            message: err,
          });
        });
    }
  });
});

router.delete('/delete/:id', function (req, res, next) {
  // console.log(req.params.id);
  const id = req.params.id;
  const files = getAccountData();
  const index = files.findIndex((a) => a.id == id);
  const number = files.find((a) => a.id == id);

  if (index > -1) {
    files.splice(index, 1);
  }
  saveAccountData(files);

  knex
    .transaction(function (trx) {
      knex('tbl_contacts')
        .where({
          hp: number.hp,
        })
        .del()
        .then()
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(function (data) {
      res.json({ success: true, message: data });
    })
    .catch(function (err) {
      console.error(err);
    });
});

router.get('/edit/:id', function (req, res, next) {
  console.log(req.params.id);
  knex
    .transaction(function (trx) {
      knex('tbl_contacts')
        .where({
          id: req.params.id,
        })
        .select('*')
        .then()
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(function (data) {
      res.status(200).json({
        status: 200,
        data: data,
      });
    });
});

router.post('/update', function (req, res, next) {
  const v = new Validator(req.body, {
    link: 'required',
    name: 'required',
    icons: 'required',
    status: 'required',
    show: 'required',
    urutan: 'required',
  });
  console.log(req.body);

  v.check().then((matched) => {
    if (!matched) {
      res.json({ warning: [v.errors] });
    } else {
      let id = req.body.id;
      console.log(id);
      knex
        .transaction(function (trx) {
          knex('tbl_contacts')
            .transacting(trx)
            .update({
              link: req.body.link,
              name: req.body.name,
              icons: req.body.icons,
              status: req.body.status,
              show: req.body.show,
              urutan: req.body.urutan,
            })
            .where('id', id)
            .then()
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (resp) {
          res.status(200).json({
            status: true,
            message: resp,
          });
        })
        .catch(function (err) {
          res.json(err);
        });
    }
  });
});
module.exports = router;
