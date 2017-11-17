var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from skill;`;
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  })
}
