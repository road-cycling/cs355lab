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
