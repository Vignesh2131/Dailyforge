import TaskCard from "../cards/TaskCard"
import { useEffect,useState } from "react"
import axios from "axios";
const HomeTasks = () => {
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
   fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3001/v1/todos", { withCredentials: true });
    setTasks(res.data.todos)
  }
  console.log(tasks);
  
  return (
      <div className="mb-12">
          <div className="mb-3">
              <h2 className="text-4xl font-bold">Tasks</h2>
          </div>
      <div className="grid grid-cols-3 gap-x-6">
        {tasks && tasks.map((task) => {
          return (<TaskCard key={task.id} title={task.title} description={task.description} date={task.createdAt} priority={task.priority}/>)
        })}
          </div>
    </div>
  )
}

export default HomeTasks