var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);


exports.getAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = 'select * from account;';
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.join = () => {
  return new Promise((resolve, reject) => {
    let myquery = 'select * from account left join account_company on account.account_id = account_company.account_id;';
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    let myquery = `delete from account where account_id = ${connection.escape(id)}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}

exports.edit = (object) => {
  return new Promise((resolve, reject) => {
    let { email, account_id } = object;
    let myquery = `update account set email=${connection.escape(email)} where account_id=${connection.escape(account_id)}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}
