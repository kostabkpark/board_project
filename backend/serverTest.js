import express from  'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '1111',
  database : 'board'
});

connection.connect();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/board/list', (req, res) => {
  let sql = "select id, boardTitle, boardWriter, boardHits, createdAt from board_table";
  connection.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.status(200).json(results);
  })
})

app.post("/board/save", (req, res) => {
  console.log("게시판 저장 요청이 들어왔습니다.");
  console.log(req.body.board);
  let {boardTitle, boardWriter, boardPwd, boardContents } = req.body.board;
  // mysql 로 board_table 테이블에 저장한다.
  let sql = `insert into board_table(boardTitle, boardWriter, boardPwd, boardContents) values (?,?,?,?)`;
  connection.query(sql, [boardTitle, boardWriter, boardPwd, boardContents] , function (error, results) {
    if (error) throw error;
    // console.log(results)
    // console.log(results.affectedRows);
    // console.log(results.insertId);
    if(results.affectedRows == 1) {
      console.log(results.insertId + " 번째 게시판 글이 등록되었습니다.");
      res.send("등록완료");
      //Response.redirect('/board/list');
    }
  });
});

app.listen(3003, () =>
  console.log("http://localhost:3003 server is ready...")
)