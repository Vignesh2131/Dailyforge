import { useCookies } from "react-cookie";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const logout = async() => {
   const res = await axios.delete("http://localhost:3001/v1/logout", {
     withCredentials: true,
   });
    console.log(res);
    navigate("/signin");

  }
  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dailyforge</h1>
        <div className="flex items-center justify-between gap-x-6">
          <div className="border-2 px-3 py-1 rounded-md border-black flex items-center justify-between gap-x-2">
            <p className="bg-slate-300 rounded-md px-2 py-1">Todos</p>
            <p>Journals</p>
          </div>
          <Button onClick={logout}>Log out</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar