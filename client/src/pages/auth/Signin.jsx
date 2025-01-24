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
    <div className="h-screen w-full font-mono md:grid md:grid-cols-12">
      <div className="hidden items-center gap-y-4 md:inline md:col-span-5">
        <div className="flex min-h-screen items-center justify-center flex-col">
          <div className="text-center">
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
      <div className="md:col-span-7 p-6 bg-slate-600 text-white h-screen">
        <div className="flex justify-between items-center mb-10 md:mb-14">
          <h1 className="font-semibold text-xl">DailyForge</h1>
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <h1 className="text-xl font-semibold md:text-3xl md:font-bold">
              Welcome Back, Your Goals Await!
            </h1>
            <p className="md:text-lg font-medium">
              Log in to conquer your tasks and reflect on your progress.
            </p>
          </div>
          <div className="w-[250px] md:w-[400px]">
            <form
              className="flex flex-col gap-y-3 md:gap-y-4"
              onSubmit={handleSubmit(handleForm)}
            >
              <input
                {...register("email")}
                type="email"
                placeholder="Your email of triumph!"
                className="px-1 py-2 text-sm md:p-3 md:text-base rounded-md outline-none text-black"
              />
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Your secret key to success"
                  className="px-1 py-2 text-sm md:p-3 md:text-base rounded-md outline-none w-[250px] md:w-[400px] text-black"
                />
                {showPassword ? (
                  <Eye
                    color="#000000"
                    className="absolute bottom-1 left-[220px] md:bottom-3 md:left-[360px]"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    color="#000000"
                    className="absolute bottom-1 left-[220px] md:bottom-3 md:left-[360px]"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <Button type="submit" className="p-1 text-sm md:p-3 bg-slate-800">
                Let’s Get Productive!
              </Button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signin;
