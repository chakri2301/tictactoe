import { useState } from 'react'
import './App.css'

function App() {
  const [values, setValues] = useState(new Array(9).fill(0));

  return (<div id="board">{
    values.map((ele)=>{
      return <Square count={ele.toString()}/>
    })}</div>)
}
function Square({count}:{count:String}){
  return<button>{count}</button>
}

export default App
