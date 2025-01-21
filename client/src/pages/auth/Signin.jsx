import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import axios from "axios";
const userSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(8, { message: "Must contain atleast 8 characters" }),
});

const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });
  const handleForm = async (d) => {
    const { email, password} = d;
    const data = await axios.post("http://localhost:3001/auth/signin", {
      email,
      password,
    },{withCredentials:true});
    if (data.status === 201) navigate("/");
    console.log(data);
  };
  return (
    <div className="grid grid-cols-12 min-h-screen w-full font-mono">
      <div className="col-span-5"></div>
      <div className="col-span-7 border-l p-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-semibold text-xl">DailyForge</h1>
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <div className="mb-8">
            <h1 className="text-5xl">Welcome back</h1>
            <p>Enter your credentials</p>
          </div>
          <div className="w-[400px]">
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(handleForm)}
            >
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="p-3 rounded-md outline-none"
              />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="p-3 rounded-md outline-none"
              />
              <Button type="submit" className="p-3">
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
