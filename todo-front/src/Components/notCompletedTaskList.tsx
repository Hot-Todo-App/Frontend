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

export default function NotCompletedTasksList({allTasks}) {

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
        <div className="child">  
      <h1>Tasks to complete - {allTasks.filter((task) => !task.status).length}</h1>
        {
        allTasks.filter((task) => !task.status).length > 0 && (
          <Paper sx={{backgroundColor: "lightgreen" }}>
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
        )}
        </div>
    )
}