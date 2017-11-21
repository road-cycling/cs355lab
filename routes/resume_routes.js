var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var insert_dal = require('../model/inserts_universal');

router.get('/add/selectuser', (req, res) => {
  resume_dal.getAll()
  .then(result => res.render('resume', {result}))
  .catch(error => res.send(err));
});

router.get('/change/:id', (req, res) => {
  let id = req.params.id;
  Promise.all([resume_dal.schoolName(id), resume_dal.companyName(id), resume_dal.skillName(id)])
  .then(result => {
    let [ schools, companies, skills ] = result;
    res.render('resume_form', {schools, companies, skills, id});
  })
});

router.post('/change', (req, res) => {
  console.log('made request');
  console.log(req.body);
  let reqbody = req.body;
  var resumeinsert = { //there must be a better way
    account_id: reqbody.account_id,
    resume_name: reqbody.resume_name
  }
  insert_dal.insert('resume', resumeinsert)
  .then(resp => console.log(resp))
  .catch(err => console.log(err));

  res.redirect('/resume/add/selectuser');
});
//item , data


module.exports = router;


/*
es6 is fantastic
schools.map(item => console.log(item));
companies.map(item => console.log(item));
skills.map(item => console.log(item));

called
RowDataPacket { school_name: 'MIT' }
RowDataPacket { company_name: 'Google' }
RowDataPacket { skill_name: 'English' }


*/
