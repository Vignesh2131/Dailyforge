import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { todoState } from "@/atoms/todos";
const todoEntry = z.object({
    title: z.string().min(10, { message: "Min 10 Character required" }),
    description: z.string().min(15, { message: "Min 15 characters are required" }).optional(),
    priority:z.string(),  
})
const Modal = ({ mainLabel, buttonLabel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(todoEntry) })
  const setTodos = useSetRecoilState(todoState)
    const handleForm = async (data) => {
        const { title, description, priority } = data;
        const res = await axios.post(
          "http://localhost:3001/v1/addTodo",
          { title, description, priority },
          { withCredentials: true }
      );
       console.log(res)
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{mainLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Plan It, Do It, Crush It!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a task and take charge of your day.
        </DialogDescription>
        <form className="grid gap-4" onSubmit={handleSubmit(handleForm)}>
          <input className="px-2 py-1" id="name" placeholder="Todo" {...register("title")} />
          <textarea className="px-2 py-1" {...register("description")} placeholder="Description" />
          <div>
            <select {...register("priority")} className="px-2 py-2">
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <DialogClose asChild>
            <Button type="submit">{buttonLabel}</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
