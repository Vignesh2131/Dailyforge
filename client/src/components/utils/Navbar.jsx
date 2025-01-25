import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
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
    <nav className="p-4 w-full">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="sm:text-lg md:text-xl font-semibold">Dailyforge</h1>
        </Link>
        <div className="flex items-center justify-around gap-x-2 md:gap-x-6">
          <div className="border-[1px] md:border-2 px-2 md:px-3 py-1 rounded-md border-black gap-x-1 flex items-center justify-between mr-2 md:mr-0">
            <div
              className={`rounded-sm text-sm px-1 md:text-base md:px-2 md:py-1 cursor-pointer ${
                switchValue == "todos"
                  ? "bg-black text-white transition ease-out duration-200"
                  : ""
              }`}
              onClick={() => {
                sethomeSwitch("todos");
                navigate("/");
              }}
            >
              Todos
            </div>
            <div
              className={`rounded-sm text-sm md:text-base px-1 md:px-2 md:py-1 cursor-pointer ${
                switchValue == "journals"
                  ? "bg-black text-white transition ease-out duration-200"
                  : ""
              }`}
              onClick={() => {
                sethomeSwitch("journals");
                navigate("/journals");
              }}
            >
              Journals
            </div>
          </div>
          <Button className="sm:p-1 md:p-5" onClick={logout}>
            <LogOut />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar