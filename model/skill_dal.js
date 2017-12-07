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

exports.update = ({ skill_name, skill_id }) => {
  console.log(`${skill_name}  ${skill_id}`)
  return new Promise((resolve, reject) => {
    let myquery = `update skill set skill_name=${skill_name} where skill_id=${skill_id}`;
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  })
}
