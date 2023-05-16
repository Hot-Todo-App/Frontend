import TasksList from '../Components/tasksList';
import CreateTask from '../Components/createTask';
export default function Home() {
  return (
    <div className="mainPage">
      <h1 className="header">My To-Do List</h1>
      <CreateTask/>
      <TasksList/>
    </div>
  )
}
