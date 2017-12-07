var express = require('express');
var router = express.Router();
var inserts = require('../model/inserts_universal');
var skills = require('../model/skill_dal');

router.get('/all', (req, res) => {
  skills.getAll()
  .then(skills => res.render('skills', {skills}))
  .catch(err => res.send(err));
});

router.post('/insert', (req, res) => {
  inserts.insert('skill', req.body.skill)
  .then(setTimeout(() => res.redirect('/skills/all'), 1000))
  .catch(err => res.send(err));
})

router.post('/insert/item', (req, res) => {
  skills.update(req.body.skill)
  .then(setTimeout(() => res.redirect('/skills/all'), 1000))
  .catch(err => res.send(err));
})

module.exports = router;
