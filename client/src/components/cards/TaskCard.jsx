import { CircleCheckBig } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "@/atoms/todos";

// eslint-disable-next-line react/prop-types
const TaskCard = ({ title, status, description, id }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [check, setCheck] = useState(true);
  const uncheck = () => {
    setCheck(prev=>!prev)
    updatedTodo(id,check)
  }
  const updatedTodo = async (id,check) => {
    const res = await axios.patch(`http://localhost:3001/v1/updateTodo?id=${id}`, { "status": check }, { withCredentials: true });
    const newTodo = res.data;
    const index = todos.findIndex((todo) => todo._id == id);
    const completedTodo = replaceTodo(todos, index, { ...newTodo });
    setTodos(completedTodo)
  }

  const replaceTodo = (arr, i, newTodo) => {
    return [...arr.slice(0,i),newTodo,...arr.slice(i+1)]
  }
  return (
    <div className=" border-2 border-red-300 rounded-md shadow-xl px-4 py-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        {status ? <CircleCheckBig/> : (
          <input className="rounded-full" type="checkbox" name="status"  onChange={uncheck} />
        )}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default TaskCard;
