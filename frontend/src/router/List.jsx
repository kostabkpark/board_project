import  { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../components/Item';
import "./List.css";

const List = () => {
  // useState 
  let [list, setList] = useState([]);
  // 상태변환 함수 실행
  useEffect(()=>{
    axios.get("http://localhost:3003/board/list").then((json) => {
      console.log("json.data" , json.data);
      setList(json.data);
    })
  }
  ,[]);
  return (
    <>
      <h2>List.jsx</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
            {list.map((board, index) => {
              return <Item board={board} />
            })} 
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </>
  )
}

export default List;