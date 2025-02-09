import { CircleCheckBig, CircleX } from "lucide-react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "@/atoms/todos";
import { axiosInstance } from "@/lib/axios";

const TaskCard = ({ title, status, description, id,priority }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [check, setCheck] = useState(true);
  const uncheck = () => {
    setCheck(prev=>!prev)
    updatedTodo(id,check)
  }
  const updatedTodo = async (id,check) => {
    const res = await axiosInstance.patch(
      `/v1/updateTodo?id=${id}`,
      { status: check }
    );
    const newTodo = res.data;
    const index = todos.findIndex((todo) => todo._id == id);
    const completedTodo = replaceTodo(todos, index, { ...newTodo });
    setTodos(completedTodo)
  }

  const deleteTodo = async (id) => {
    try {
        await axiosInstance.delete(
         `/v1/deleteTodo?id=${id}`
       );
       const remainingTodos = todos.filter((todo) => todo._id != id);
       setTodos(remainingTodos);
    } catch (error) {
      console.log("Error occured",error.message);
    }
  }

  const replaceTodo = (arr, i, newTodo) => {
    return [...arr.slice(0,i),newTodo,...arr.slice(i+1)]
  }
  return (
    <div
      className={`border bg-gradient-to-br from-yellow-300 to-yellow-100 ${
        priority === "low" ? "border-green-500" : "border-red-500"
      } rounded-md shadow-md px-4 py-2 relative`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-base md:text-lg font-semibold justify-around flex gap-x-2 items-center text-darkest">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {status ? (
            <CircleCheckBig className="size-4 md:size-6 text-darkest" />
          ) : (
            <input
              className="rounded-full"
              type="checkbox"
              name="status"
              onChange={uncheck}
            />
          )}
          {status && <CircleX className="size-4 md:size-6 text-red-500" onClick={()=>deleteTodo(id)}/>}
        </div>
      </div>
      <p className="text-xs md:text-base text-darkest">{description}</p>
    </div>
  );
};

export default TaskCard;
