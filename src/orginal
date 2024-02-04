import { useState , useEffect } from 'react'

//Concepts Learnd and used : useState , useEffect , map and splice , Form



function App() {
  const [TasksArray,setTasksArray] = useState(() => {
    
    const storedTasks = localStorage.getItem('TasksArray');
    return storedTasks ? JSON.parse(storedTasks) : [];
  })
  const [Task,setTask] = useState('')

  useEffect(() => {
    
    localStorage.setItem('TasksArray', JSON.stringify(TasksArray));
  }, [TasksArray]);
  
  function Submitted(e){
    e.preventDefault();
    setTasksArray(prevTasksArray => [...TasksArray,Task]);
    setTask("");
  }

  function handleDelete(index) {
    setTasksArray(prevTasksArray => {
      const updatedTasks = [...prevTasksArray];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  }
  
  
  return (
    <>
     <h1>Task Master</h1> 
     <p>Do a task, Feel good!!</p>
      
      <form onSubmit={Submitted}>
        <label htmlFor='input'>Enter Task: </label>
        <input id='input'
        type='text'
        placeholder='Task Name'
        value={Task}
        onChange={e=>setTask(e.target.value)}
        
        
        />
       
        <button type='submit' disabled={!Task}>Add Task</button>
      </form>
      
        {TasksArray.map((t,index)=><li key={index}>{t}<button onClick={() => handleDelete(index)}>Delete</button></li>)}
       
    </>
  )
}

export default App
