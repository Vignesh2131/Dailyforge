import { Link, useNavigate } from "react-router"
import { ToastContainer,toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { authState } from "@/atoms/authcheck"
import { signUpSchema as userSchema } from "@/lib/schemas"

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const setAuth = useSetRecoilState(authState)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const notify = (message) =>{ toast(message)}
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userSchema) })
  const handleForm = async (d) => {
     const { username, email, password, confirmPassword } = d;
    if (password !== confirmPassword) {
      notify("Password doesn't match")
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        { username, email, password },
        { withCredentials: true}
      );
      if (res.status == 201) {
        setAuth(res.data)
        navigate("/");
      }
    } catch (error) {
      notify(error.response.data.message)
    }
  }



  return (
    <div className="h-screen md:grid md:grid-cols-12 w-full">
      <div className=" h-screen md:col-span-7 bg-slate-600 text-white p-6">
        <div className="flex justify-between items-center mb-10 md:mb-14">
          <h1 className="font-semibold text-xl">DailyForge</h1>
          <Link className="underline" to="/signin">
            Sign in
          </Link>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <h1 className="text-xl font-semibold md:text-3xl md:font-bold">
              Supercharge Your Productivity. Simplify Your Life.
            </h1>
            <p className="md:text-lg font-medium">
              Join to stay on top of tasks while journaling their way to clarity
            </p>
          </div>
          <div className="w-[250px] md:w-[400px]">
            <form
              className="flex flex-col gap-y-3 md:gap-y-4 text-black"
              onSubmit={handleSubmit(handleForm)}
            >
              <input
                {...register("username")}
                type="text"
                placeholder="Heroic name, please!"
                className={`p-2 text-xs md:p-3 md:text-base rounded-md outline-none${
                  errors.username && "border-2 border-red-600"
                }`}
              />
              {errors.username ? (
                <p className="text-xs md:text-sm font-thin text-red-500">
                  {errors.username.message}
                </p>
              ) : (
                ""
              )}
              <input
                {...register("email")}
                type="email"
                placeholder="Magical email"
                className={`p-2 text-xs md:p-3 md:text-base rounded-md outline-none${
                  errors.email && "border-2 border-red-600"
                }`}
              />
              {errors.email ? (
                <p className="text-xs md:text-sm font-thin text-red-500">
                  {errors.email.message}
                </p>
              ) : (
                ""
              )}
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`p-2 text-xs md:p-3 md:text-base rounded-md outline-none w-[250px] md:w-[400px] ${
                    errors.password && "border-2 border-red-600"
                  }`}
                />
                {showPassword ? (
                  <Eye
                    color="#000000"
                    className="absolute size-4 md:size-6 inset-2 md:inset-3 bottom-2 left-[220px] md:bottom-3 md:left-[360px]"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    color="#000000"
                    className="absolute size-4 md:size-6 inset-2 md:inset-3 bottom-2 left-[220px] md:bottom-3 md:left-[360px]"
                    onClick={() => setShowPassword(true)}
                  />
                )}
                {errors.password ? (
                  <p className="text-xs md:text-sm font-thin text-red-500">
                    {errors.password.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`p-2 text-xs md:p-3 md:text-base rounded-md outline-none w-[250px] md:w-[400px] ${
                    errors.confirmPassword && "border-2 border-red-600"
                  }`}
                />
                {showConfirmPassword ? (
                  <Eye
                    color="#000000"
                    className="absolute size-4 md:size-6 inset-2 md:inset-3 bottom-2 left-[220px] md:bottom-3 md:left-[360px]"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <EyeOff
                    color="#000000"
                    className="absolute size-4 md:size-6 inset-2 md:inset-3 bottom-2 left-[220px] md:bottom-3 md:left-[360px]"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
                {errors.confirmPassword ? (
                  <p className="text-xs md:text-sm font-thin text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <Button type="submit" className="p-3 bg-slate-800">
                Join the Squad
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:inline col-span-5 items-center gap-y-4 px-5">
        <div className="flex min-h-screen items-center justify-center flex-col">
          <div className="">
            <p>
              “Not only should you have a to-do list, but it must become your
              best friend.”{" "}
              <span className="font-semibold inline-block">Jim Kwik</span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup