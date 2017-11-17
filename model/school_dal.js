var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from school;`;
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  })
}

exports.edit = ({school_name, address_id}) => {
  return new Promise((resolve, reject) => {
    let myquery = `update school set school_name=${connection.escape(school_name)} where addres_id=${connection.escape(address_id)}`;
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  })
}

exports.delete = (school_name) => {
  return new Promise((resolve, reject) => {
    let myquery = `delete school where school_name=${connection.escape(school_name)}`;
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  })
}
