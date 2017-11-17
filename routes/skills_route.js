var express = require('express');
var router = express.Router();
var inserts = require('../model/inserts_universal');
var skills = require('../model/skill_dal');

router.get('/all', (req, res) => {
  skills.getAll()
  .then(skills => res.render('skills', {skills}))
  .catch(err => res.send(err));
});

module.exports = router;
