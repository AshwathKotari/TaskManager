import { useState,useEffect } from 'react'



function App() {
  const [Task,setTask] = useState("")
  function Submitted(e){
    e.preventDefault()
    

    setTask("")
  }
  const [List,setList] = useState([])
  const Fruits = ["a","b","c","d"]
  return (
    <>
      Task Manager:
      <form onSubmit={Submitted}>
        <label htmlFor='input'>Enter Task: </label>
        <input id='input'
        type='text'
        placeholder='Task Name'
        value={Task}
        onChange={e=>setTask(e.target.value)}
        
        
        >
        </input>
        <button type='submit' disabled={!Task}>Add Task</button>
      </form>
      
        {Fruits.map((f)=>(<li>{f}</li>))}
        
    </>
  )
}

export default App
