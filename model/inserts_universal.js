var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.insert = (item, data) => {
  return new Promise((resolve, reject) => {
    let myquery = `insert into ${item} set ?`;
    connection.query(myquery, data, (err, result) => {
      console.log(`${err} ${result}`);
      err ? reject(err) : resolve(result);
    });
  })
}
