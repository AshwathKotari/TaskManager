// App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [tasksArray, setTasksArray] = useState(() => {
    const storedTasks = localStorage.getItem('TasksArray');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [task, setTask] = useState('');
  const [timers, setTimers] = useState(() => {
    const storedTimers = localStorage.getItem('Timers');
    return storedTimers ? JSON.parse(storedTimers) : Array(tasksArray.length).fill(0);
  });

  const [timerIntervals, setTimerIntervals] = useState({});
  const [taskCompleted, setTaskCompleted] = useState(Array(tasksArray.length).fill(false));

  useEffect(() => {
    localStorage.setItem('TasksArray', JSON.stringify(tasksArray));
    localStorage.setItem('Timers', JSON.stringify(timers));
  }, [tasksArray, timers]);

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

    setTimerIntervals((prevIntervals) => ({
      ...prevIntervals,
      [index]: interval,
    }));
  };

  const stopTimer = (index) => {
    clearInterval(timerIntervals[index]);
    const newIntervals = { ...timerIntervals };
    delete newIntervals[index];
    setTimerIntervals(newIntervals);
  };

  const handleDelete = (index) => {
    clearInterval(timerIntervals[index]);

    setTasksArray((prevTasksArray) => {
      const updatedTasks = [...prevTasksArray];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });

    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers.splice(index, 1);
      return updatedTimers;
    });

    setTaskCompleted((prevCompleted) => {
      const updatedCompleted = [...prevCompleted];
      updatedCompleted.splice(index, 1);
      return updatedCompleted;
    });

    setTimerIntervals((prevIntervals) => {
      const newIntervals = { ...prevIntervals };
      delete newIntervals[index];
      return newIntervals;
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
    <div className="container">
      <h1 className="title">Task Master</h1>
      <p className="subtitle">Do a task, Feel good!!</p>

      <form onSubmit={addTask}>
        <label htmlFor="input" className="form-label">Enter Task: </label>
        <input
          id="input"
          type="text"
          placeholder="Task Name"
          value={task}
          onChange={handleTaskChange}
          className="form-input"
        />
        <button type="submit" disabled={!task} className="form-button">
          Add Task
        </button>
      </form>

      <ul className="task-list">
        {tasksArray.map((task, index) => (
          <li key={index} className="task-item">
            <input
              type="checkbox"
              checked={taskCompleted[index]}
              onChange={() => handleCheckboxChange(index)}
              className="task-checkbox"
            />
            <span style={{ textDecoration: taskCompleted[index] ? 'line-through' : 'none' }} className="task-text">
              <h4>{task}</h4>
            </span>
            <button onClick={() => startTimer(index)} disabled={timerIntervals[index]} className="timer-button">
              Start
            </button>
            <button onClick={() => stopTimer(index)} disabled={!timerIntervals[index]} className="timer-button">
              Stop
            </button>
            <span className="timer">{formatTime(timers[index])}</span>
            <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
