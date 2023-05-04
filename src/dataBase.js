const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'connection',
    password: 'connectionpass',
    database: 'mydb',
  });
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error retrieving users from MySQL database: ', err);
    } else {
      console.log('Retrieved users from MySQL database: ', results);
    }
  });
  connection.end((err) => {
    if (err) {
      console.error('Error closing connection to MySQL database: ', err);
    } else {
      console.log('Closed connection to MySQL database');
    }
  });
  export function connect(){
    connection.connect();
  }