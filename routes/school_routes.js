var express = require('express');
var router = express.Router();
var inserts = require('../model/inserts_universal');
var school_dal = require('../model/school_dal');

router.get('/all', (req, res) => {
  school_dal.getAll()
  .then(school => res.render('schoolall', {school}))
  .catch(err => res.send(err));
});

router.post('/insert', (req, res) => {
  console.log(req.body.school);
  inserts.insert('school', req.body.school)
  .then(setTimeout(() => {res.redirect('/school/all')}, 200))
  .catch(err => res.send(err));
});

router.get('/delete/:name', (req, res) => {
  let name = req.params.name;
  school_dal.delete(name)
  .then(setTimeout(() => {res.redirect('/school/all')}, 200))
  .catch(err => res.send(err));
});

router.post('/edit', (req, res) => {
  school_dal.edit(req.body.school)
  .then(setTimeout(() => {res.redirect('/school/all')}, 200))
  .catch(err => res.send(err));
});

module.exports = router;
