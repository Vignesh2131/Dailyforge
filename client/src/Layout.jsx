import { Outlet } from 'react-router'
import Navbar from './components/utils/Navbar'
import Sidebar from './components/utils/Sidebar'
import { useEffect } from "react";
import { useCallback } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoState } from "@/atoms/todos";
import { allJournals } from "@/atoms/journals";
import { homeSwitch } from "@/atoms/homeSwitch";
import axios from "axios";
const Layout = () => {
    const setTodos = useSetRecoilState(todoState);
    const setJournals = useSetRecoilState(allJournals);
    const fetchTodos = useCallback(async () => {
      const res = await axios.get("http://localhost:3001/v1/todos", {
        withCredentials: true,
      });
      setTodos(res.data.todos);
    }, [setTodos]);

    const fetchJournals = useCallback(async () => {
      const res = await axios.get("http://localhost:3001/v1/journals", {
        withCredentials: true,
      });
      setJournals(res.data.journals);
    }, [setJournals]);
    useEffect(() => {
      fetchTodos();
      fetchJournals();
    }, [fetchJournals, fetchTodos]);
  return (
      <div className='h-screen'>
          <Navbar />
          <div className='grid grid-cols-12'>
              <div className='col-span-10 px-8 py-4'>
                  <Outlet/>
              </div>
              <div className='col-span-2'>
                  <Sidebar/>
              </div>
          </div>
    </div>
  )
}

export default Layout