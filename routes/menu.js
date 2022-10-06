var express = require('express');
var router = express.Router();
var knex = require('../database');
var Auth_mdw = require('../middlewares/auth');
const { Validator } = require('node-input-validator');

router.get('/', Auth_mdw.check_login, function (req, res, next) {
  return res.render('frontend/menu', {
    email: req.session.email,
  });
});

router.get('/data-menu', function (req, res, next) {
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

router.post('/add-menu', function (req, res, next) {
  const v = new Validator(req.body, {
    link: 'required',
    name: 'required',
    icons: 'required',
    status: 'required',
  });
  v.check().then((matched) => {
    if (!matched) {
      res.json({ errors: [v.errors] });
    } else {
      let Datapost = [
        {
          link: req.body.link,
          name: req.body.name,
          icons: req.body.icons,
          status: req.body.status,
          show: req.body.show,
          urutan: req.body.urutan,
        },
      ];
      knex
        .transaction(function (trx) {
          knex('tbl_menu')
            .transacting(trx)
            .insert(Datapost)
            .then()
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (resp) {
          console.log(resp);
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

router.get('/delete-menu/:id', function (req, res, next) {
  console.log(req.params.id);
  knex
    .transaction(function (trx) {
      knex('tbl_menu')
        .where({
          id: req.params.id,
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

router.get('/edit-menu/:id', function (req, res, next) {
  console.log(req.params.id);
  knex
    .transaction(function (trx) {
      knex('tbl_menu')
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

router.post('/update-menu', function (req, res, next) {
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
          knex('tbl_menu')
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
