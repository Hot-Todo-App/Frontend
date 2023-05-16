'use client'

import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import {Box,Card,CardContent,Typography,TextField,Button} from '@mui/material';
export default function Details(){
    const [task,setTask] = useState([]);
    const [title,setTitle] = useState('');
    const [errorText,setErrorText] = useState('');
    const router = useRouter();

    function handleBackToList(){
        router.push('/');
    }

    function getFormattedDate(date:string){
        let str = "";
        const arr = date.split("T")
        const time = String(arr[1]).split(".")[0]
        return str + String(arr[0])  + " (" + time +")"
    }


    async function handleEditTask(newTitle:string) {
        const requestOptions = {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
        }
        console.log(newTitle)
        if (newTitle.length <=0){
            setErrorText("New title is empty...")
            return;
        }
        if (task.title === newTitle){
            setErrorText("You didn't change the title...")
            return;
        }else{
            const res = await fetch(`http://localhost:8080/tasks/editTitle/${router.query.taskId}/${newTitle}`,requestOptions)
            setErrorText('');
            router.push('/')
        }
    }

    async function deleteTask(){
        const res = await fetch(`http://localhost:8080/tasks/delete/${router.query.taskId}`,{
            method: 'DELETE',
        })
        if (res.ok)
            router.push('/');
        else{
            throw new Error(`Problem to delete task ${router.query.taskId}...`);
        }
    }

    useEffect(()=>{
        async function fetchTask(){
            try{
                const res = await fetch(`http://localhost:8080/tasks/${router.query.taskId}`)
                const data = await res.json();
                setTask(data)
            }catch(e){
                console.log(e)
            }
        }
        fetchTask();
    },[router.query.taskId, task])

    return(
        <div className="mainPageTask">
            <Card className="card">
                <CardContent>
                    <Typography gutterBottom variant='h5' component="div" textAlign="center ">
                        {task.title}
                    </Typography>
                    <Typography>{getFormattedDate(String(task.updatedAt))}</Typography>
                    <input id="outlined" placeholder="Enter new title" onChange={e=>setTitle(e.target.value)} label="New Title" variant="outlined" />
                    <button onClick={()=>handleEditTask(title)} >Edit title</button>
                    <Typography gutterBottom variant='h5' textAlign="center">{errorText}</Typography>
                    <Button variant="outlined" onClick={handleBackToList}>Back To Reality</Button>
                    <Button variant="outlined" onClick={deleteTask}>Delete Task</Button>   
                </CardContent>
            </Card>
        </div>
    )
} 
``