import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Loader } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { todoState } from "@/atoms/todos";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
const todoEntry = z.object({
    title: z.string().min(6, { message: "Min 8 Characters required" }),
  description: z.string().optional(),
    priority:z.string(),  
})
const Modal = ({ mainLabel, buttonLabel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(todoEntry) })
  const [open, setOpen] = useState(false);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const setTodos = useSetRecoilState(todoState)
  const handleForm = async (data) => {
    setIsAddingTodo(true);
    try {
      const { title, description, priority } = data;
      const res = await axiosInstance.post(`/v1/addTodo`, {
        title,
        description,
        priority,
      });
      setTodos((prev) => [...(prev||[]), res.data.todos]);
      setIsAddingTodo(false);
      reset();
      setOpen(false);
    } catch (error) {
      setIsAddingTodo(false);
      console.log(error)
    }
  
        
  }
 
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-sm px-3 py-2 md:text-base bg-buttonbg hover:bg-dark">{mainLabel}</Button>
      </DialogTrigger>
      <DialogContent className="w-[300px] md:w-[500px] bg-yellow-100">
        <DialogHeader>
          <DialogTitle>Plan It, Do It, Crush It!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a task and take charge of your day.
        </DialogDescription>
        <form className="grid gap-4" onSubmit={handleSubmit(handleForm)}>
          <input
            className={`px-2 py-1 text-sm md:text-base border bg-yellow-50 rounded-md ${
              errors.title ? "border-[1px] border-red-500" : ""
            }`}
            id="name"
            placeholder="Todo"
            {...register("title")}
          />
          {errors.title ? (
            <p className="text-sm font-semibold text-red-500">
              {errors.title.message}
            </p>
          ) : (
            ""
          )}
          <textarea
            className="px-2 py-1 text-sm bg-yellow-50 md:text-base border rounded-md"
            {...register("description")}
            placeholder="Description"
          />
          {errors.description ? (
            <p className="text-sm font-semibold text-red-500">
              {errors.description.message}
            </p>
          ) : (
            ""
          )}
          <div>
            <select
              {...register("priority")}
              className="px-2 py-1 md:py-2 text-sm md:text-base border bg-yellow-50 rounded-md"
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <Button type="submit" className="bg-shade hover:bg-buttonbg">{isAddingTodo?<Loader className="animate-spin"/>:buttonLabel}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
