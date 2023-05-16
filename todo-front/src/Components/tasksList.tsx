'use client'

import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import CompletedTasksList from './completedTasksList';
import NotCompletedTasksList from './notCompletedTaskList';
export default function TasksList() {
  
  const [allTasks, setAllTasks] = useState([]);
  const [allCompletedTasks,setAllCompletedTasks] = useState([]);
  const router = useRouter();

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

  return (
    <div>
      <div className="mainFrame">
        <NotCompletedTasksList allTasks={allTasks}/> 
        <CompletedTasksList allCompletedTasks={allCompletedTasks}/>
      </div>
    </div>
  );
}
