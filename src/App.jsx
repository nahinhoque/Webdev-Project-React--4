import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

import { SlCalender } from "react-icons/sl";
import { IoMdTimer } from "react-icons/io";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])



  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    if (window.confirm("Are you sure! you want to Edit this task?")) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS()
    }


  }


  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure! you want to delete this task?")) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS()
    }
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

    saveToLS()

  }
  const handleChange = (e) => {

    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {

    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })


    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }




  const interval = setInterval(() => {
    const now = new Date();
   
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    setDateTime(`${formattedDate} - ${formattedTime}`);
  }, 1000);


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 shadow-xl min-h-[80vh] md:w-[40%]">
        <h1 className='font-bold text-center text-2xl'>TaskMaster - Your Daily Organizer</h1>
         
         <div className="flex mt-5">
         <SlCalender className='mt-1 m-2'/>
        <h2 className='date-time font-bold'>{dateTime}</h2>
        <IoMdTimer className='w-5 h-5 mt-0.5 m-2'/>
        </div>
      
        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className='text-xl font-bold'> Add a Task<MdOutlineAddTask className='ml-28 mt-[-21px]' /></h1>

          <div className="flex">
            <input onChange={handleChange} value={todo} placeholder="New task today..." type="text" className='rounded-2xl px-5 w-full bg-white cursor-pointer' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-green-600 hover:bg-green-700 disabled:bg-indigo-600 hover:disabled:bg-indigo-700 px-4 py-2 m-3 text-lg text-white font-bold rounded-2xl cursor-pointer'>Save</button>
          </div>

        </div>


        <h1 className='text-xl font-bold'>My Tasks<FaArrowAltCircleDown className='ml-24 mt-[-20px]' /></h1>


        
        <input onChange={toggleFinished} type="checkbox" className='ml-1 mt-4 cursor-pointer' checked={showFinished} /> <span className='font-bold text-lg'>Show Finished</span>

        <div className="todos mx-5 my2">
          {todos.length === 0 && <div className='m-8'>No task added!</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-5 justify-between ">
              <div className='flex gap-4'>
                <input className='mt-[-1px] cursor-pointer' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="buttons mt-[-5px] flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-indigo-600 hover:bg-indigo-700 p-2 py-1 text-lg text-white font-bold rounded-md mx-1 cursor-pointer'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-600 hover:bg-red-700 p-2 py-1 text-lg text-white font-bold rounded-md mx-1 cursor-pointer'><MdDelete /></button>
              </div>

            </div>
          })}

        </div>


      </div>

    </>
  )
}

export default App
