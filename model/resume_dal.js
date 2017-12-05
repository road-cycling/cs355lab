var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.edit = ({account_id, name}) => {
  return new Promise((resolve, reject) => {
    let myquery = `update resume set name=${connection.escape(name)} where account_id=${connection.escape(account_id)}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = 'select * from resume';
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.schoolName = id => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from account_school left join school on school.school_id = account_school.school_id where account_id=${connection.escape(id)};`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.companyName = id => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from account_company left join company_address on company_address.company_id = account_company.company_id left join company on company.company_id = company_address.company_id where account_id=${connection.escape(id)};`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.skillName = id => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from account_skill left join skill on skill.skill_id = account_skill.skill_id where account_id=${connection.escape(id)};`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.updateSchoolResume = id => {
  return new Promise((resolve, reject) => {
    let myquery = `update`;
    resolve();
  });
}

exports.getCompanyID = name => {
  return new Promise((resolve, reject) => {
    let myquery = `select company_id from company where company_name=${connection.escape(name)}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}

exports.getSchoolName = name => {
  return new Promise((resolve, reject) => {
    let myquery = `select school_id from school where school_name=${name}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}

exports.updateSchool = ({school_name, account_id}) => {
  return new Promise((resolve, reject) => {
    let myquery = `update resume_school set school_id=${connection.escape(school_name)} where resume_id=${connection.escape(account_id)}`;
      connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
      });
  })
}

exports.updateResumeSkill = ({skill_name, account_id}) => {
  return new Promise((resolve, reject) => {
    let myquery = `update resume_skill set skill_id = ${skill_name} where resume_id=${account_id}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}

exports.updateCompany = ({company_name, account_id}) => {
  return new Promise((resolve, reject) => {
    let myquery = `update resume_company set company_id = ${company_name} where resume_id=${account_id}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}
