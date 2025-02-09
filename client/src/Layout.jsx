import { Outlet } from 'react-router'
import Navbar from './components/utils/Navbar'
import Sidebar from './components/utils/Sidebar'
import { useEffect } from "react";
import { useCallback } from "react";
import { useSetRecoilState} from "recoil";
import { todoState } from "@/atoms/todos";
import { allJournals } from "@/atoms/journals";
import { axiosInstance } from './lib/axios';
const Layout = () => {
  const setTodos = useSetRecoilState(todoState);
  const setJournals = useSetRecoilState(allJournals);

  
    const fetchTodos = useCallback(async () => {
      const res = await axiosInstance.get(`/v1/todos`);
      setTodos(res.data.todos);
    }, [setTodos]);

    const fetchJournals = useCallback(async () => {
      const res = await axiosInstance.get(`/v1/journals`);
      setJournals(res.data.journals);
    }, [setJournals]);
  
  
     useEffect(() => {
      fetchTodos();
       fetchJournals();
     }, [fetchJournals, fetchTodos]);
  
  
  return (
    <div className="h-screen bg-gradient-to-tr from-[#240046] to-[#7B2CBF] text-[#EEF4D4]">
      <Navbar />
      <div className="lg:grid lg:grid-cols-12">
        <div className="lg:col-span-10 px-6 lg:px-8 py-4">
          <Outlet />
        </div>
        <div className="hidden lg:col-span-2 lg:inline">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Layout