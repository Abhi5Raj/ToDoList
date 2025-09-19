import './App.css';
import { useState } from 'react';
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

function App() {
  let [todolist , settodolist]=useState([])
  let [toname, setToname] = useState("");


  let saveToDoList = (event) => {
  event.preventDefault(); 

  if (toname.trim() === "") {
    toast.error("⚠️ Task cannot be empty!");
    return;
  }

  if (!todolist.includes(toname)) {
    let finalDolist = [...todolist, toname];
    settodolist(finalDolist);
    toast.success("✅ New task added!");
    setToname(""); // <-- clears input box
  } else {
    toast.error("⚠️ ToDo Name Already Exists");
  }
};
  let list=todolist.map((value,index)=>{
    return(
      <ToDoListItems value={value} key={index} 
      indexNumber={index} 
      todolist={todolist} 
      settodolist={settodolist} />
    )
  })

  return (
    <div  className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
     <div className="bg-white shadow-xl rounded-2xl p-8 w-[500px]">
    <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
      ToDo List 📝
    </h1>
    <form onSubmit={saveToDoList} className="flex gap-3 mb-6">
      <input className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" type='text' name='toname' value={toname} onChange={(e) => setToname(e.target.value)}/> 
      <button type='submit' className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition">Submit</button>
    </form>

   

    <div className="container mx-auto px-4">
  {todolist.length === 0 ? (
    <p className="text-xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent italic text-center mt-6">
      ✨ No tasks yet, add one!
    </p>
  ) : (
    <ul className=' list-none p-0 mt-6 divide-y divide-gray-200'>{list}</ul>
  )}
</div>

    </div>
   <ToastContainer position="top-center" autoClose={2000} />
      
    </div>
    
  );
}

export default App;

function ToDoListItems({ value, indexNumber, todolist, settodolist }) {
  let [status, setStatus] = useState(false);

  let deleteRow = (e) => {
    e.stopPropagation(); 
    let finalData = todolist.filter((v, i) => i !== indexNumber);
    settodolist(finalData);
    toast.error("🗑️ Task removed successfully");
  };

  let checkStatus = () => {
    setStatus(!status);
    if (!status) {
    toast.success("🎉 Congrats on completing the task!");
  } else {
    toast.info("Task marked as pending again");
  }
  };

  return (
    <motion.li
      
      initial={{ opacity: 0, y: 10 }}   // fade-in + slide-up animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={checkStatus}
      className={`p-3 mb-3 text-left text-lg rounded relative cursor-pointer transition
        ${
          status
            ? "line-through text-purple-600 bg-amber-100 italic"
            : "bg-black text-white hover:bg-gray-800"
        }`}
    >
      {indexNumber + 1}. {value}
      <span onClick={deleteRow} className="absolute right-4 top-2 text-xl">
        🗑️
      </span>
    </motion.li>
    
  );
  
}

