'use client'

import { useState, useEffect } from 'react';
export default function CreateTask(){
    const [title,setTitle] = useState('');
    const [errorText,setErrorText] = useState('');
    async function handleCreateTask(title:string){
        if (title.length <= 0){
            setErrorText('Oops task title is empty...')
            return;
        }else{
            const date = new Date();
            const data = {
                "title": title,
                "status": true,
                "createdAt": date,
                "updatedAt":date,
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
            const res = await fetch('http://localhost:8080/tasks/createTask',requestOptions);
        }
    }
    return(
        <div>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
            <button onClick={()=>handleCreateTask(title)}>Add Task</button>
            <h2>{errorText}</h2>
        </div>
    );
}
