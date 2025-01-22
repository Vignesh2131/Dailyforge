
import Navbar from '@/components/utils/Navbar'
import Sidebar from '@/components/utils/Sidebar';
import Task from './Task';
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "@/atoms/todos";
import axios from "axios";
const Home = () => {
const [todos, setTodos] = useRecoilState(todoState);
useEffect(() => {
  fetchTodos();
}, []);
const fetchTodos = async () => {
  const res = await axios.get("http://localhost:3001/v1/todos", {
    withCredentials: true,
  });
  setTodos(res.data.todos);
};
  return (
    <div className=" h-screen">
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="col-span-10 px-10 py-4">
         <Task/>
        </div>
        <div className="col-span-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home