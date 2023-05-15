'use client'

import { useState, useEffect } from 'react';

export default function TasksList() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    async function fetchAllTasks() {
      const res = await fetch('http://localhost:8080/tasks/getAllTasks');
      const data = await res.json();
      setAllTasks(data);
    }
    fetchAllTasks();
  }, []);

  return (
    <div>
      <h3>Tasks List</h3>
      {allTasks.map((task, index) => (
        <div key={index}>
          <h1>Task - {index + 1}</h1>
          <h1>{task.title}</h1>
          <h1>{task.updatedAt.split("T")[0] + " " + task.updatedAt.split("T")[1].split(".")[0]}</h1>
          <h1>Status - {task.status.toString()}</h1>
        </div>
      ))}
    </div>
  );
}
