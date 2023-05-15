'use client'

import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function TasksList() {
  
  const [allTasks, setAllTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAllTasks() {
      const res = await fetch('http://localhost:8080/tasks/getAllTasks');
      const data = await res.json();
      setAllTasks(data);
    }
    fetchAllTasks();
  }, [allTasks]);

  const handleClick = (taskId:string)=>{
    router.push(`/${taskId}`);
  }
  return (
    <div>
      <Paper sx={{ width: '30%', height: '70%', overflow: 'auto', backgroundColor: "lightgreen" }}>
        <List dense component="div" role="list">
          {allTasks.map((task, index) => {
            return (
              <ListItem key={task.id} role="listitem" button onClick={()=>handleClick(task.id)} >
                <ListItemIcon>
                  <Checkbox checked={task.status} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText id={index} primary={task.title} />
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </div>
  );
}
