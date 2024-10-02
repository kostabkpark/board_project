import { useState } from "react";

const Save = () => {
  let [board, setBoard] = useState({
    boardTitle : "",
    boardWriter : "",
    boardPwd : "",
    boardContents : ""
  }); 
  const inputUpdate = (e) => {
    const {name, value} = e.target;
    setBoard({
      ...board,
      [name] : value
    });
  }
  const boardSave = (e) => {
    e.preventDefault();
    console.log(board);
  }
  return (
    <>
      <h2>Save.jsx</h2>
      <form action="#" method="post">
        제목 : <input type="text" name="boardTitle" value={board.boardTitle || ""} onChange={inputUpdate}/> <br />
        작성자 : <input type="text" name="boardWriter" value={board.boardWriter || ""} onChange={inputUpdate}/> <br />
        비밀번호 : <input type="password" name="boardPwd" value={board.boardPwd || ""} onChange={inputUpdate}/> <br />
        내용 : <textarea name="boardContents" onChange={inputUpdate} rows = "5" cols = "30" values={board.boardContents || ""}></textarea> <br />
        <input type="submit" value="Save" onClick={boardSave} />
      </form>
    </>
  )
}

export default Save;