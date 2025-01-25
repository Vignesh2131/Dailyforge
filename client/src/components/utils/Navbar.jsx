
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { homeSwitch } from "@/atoms/homeSwitch";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
const Navbar = () => {

  const navigate = useNavigate();
  const sethomeSwitch = useSetRecoilState(homeSwitch)
  const switchValue = useRecoilValue(homeSwitch)
  const logout = async() => {
    await axios.delete("http://localhost:3001/v1/logout", {
     withCredentials: true,
   });
    navigate("/signin");
  }
  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dailyforge</h1>
        <div className="flex items-center justify-between gap-x-6">
          <div className="border-2 px-3 py-1 rounded-md border-black flex items-center justify-between gap-x-2">
            <p
              className={`rounded-md px-2 py-1 cursor-pointer ${
                switchValue == "todos" ? "bg-slate-300 transition ease-out duration-200" : ""
              }`}
              onClick={() => {
                sethomeSwitch("todos");
                navigate("/")
              }}
            >
              Todos
            </p>
            <p
              className={`rounded-md px-2 py-1 cursor-pointer ${
                switchValue == "journals" ? "bg-slate-300 transition ease-in duration-200" : ""
              }`}
              onClick={() => {
                sethomeSwitch("journals");
              }}
            >
              Journals
            </p>
          </div>
          <Button onClick={logout}>Log out</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar