'use client'

import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
// import { UpdateForm } from '../Components/updateForm';

export default function Details(){
    const [task,setTask] = useState([]);
    const router = useRouter();

    function handleBackToList(){
        router.push('/');
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
        <div>
            <h1>{router.query.taskId}</h1>
            <h1>{task.title}</h1>
            {/* <UpdateForm/> */}
            <button onClick={handleBackToList}>Back To Reality</button>
            <button onClick={deleteTask}>Delete Task</button>
        </div>
    )
} 
