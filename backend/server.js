import express from  'express';
import mysql from 'mysql';

const app = express()
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

app.get('/posts', function (req, res) {
  // 패턴
  // 1. SQL 문 작성하기 - 파라미터 있는 경우 ? 
  // 2. db.query 메서드로 sql 문 실행하기
  // 3. 실행결과를 콜백함수로 받기
  // 4. 결과를 담고 있는 객체 확인하기 (서버에서 확인 및 로직 처리)
  // 5. 결과가 있는 경우 클라이언트에게 (요청사항에 대한 내용) 응답해주기
  // mysql  로 데이터 가져와서 보여주기
  let sql = `select * from posts`;
  connection.query(sql, function (error, results) {
    if (error) {
      throw error;
    } 
    console.log(results);
    if (results[0] || results.length > 0) {
      res.status(200);
      res.set('Content-Type', 'application/json');
      let res={};
      let jsonRes =[];
      for (const result of results) {
        let {id, title, views} = result;
        //res = {{{}}}
        //res.send(`${id} : ${title} (${views} 명이 조회함)`);
        jsonRes.push(res);
        console.log(title, views);
      }
      res.json(jsonRes);
    } else {
      res.send("데이터가 없습니다.");
    }
  });
  res.send('posts data')
})

app.get('/posts/:id', function (req, res) {
  let { id } = req.params;
  // mysql  로 데이터 가져와서 보여주기
  let sql = `select * from posts where id = ?`;
  connection.query(sql,[id],function (error, results) {
    if (error) {
     // res.send('자료가 없습니다.');
      throw error;
    } 
    console.log(results);
    if (results[0] || results.length > 0) {
      let {title, views} = results[0];
      res.send(`${id} : ${title} (${views} 명이 조회함)`);
    } else {
      res.send("데이터가 없습니다.");
    }
  });
})

app.get('/qs', function (req, res) {
  console.log(req.query);
  let { id , pwd } = req.query;
  res.send(`query string id=${id}, pwd=${pwd}`);
})

app.post("/posts", (req, res) => {
  console.log("post 요청이 들어왔습니다.");
  console.log(req.body);
  let {id, title, views } = req.body;
  // mysql 로 posts 테이블에 저장한다.
  let sql = `insert into posts(title, views) values ('${title}', ${views})`;
  connection.query(sql, function (error, results) {
    if (error) throw error;
    // console.log(results)
    // console.log(results.affectedRows);
    // console.log(results.insertId);
    if(results.affectedRows == 1) {
      res.send(results.insertId + " 번 post가 저장되었습니다.");
    }
  });
  
});

app.put('/posts/:id', (req, res) => {
  console.log(req.body);
  let {id} = req.params;
  let {title, views} = req.body;
  // 비즈니스 로직 적용 - views 만 업데이트 대상
  let sql = 'update posts set views = ? where id = ? ';
  connection.query(sql, [views, id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows);
    if(results.affectedRows == 1) {
      console.log("수정이 완료되었습니다.");
    }
  });
});

app.delete('/posts/:id', (req, res)=>{
  let {id} = req.params;
  let sql = "delete from posts where id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows);
    if(results.affectedRows == 1)  {
      console.log("삭제 처리 되었습니다.");
    }
  });
});


app.listen(3003, () =>
  console.log("http://localhost:3003 server is ready...")
)