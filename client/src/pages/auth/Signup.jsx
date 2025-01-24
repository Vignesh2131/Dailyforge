import { Link, useNavigate } from "react-router"
import { ToastContainer,toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import axios from "axios"
const userSchema = z.object({
    username: z
      .string()
      .min(6, { message: "Username must contain atleast 6 characters" }),
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
      .string()
      .min(8, { message: "Must contain atleast 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Must contain atleast 8 characters" }),
});


const Signup = () => {
  const navigate = useNavigate();
  const notify = (message) =>{ toast(message)}
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userSchema) })
  const handleForm = async (d) => {
     const { username, email, password, confirmPassword } = d;
    if (password !== confirmPassword) throw new Error("Passwords doesn't match")
    try {
      const data = await axios.post(
        "http://localhost:3001/auth/signup",
        { username, email, password },
        { withCredentials: true }
      );
      if (data.status == 201) navigate("/todos");
    } catch (error) {
      notify(error.response.data.message)
    }
    
  }
  return (
    <div className="grid grid-cols-12 min-h-screen w-full font-mono">
      <div className="col-span-7 bg-slate-600 text-white p-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-semibold text-xl">DailyForge</h1>
          <Link className="underline" to="/signin">
            Sign in
          </Link>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Supercharge Your Productivity. Simplify Your Life.
            </h1>
            <p className="text-lg font-semibold">
              Join to stay on top of tasks while journaling their way to clarity
            </p>
          </div>
          <div className="w-[400px]">
            <form
              className="flex flex-col gap-y-4 text-black"
              onSubmit={handleSubmit(handleForm)}
            >
              <input
                {...register("username")}
                type="text"
                placeholder="Heroic name, please!"
                className="p-3 rounded-md outline-none"
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Magical email"
                className="p-3 rounded-md outline-none"
              />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="p-3 rounded-md outline-none"
              />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="p-3 rounded-md outline-none"
              />
              <Button type="submit" className="p-3 bg-slate-800">
                Join the Squad
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-5 items-center gap-y-4 px-5">
        <div className="flex min-h-screen items-center justify-center flex-col">
          <div className="">
            <p>
              “Not only should you have a to-do list, but it must become your
              best friend.”{" "}
              <span className="font-semibold inline-block">Jim Kwik</span>
            </p>
          </div>
          <img src="/src/assets/signup.svg" className="w-2/3" alt="" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup