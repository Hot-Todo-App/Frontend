'use client'

import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
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

  const handleClick = (taskId:string)=>{
    router.push(`/${taskId}`);
  }
  async function handleSetStatus(taskId:string,status:boolean){
    const requestOptions = {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
            }
    const res = await fetch(`http://localhost:8080/tasks/editTaskStatus/${taskId}`,requestOptions);
    console.log(res)
  }
  return (
    <div>
      <h1>Tasks to complete</h1>
      {
        allTasks.filter((task) => !task.status).length > 0 && (
          <Paper sx={{ width: '30%', height: '70%', overflow: 'auto', backgroundColor: "lightgreen" }}>
        <List dense component="div" role="list">
          {allTasks.filter((task) => !task.status).map((task, index) => {
            return (
              <ListItem 
                key={task.id}
                role="listitem" divider
              >
                <Checkbox checked={task.status} onClick={()=>handleSetStatus(task.id,task.status)}/>
                <ListItemText  id={index} primary={task.title} />
                <Button variant="outlined" onClick={()=>handleClick(task.id)} color="success" >More Info</Button>
              </ListItem>
              );
          })}
        </List>
        </Paper>
      )
    }
      
      <h1>Completed Tasks</h1>
      {
        allCompletedTasks.length > 0 && (
          <Paper sx={{ width: '30%', height: '70%', overflow: 'auto' }}>
        <List dense component="div" role="list">
          {allCompletedTasks.map((task, index) => {
            return (
              <ListItem 
                key={task.id}
                role="listitem" divider
              >
                <Checkbox checked={task.status} onClick={()=>handleSetStatus(task.id,task.status)}/>
                <ListItemText  id={index} primary={task.title} />
                <Button variant="outlined"  onClick={()=>handleClick(task.id)}>More Info</Button>
              </ListItem>
            )
          })}
        </List>
      </Paper>
        )
      }
          </div>
  );
}
