import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useNavigate } from "react-router";
const todoEntry = z.object({
    title: z.string().min(10, { message: "Min 10 Character required" }),
    description: z.string().min(15, { message: "Min 15 characters are required" }).optional(),
    priority:z.string(),  
})
const Modal = ({ mainLabel, buttonLabel }) => {
  const navigate = useNavigate();
    const { register, handleSubmit } = useForm({ resolver: zodResolver(todoEntry) })
    const handleForm = async (data) => {
        const { title, description, priority } = data;
        const res = await axios.post(
          "http://localhost:3001/v1/addTodo",
          { title, description, priority },
          { withCredentials: true }
        );
        navigate("/")
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{mainLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>What's the Adventure?</DialogTitle>
              </DialogHeader>
              <DialogDescription>Ah shit here we go again!</DialogDescription>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(handleForm)}>
          <input id="name" placeholder="Todo" {...register("title")} />
          <textarea {...register("description")} placeholder="Description" />
          <div>
            <select {...register("priority")}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Button type="submit">{buttonLabel}</Button>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default Modal;
