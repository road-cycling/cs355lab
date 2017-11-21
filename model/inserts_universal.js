var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.insert = (item, data) => {
  console.log('called');
  return new Promise((resolve, reject) => {
    let myquery = `insert into ${item} set ?`;
    console.log(`myquery: ${myquery}`);
    console.log(`this is my data ${data}`);
    connection.query(myquery, data, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}
