import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [todolist , settodolist]=useState([])

  let saveToDoList=(event)=>{ 
    let toname=event.target.toname.value; //stores the value of the input
    if(!todolist.includes(toname)){
      let finalDolist=[...todolist,toname]
      settodolist(finalDolist)

    }
    else{
      alert("ToDo Name Already Exists")
    }
    
    event.preventDefault();
  }
  let list=todolist.map((value,index)=>{
    return(
      <ToDoListItems value={value} key={index} 
      indexNumber={index} 
      todolist={todolist} 
      settodolist={settodolist} />
    )
  })

  return (
    <div className='App'>

    <h1>ToDo List</h1>
    <form onSubmit={saveToDoList}>
      <input className='flex-1 px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500' type='text' name='toname'/> 
      <button className='px-4 py-2 bg-blue-500 text-white rounded'>Submit</button>
    </form>

    <div className='outerDiv'>

    <ul>
      {list}
    </ul>
    </div>
   </div>
    
  );
}

export default App;

function ToDoListItems({value,indexNumber,todolist,settodolist}){
  let [status,setStatus]=useState(false);
  let deleteRow=()=>{
    let finalData=todolist.filter((v,i)=>i!=indexNumber)
    settodolist(finalData)
  }
  let checkStatus=()=>{
    setStatus(!status)

  }
  return(
    <li  onClick={checkStatus}
      className={`p-3 mb-3 text-left text-lg rounded relative cursor-pointer transition
        ${status 
          ? "line-through text-purple-600 bg-amber-100 italic" 
          : "bg-black text-white hover:bg-gray-800"
        }`}>{indexNumber+1 }{value} <span onClick={deleteRow}>&times;</span></li>
  )
}
