var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = 'SELECT * FROM address;';
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  })
}

exports.edit = ({street, address_id}) => {
  return new Promise((resolve, reject) => {

    let myquery = `update address set street=${connection.escape(street)} where address_id=${connection.escape(address_id)}`;
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  })
}

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    let myquery = `delete address where address_id=${connection.escape(id)}`;
    connection.query(myquery, (err, result) => {
        err ? reject(err) : resolve(result);
    });
  });
}
