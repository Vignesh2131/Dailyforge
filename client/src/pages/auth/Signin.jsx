import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { authState } from "@/atoms/authcheck";
import { useSetRecoilState} from "recoil";
import { signInSchema as userSchema } from "@/lib/schemas";
import { axiosInstance } from "@/lib/axios";

const Signin = () => {
  const setAuth = useSetRecoilState(authState)
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });
  const handleForm = async (d) => {
    setIsSigningIn(true);
    const { email, password } = d;
    try {
      const res = await axiosInstance.post("/auth/signin", { email, password });
      if (res.status === 201) {
        setAuth(res.data);
        setIsSigningIn(false);
        notify("Signed in successfully")
        navigate("/");
      }
    } catch (error) {
      setIsSigningIn(false);
      notify(error.response.data.message);
    }
  };
  return (
    <div className="h-full w-full">
      <div className="p-6 bg-gradient-to-tr from-[#240046] to-[#7B2CBF] text-white h-screen">
        <div className="flex justify-between items-center mb-10 md:mb-14">
          <h1 className="font-bold text-xl">Dailyforge</h1>
          <Link className="underline font-semibold" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="flex flex-col items-center text-center text-[#E0AAFF] ">
          <div className="mb-8">
            <h1 className="text-xl text-transparent bg-clip-text bg-gradient-to-l from-white to-[#E0AAFF] font-semibold md:text-3xl md:font-bold drop-shadow-sm">
              Welcome Back, Your Goals Await!
            </h1>
            <p className="md:text-lg font-light text-white">
              Log in to conquer your tasks and reflect on your progress.
            </p>
          </div>
          <div className="w-[250px] md:w-[400px]">
            <form
              className="flex flex-col gap-y-3 md:gap-y-4"
              onSubmit={handleSubmit(handleForm)}
            >
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Your email of triumph!"
                  className="p-2 text-xs md:p-3 md:text-base rounded-md outline-none w-[250px] md:w-[400px] text-black"
                />
                {errors.email ? (
                  <p className="text-xs md:text-sm font-thin">
                    {errors.email.message}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Your secret key to success"
                  className="p-2 text-xs md:p-3 md:text-base rounded-md outline-none w-[250px] md:w-[400px] text-black"
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
                  <p className="text-xs md:text-sm font-thin">
                    {errors.password.message}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <Button
                type="submit"
                className="p-1 text-sm md:p-3 bg-buttonbg hover:bg-[#7B2CBF]"
              >
                {isSigningIn?"Signing in..":"Let’s Get Productive!"}
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
