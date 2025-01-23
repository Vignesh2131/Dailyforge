
import Navbar from '@/components/utils/Navbar'
import Sidebar from '@/components/utils/Sidebar';
import Task from './Task';
import { useEffect } from "react";
import { useSetRecoilState,useRecoilValue } from "recoil";;
import { todoState } from "@/atoms/todos";
import { homeSwitch } from '@/atoms/homeSwitch';
import Journals from './Journals';
import axios from "axios";
const Home = () => {
  const setTodos= useSetRecoilState(todoState);
  const switchBtnState = useRecoilValue(homeSwitch)
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
         {switchBtnState=="todos"?<Task/>:<Journals/>}
        </div>
        <div className="col-span-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home