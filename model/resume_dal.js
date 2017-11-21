var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = 'select * from resume';
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.schoolName = (id) => {
  return new Promise((resolve, reject) => {
    let myquery = `select school_name from account_school left join school on school.school_id = account_school.school_id where account_id=${connection.escape(id)};`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.companyName = (id) => {
  return new Promise((resolve, reject) => {
    let myquery = `select company_name from account_company left join company_address on company_address.company_id = account_company.company_id left join company on company.company_id = company_address.company_id where account_id=${connection.escape(id)};`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.skillName = (id) => {
  return new Promise((resolve, reject) => {
    let myquery = `select skill_name from account_skill left join skill on skill.skill_id = account_skill.skill_id where account_id=${connection.escape(id)};`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}
