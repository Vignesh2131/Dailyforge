import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import authbackground from "/src/assets/authbackground.svg"
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
      {/* <img src={authbackground} alt="bg" className="-z-20 h-svh absolute" /> */}
      <div className="col-span-5 items-center mx-auto gap-y-4">
        <div className="h-screen flex items-center justify-center flex-col">
          <div className="">
            <p>sdfgf</p>
          </div>
          <img src="/src/assets/signin.svg" className="w-full" alt="" />
        </div>
      </div>
      <div className="col-span-7 border-l p-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-semibold text-xl">DailyForge</h1>
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="flex flex-col items-start">
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
                className="p-3 rounded-md outline-none"
              />
              <input
                {...register("password")}
                type="password"
                placeholder="Your secret key to success"
                className="p-3 rounded-md outline-none"
              />
              <Button type="submit" className="p-3">
                Let’s Get Productive!
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
