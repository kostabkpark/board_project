import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '1111',
  database : 'board'
});
 
connection.connect();
 
connection.query('SELECT * from posts', function (error, results) {
  if (error) throw error;
  for (const result of results) {
    console.log('The result is: ', result.id,result.title, result.views);
  }
});
 
connection.end();