import { useState } from 'react';
import './App.css'

function App() {
  const [values, setValues] = useState(new Array(9).fill(0));
  function handleClick(idx:number){
    let newValues = new Array(9).fill(0);
    values.forEach(
      (e, idx)=>{
        newValues[idx] = e;
      }
    )
    newValues[idx] = 2
    setValues(newValues);
  }
  return (
  <div id="app">
  <div id="board">{
    values.map((ele, index)=>{
      return <Square idx={index} key={index} count={ele} onClick={handleClick}/>
    })}
    </div>
  </div>
  )
}
function Square({idx,count,onClick}:{idx:number,count:number,onClick:(idx:number)=>void}){
  return<div className="wrapper"><span className={"tile"+ " " + "tile" + count}  onClick={()=>{onClick(idx);}}>{
    (count==0)?" ":(count==1)?"X":"O"
  }</span></div>
}

export default App
