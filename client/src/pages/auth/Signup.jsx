import { Link } from "react-router"
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

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userSchema) })
  const handleForm = async (d) => {
     const { username, email, password, confirmPassword } = d;
    if (password !== confirmPassword) throw new Error("Passwords doesn't match")
    
    const data = await axios.post("http://localhost:3001/auth/signup", { username, email, password },{withCredentials:true});
    console.log(data)
   
  }
  return (
    <div className="grid grid-cols-12 min-h-screen w-full font-mono">
      <div className="col-span-7 border-r p-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-semibold text-xl">DailyForge</h1>
          <Link className="underline" to="/signin">Sign in</Link>
        </div>
        <div className="flex flex-col items-start">
          <div className="mb-8">
            <h1 className="text-5xl">Get Started</h1>
            <p>Enter your details</p>
          </div>
          <div className="w-[400px]">
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(handleForm)}
            >
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="p-3 rounded-md outline-none"
              />
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
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="p-3 rounded-md outline-none"
              />
              <Button type="submit" className="p-3">
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-5"></div>
    </div>
  );
}

export default Signup