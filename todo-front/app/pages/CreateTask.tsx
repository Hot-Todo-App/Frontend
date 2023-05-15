'use client'

import { useState, useEffect } from 'react';
export default function CreateTask(){
    const [title,setTitle] = useState('');
    
    async function handleCreateTask(title:string){
        const date = new Date();
        const data = {
            "title": title,
            "status": true,
            "createdAt": date,
            "updatedAt":date,
        }
        const res = await fetch('http://localhost:8080/tasks/createTask',data);
        
    }
    return(
        <div>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
            <button onClick={handleCreateTask(title)}>Add Task</button>
        </div>
    );
}