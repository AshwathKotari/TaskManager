import React, { useState, useEffect } from 'react';


function App() {
  const [tasksArray, setTasksArray] = useState(() => {
    const storedTasks = localStorage.getItem('TasksArray');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [task, setTask] = useState('');
  const [timers, setTimers] = useState(Array(tasksArray.length).fill(0));
  const [timerIntervals, setTimerIntervals] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState(Array(tasksArray.length).fill(false));

  useEffect(() => {
    localStorage.setItem('TasksArray', JSON.stringify(tasksArray));
  }, [tasksArray]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    setTasksArray((prevTasksArray) => [...prevTasksArray, task]);
    setTask('');
    setTimers((prevTimers) => [...prevTimers, 0]);
    setTaskCompleted((prevCompleted) => [...prevCompleted, false]);
  };

  const startTimer = (index) => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];
        newTimers[index]++;
        return newTimers;
      });
    }, 1000);
    setTimerIntervals((prevIntervals) => [...prevIntervals, interval]);
  };

  const stopTimer = (index) => {
    clearInterval(timerIntervals[index]);
    const newIntervals = [...timerIntervals];
    newIntervals.splice(index, 1);
    setTimerIntervals(newIntervals);
  };

  const handleDelete = (index) => {
    clearInterval(timerIntervals[index]);
    const newTimers = [...timers];
    newTimers.splice(index, 1);
    setTimers(newTimers);

    const newIntervals = [...timerIntervals];
    newIntervals.splice(index, 1);
    setTimerIntervals(newIntervals);

    setTasksArray((prevTasksArray) => {
      const updatedTasks = [...prevTasksArray];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });

    setTaskCompleted((prevCompleted) => {
      const updatedCompleted = [...prevCompleted];
      updatedCompleted.splice(index, 1);
      return updatedCompleted;
    });
  };

  const handleCheckboxChange = (index) => {
    setTaskCompleted((prevCompleted) => {
      const updatedCompleted = [...prevCompleted];
      updatedCompleted[index] = !updatedCompleted[index];
      return updatedCompleted;
    });
    if (timerIntervals[index]) {
      stopTimer(index);
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <h1>Task Master</h1>
      <p>Do a task, Feel good!!</p>

      <form onSubmit={addTask}>
        <label htmlFor="input">Enter Task: </label>
        <input
          id="input"
          type="text"
          placeholder="Task Name"
          value={task}
          onChange={handleTaskChange}
        />
        <button type="submit" disabled={!task}>
          Add Task
        </button>
      </form>

      <ul>
        {tasksArray.map((t, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={taskCompleted[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <span style={{ textDecoration: taskCompleted[index] ? 'line-through' : 'none' }}>
              {t}
            </span>{' '}
            <button onClick={() => startTimer(index)} disabled={timerIntervals[index]}>
              Start
            </button>{' '}
            <button onClick={() => stopTimer(index)} disabled={!timerIntervals[index]}>
              Stop
            </button>{' '}
            {formatTime(timers[index])}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
