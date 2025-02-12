import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "@/atoms/authcheck";
import { signUpSchema as userSchema } from "@/lib/schemas";
import { axiosInstance } from "@/lib/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const notify = (message) => {
    toast(message);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });
  const handleForm = async (d) => {
    setIsSigningUp(true);
    const { username, email, password, confirmPassword } = d;
    if (password !== confirmPassword) {
      notify("Password doesn't match");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      if (res.status == 201) {
        setAuth(res.data);
        setIsSigningUp(false);
        notify("Signed up successfully")
        navigate("/");
      }
    } catch (error) {
      setIsSigningUp(false);
      notify(error.response.data.message);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="p-6 bg-gradient-to-tr from-[#240046] to-[#7B2CBF] text-white h-screen">
        <div className="flex justify-between items-center mb-10 md:mb-14">
          <h1 className="font-bold text-xl">Dailyforge</h1>
          <Link className="underline font-semibold" to="/signin">
            Sign in
          </Link>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <h1 className="text-xl text-transparent bg-clip-text bg-gradient-to-l from-white to-[#E0AAFF] font-semibold md:text-3xl md:font-bold drop-shadow-sm">
              Supercharge Your Productivity. Simplify Your Life.
            </h1>
            <p className="md:text-lg font-light">
              Join to stay on top of tasks while journaling their way to clarity
            </p>
          </div>
          <div className="w-[250px] md:w-[400px]">
            <form
              className="flex flex-col gap-y-3 md:gap-y-4 text-black"
              onSubmit={handleSubmit(handleForm)}
            >
              <div>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Heroic name, please!"
                  className={`p-2 text-xs md:p-3 md:text-base rounded-md outline-none w-[250px] md:w-[400px] ${
                    errors.username && "border-2 border-red-600"
                  }`}
                />
                {errors.username ? (
                  <p className="text-xs md:text-sm font-thin text-primary">
                    {errors.username.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                {" "}
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Magical email"
                  className={`p-2 text-xs md:p-3 md:text-base rounded-md outline-none w-[250px] md:w-[400px] ${
                    errors.email && "border-2 border-red-600"
                  }`}
                />
                {errors.email ? (
                  <p className="text-xs md:text-sm font-thin text-primary">
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
                  <p className="text-xs md:text-sm font-thin text-primary">
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
                  <p className="text-xs md:text-sm font-thin text-primary">
                    {errors.confirmPassword.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <Button
                type="submit"
                className="p-1 text-sm md:p-3 bg-buttonbg hover:bg-[#7B2CBF]"
              >
                {isSigningUp?"Signing up...":"Join the Squad"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
