var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');

router.get('/add/selectuser', (req, res) => {
  resume_dal.getAll()
  .then(result => res.render('resume', {result}))
  .catch(error => res.send(err));
});

router.get('/resume/change/:id', (req, res) => {
  let id = req.params.id;

});

module.exports = router;
