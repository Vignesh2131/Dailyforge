import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { EyeOff,Eye } from "lucide-react";
import { useState } from "react";
const userSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(8, { message: "Must contain atleast 8 characters" }),
});

const Signin = () => {
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });
  const handleForm = async (d) => {
    const { email, password } = d;
    try {
       const data = await axios.post(
         "http://localhost:3001/auth/signin",
         {
           email,
           password,
         },
         { withCredentials: true }
       );
       if (data.status === 201) navigate("/todos");
       console.log(data);
    } catch (error) {
      notify(error.response.data.message)
    }
   
  };
  return (
    <div className="grid grid-cols-12 min-h-screen w-full font-mono">
      <div className="col-span-5 items-center gap-y-4">
        <div className="flex min-h-screen items-center justify-center flex-col">
          <div className="">
            <p>
              Plans are nothing; planning is everything.{" "}
              <span className="font-semibold inline-block">
                - Dwight D. Eisenhower
              </span>
            </p>
          </div>
          <img src="/src/assets/signin.svg" className="w-2/3" alt="" />
        </div>
      </div>
      <div className="col-span-7 p-6 bg-slate-600 text-white">
        <div className="flex justify-between items-center mb-14">
          <h1 className="font-semibold text-xl">DailyForge</h1>
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Welcome Back, Your Goals Await!
            </h1>
            <p className="text-lg font-semibold">
              Log in to conquer your tasks and reflect on your progress.
            </p>
          </div>
          <div className="w-[400px]">
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(handleForm)}
            >
              <input
                {...register("email")}
                type="email"
                placeholder="Your email of triumph!"
                className="p-3 rounded-md outline-none text-black"
              />
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Your secret key to success"
                  className="p-3 rounded-md outline-none w-[400px] text-black"
                />
                {showPassword ? (
                  <Eye
                    color="#000000"
                    className="absolute bottom-3 left-[360px]"
                    onClick={()=>setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    color="#000000"
                      className="absolute bottom-3 left-[360px]"
                      onClick={()=>setShowPassword(true)}
                  />
                )}
              </div>

              <Button type="submit" className="p-3 bg-slate-800">
                Let’s Get Productive!
              </Button>
            </form>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Signin;
