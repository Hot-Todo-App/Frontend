import TasksList from '../Components/tasksList';
import CreateTask from '../Components/createTask';
export default function Home() {
  return (
    <div>
      <h1>My To-Do List</h1>
      <TasksList/>
      <CreateTask/>
    </div>
  )
}
