import { CircleCheckBig } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "@/atoms/todos";

const TaskCard = ({ title, status, description, id,priority }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [check, setCheck] = useState(true);
  const uncheck = () => {
    setCheck(prev=>!prev)
    updatedTodo(id,check)
  }
  const updatedTodo = async (id,check) => {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/v1/updateTodo?id=${id}`,
      { status: check },
      { withCredentials: true }
    );
    const newTodo = res.data;
    const index = todos.findIndex((todo) => todo._id == id);
    const completedTodo = replaceTodo(todos, index, { ...newTodo });
    setTodos(completedTodo)
  }

  const replaceTodo = (arr, i, newTodo) => {
    return [...arr.slice(0,i),newTodo,...arr.slice(i+1)]
  }
  return (
    <div className={`border ${priority==="low"?"border-green-500":"border-red-500"} rounded-md shadow-md px-4 py-2`}>
      <div className="flex justify-between items-center">
        <h3 className="text-base md:text-lg font-semibold justify-around flex gap-x-2 items-center">
          {title}
        </h3>
        {status ? (
          <CircleCheckBig className="size-4 md:size-6" />
        ) : (
          <input
            className="rounded-full"
            type="checkbox"
            name="status"
            onChange={uncheck}
          />
        )}
      </div>
      <p className="text-xs md:text-base">{description}</p>
    </div>
  );
};

export default TaskCard;
