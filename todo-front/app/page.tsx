import TasksList from './pages/TasksList';
import CreateTask from './pages/CreateTask';
export default function Home() {
  return (
    <div>
      <h1>My To-Do List</h1>
      <TasksList/>
      <CreateTask/>
    </div>
  )
}
