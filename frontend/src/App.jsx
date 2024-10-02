import { useState } from 'react'
import { Link , Route, Routes , BrowserRouter }from 'react-router-dom';
import './App.css'
import Home from './router/Home'
import Save from './router/Save'
import List from './router/List'

function App() {
   return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/save" element={<Save />}></Route>
        <Route path="/list" element={<List />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

// import { useNavigate } from "react-router-dom";
// const Login = () => {
// const navigate = useNavigate();
// return(
//     <div className="login">	
//   <input placeholder="전화번호, 사용자 이름 또는 이메일"/>
//       <input placeholder="비밀번호/>
//       <button onClick={() => {navigate("/main");}}>로그인</button>                   
//     </div>
// )
// }
