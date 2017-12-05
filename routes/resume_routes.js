var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var insert_dal = require('../model/inserts_universal');

foo = false;

router.put('/edit', (req, res) => {
  resume_dal.edit(req.body.resume)
  .then(setTimeout(() => {res.redirect('/resume/add/selectuser'), 200}))
  .catch(err => res.send(err));
});

router.get('/add/selectuser', (req, res) => {
  //let foo = false;
  console.log(`foo is ${foo}`);
  resume_dal.getAll()
  .then(result => res.render('resume', {result, foo}))
  .catch(error => res.send(err));
  foo = false;
});



router.get('/change/:id', (req, res) => {
  let id = req.params.id;
  Promise.all([resume_dal.schoolName(id), resume_dal.companyName(id), resume_dal.skillName(id)])
  .then(result => {
    let [ schools, companies, skills ] = result;
    console.log(schools);
    console.log(companies);
    console.log(skills);
    res.render('resume_form', {schools, companies, skills, id});
  })
});


router.post('/change', (req, res) => {
  let { school_name, company_name, skill_name, account_id, resume_name } = req.body;
  let resumeinsert = {
    account_id,
    resume_name,
    resume_id: account_id
  }
  insert_dal.insert('resume', resumeinsert)
  .then(response => {
    let { insertID } = response;
    let resumecompany = {
      resume_id: insertID,
      company_id: company_name,
      date_shared: 'curdate()',
      was_hired: 'false'
    }

    let resumeschool = {
      school_id: school_name,
      resume_id: insertID
    }
    let resumeskill = {
      skill_id: skill_name,
      resume_id: insertID
    }
    foo = true;
    Promise.all([insert_dal.insert('resume_company', resumecompany), insert_dal.insert('resume_school', resumeschool), insert_dal.insert('resume_skill', resumeskill)])
    .then(res.redirect('/resume/add/selectuser'))
    .catch(res.redirect('/resume/add/selectuser'))
  });
});

router.get('/edit/:accid', (req, res) => {
  console.log('called1231');
  let accid = req.params.accid;
  Promise.all([resume_dal.schoolName(accid), resume_dal.companyName(accid), resume_dal.skillName(accid)])
  .then(result => {
    let [ schools, companies, skills ] = result;
    res.render('resume_edit', {schools, companies, skills, id: accid});
  })
  .catch(err => res.send(`${err} ERROR`));
})

router.post('/edit', (req, res) => {
  let { data } = req.body.data;
  Proise.all([resume_dal.updateSchool(data), resume_dal.updateResumeSkill(data), resume_dal.updateCompany(data)])
  .then(() => res.redirect('/resume/edit'))
  .catch(err => res.send(`ERR :: ${err}`));
})


module.exports = router;
