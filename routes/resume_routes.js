var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var insert_dal = require('../model/inserts_universal');
var account_dal = require('../model/account_dal');
// lots of unused routes, ejs files and functions in dal
foo = false;

router.put('/edit', (req, res) => {
  resume_dal.edit(req.body.resume)
  .then(setTimeout(() => {res.redirect('/resume/add/selectuser'), 200}))
  .catch(err => res.send(err));
});

router.get('/add/selectuser', (req, res) => {
  account_dal.getAll()
  .then(result => res.render('resume', {result, foo}))
  .catch(error => res.send(err));
  foo = false;
});

router.get('/all', (req, res) => {
  resume_dal.getAll()
  .then(resp => res.render('resume_all', {resp}))
  .catch(err => res.send(err));
})

router.get('/change/:id', (req, res) => {
  let id = req.params.id;
  console.log(id);
  //Promise.all([resume_dal.schoolName(id), resume_dal.companyName(id), resume_dal.skillName(id)])
  Promise.all([resume_dal.schoolNameAll(), resume_dal.companyNameAll(), resume_dal.skillNameAll()])
  .then(result => {
    let [ schools, companies, skills ] = result;
    console.log(schools);
    console.log(companies);
    console.log(skills);
    res.render('resume_form', {schools, companies, skills, id});
  })
  .catch(err => console.log(err));
});


router.post('/change', (req, res) => {
  let { school_name, company_name, skill_name, account_id, resume_name } = req.body;
  let resumeinsert = {
    account_id,
    resume_name
  }
  console.log('before resume insert');
  console.log(resumeinsert);
  insert_dal.insert('resume', resumeinsert)
  .then(response => {
    let { insertId } = response;
    let resumecompany = {
      resume_id: insertId,
      company_id: company_name,
      date_shared: 'curdate()',
      was_hired: 'false'
    }

    let resumeschool = {
      school_id: school_name,
      resume_id: insertId
    }
    let resumeskill = {
      skill_id: skill_name,
      resume_id: insertId
    }
    foo = true;
    Promise.all([insert_dal.insert('resume_company', resumecompany), insert_dal.insert('resume_school', resumeschool), insert_dal.insert('resume_skill', resumeskill)])
    .then(res.redirect('/resume/add/selectuser'))
    .catch(err => console.log(err));
  });
});

router.get('/edit/:accid', (req, res) => {
  let accid = req.params.accid;
  Promise.all([resume_dal.schoolName(accid), resume_dal.companyName(accid), resume_dal.skillName(accid)])
  .then(result => {
    console.log(result);
    let [ schools, companies, skills ] = result;
    res.render('resume_edit', {schools, companies, skills, id: accid});
  })
  .catch(err => res.send(`${err} ERROR`));
})

router.post('/edit', (req, res) => {
  let { data } = req.body.data;
  Promise.all([resume_dal.updateSchool(data), resume_dal.updateResumeSkill(data), resume_dal.updateCompany(data)])
  .then(() => res.redirect('/resume/edit'))
  .catch(err => res.send(`ERR :: ${err}`));
})



router.get('/edit/now/:id', (req, res) => {
  let resumeid = req.params.id;
  Promise.all([resume_dal.schoolNameAll(), resume_dal.companyNameAll(), resume_dal.skillNameAll()])
  .then(result => {
    let [ schools, companies, skills ] = result;
    res.render('anotherresume', {schools, companies, skills, resumeid});
  })
  .catch(err => console.log(err));
})



router.get('/view/now/:id', (req, res) => {
  let resumeid = req.params.id;
  Promise.all([resume_dal.newCompany(resumeid), resume_dal.newSkill(resumeid), resume_dal.newSchool(resumeid)])
  .then(response => {
    console.log(response);
    let [ company_name, skill_name, school_name ] = response;
    console.log(response);
    console.log(company_name);
    res.render('newresume', {company_name, skill_name, school_name});
  })
  .catch(err => res.send(err));
})

router.post('/edit/now/:id', (req, res) => {
  let resumeid = req.params.id;
  let { school_name, company_name, skill_name, resume_name } = req.body;
  Promise.all([resume_dal.rs(school_name, resumeid), resume_dal.rn(resume_name, resumeid), resume_dal.rskill(skill_name, resumeid), resume_dal.rc(company_name, resumeid)])
  .then(() => {
    res.redirect('/resume/all');
  }).catch(err => res.send(err));
})

router.get('/delete/now/:id', (req, res) => {
  let resumeid = req.params.id;
  resume_dal.dn(resumeid)
    .then(() => {
      res.redirect('/resume/all');
    }).catch(err => res.send(`${err} :: bitcoin!`));
})



module.exports = router;
