
import Navbar from '@/components/utils/Navbar'
import Sidebar from '@/components/utils/Sidebar';
import Task from './Task';
import { useEffect } from "react";
import { useCallback } from 'react';
import { useSetRecoilState,useRecoilValue } from "recoil";;
import { todoState } from "@/atoms/todos";
import { allJournals } from '@/atoms/journals';
import { homeSwitch } from '@/atoms/homeSwitch';
import Journals from './Journals';
import axios from "axios";
const Home = () => {
  const setTodos = useSetRecoilState(todoState);
  const setJournals = useSetRecoilState(allJournals)
  const switchBtnState = useRecoilValue(homeSwitch)
  const fetchTodos = useCallback(async() => {
    const res = await axios.get("http://localhost:3001/v1/todos", {
      withCredentials: true,
    });
    setTodos(res.data.todos);
  }, [setTodos])
  
  const fetchJournals = useCallback(async () => {
      const res = await axios.get("http://localhost:3001/v1/journals", {
        withCredentials: true,
      });
    setJournals(res.data.journals);
  },[setJournals])
useEffect(() => {
  fetchTodos();
  fetchJournals();
}, [fetchJournals, fetchTodos]);

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