'use client'

import { useState, useEffect } from 'react';
import CompletedTasksList from './completedTasksList';
import NotCompletedTasksList from './notCompletedTaskList';
export default function TasksList() {
  
  const [allTasks, setAllTasks] = useState([]);
  const [allCompletedTasks,setAllCompletedTasks] = useState([]);

  useEffect(() => {
    async function fetchAllTasks() {
      const res = await fetch('http://localhost:8080/tasks/getAllTasks');
      const data = await res.json();
      setAllTasks(data);
    }
    async function fetchAllCompletedTasks(){
      const res = await fetch('http://localhost:8080/tasks/getAllCompletedTasks');
      const data = await res.json();
      setAllCompletedTasks(data);
    }
    fetchAllTasks();
    fetchAllCompletedTasks();
  }, [allTasks,allCompletedTasks]);


  function getFormattedDate(date:string){
    let str = "";
    const arr = date.split("T")
    const time = arr[1].split(".")[0]
    return str + arr[0]  + " (" + time +")"
  }

  return (
    <div>
      <div className="mainFrame">
        <NotCompletedTasksList allTasks={allTasks} getFormattedDate={getFormattedDate}/> 
        <CompletedTasksList allCompletedTasks={allCompletedTasks} getFormattedDate={getFormattedDate}/>
      </div>
    </div>
  );
}
