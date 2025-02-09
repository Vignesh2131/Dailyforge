import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { homeSwitch } from "@/atoms/homeSwitch";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { authState } from "@/atoms/authcheck";
import { axiosInstance } from "@/lib/axios";
const Navbar = () => {
  const navigate = useNavigate();
  const sethomeSwitch = useSetRecoilState(homeSwitch)
  const setAuth = useSetRecoilState(authState)
  const switchValue = useRecoilValue(homeSwitch)
  const logout = async() => {
    await axiosInstance.delete(`/v1/logout`);
    setAuth(null)
    navigate("/signin");
  }
  return (
    <nav className="p-4 w-full">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1
            className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#E0AAFF] sm:text-lg md:text-xl font-bold"
            onClick={() => sethomeSwitch("todos")}
          >
            Dailyforge
          </h1>
        </Link>
        <div className="flex items-center justify-around gap-x-2 md:gap-x-6">
          <div className="border-[1px] md:border-2 px-2 md:px-3 py-1 rounded-md border-buttonbg gap-x-1 flex items-center justify-between mr-2 md:mr-0">
            <div
              className={`rounded-sm text-sm px-1 md:text-base md:px-2 py-1 cursor-pointer ${
                switchValue == "todos"
                  ? "bg-buttonbg text-white transition ease-out duration-200"
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
              className={`rounded-sm text-sm md:text-base px-1 md:px-2 py-1 cursor-pointer ${
                switchValue == "journals"
                  ? "bg-buttonbg text-white transition ease-out duration-200"
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
          <div className="cursor-pointer" onClick={logout}>
            <LogOut color="#ffffff" className="size-4 md:size-6" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar