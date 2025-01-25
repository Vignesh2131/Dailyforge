import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { allJournals } from "@/atoms/journals";
import axios from "axios";
import { Button } from "../ui/button";
import { useForm,Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import TiptapEditor from "./TiptapEditor";
const journalEntry = z.object({
  journalTitle: z.string().min(8, { message: "Min 8 Characters required" }),
  description: z.string().min(8,{message:"Too short"}).max(100,{message:"Limit exceded"}),
  mood:z.string()
});
const JournalModal = ({ mainLabel, buttonLabel }) => {
  const {
      control,
    handleSubmit,
    formState: { errors },
      reset,
      setValue,
  } = useForm({ defaultValues: { journalTitle: "", description: "", mood: "" } });
  const [open, setOpen] = useState(false);
  const setJournals = useSetRecoilState(allJournals);
  const handleForm = async(data) => {
      const { journalTitle, description, mood } = data;
      const res = await axios.post(
        "http://localhost:3001/v1/addJournal",
        { title: journalTitle, description: description, mood: mood },
        { withCredentials: true }
      );
      console.log(res);
      setJournals((prev)=>[...prev,res.data.journal])
      reset();
      setOpen(false);
    };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{mainLabel}</Button>
      </DialogTrigger>
      <DialogContent className="w-[1000px]">
        <DialogHeader>
          <DialogTitle>Plan It, Do It, Crush It!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a task and take charge of your day.
        </DialogDescription>
        <form className="grid gap-4" onSubmit={handleSubmit(handleForm)}>
          <Controller
            control={control}
            name="journalTitle"
            render={({ field }) => (
              <input
                className={`px-2 py-1 ${
                  errors.title ? "border-[1px] border-red-500" : ""
                }`}
                placeholder="Title for Today"
                onChange={(e) => setValue("journalTitle", e.target.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
                      render={({ field }) => {
                          return (<TiptapEditor onChange={field.onChange} />
                )
            }}
                  />
                  <Controller
                      control={control}
                      name="mood"
                      render={({ field }) => {
                          return (
                            <select onChange={(e)=>setValue("mood",e.target.value)} className="px-2 py-2">
                              <option value="happy">Happy</option>
                              <option value="excited">Excited</option>
                              <option value="calm">Calm</option>
                              <option value="grateful">Grateful</option>
                              <option value="inspired">Inspired</option>
                              <option value="thoughtful">Thoughtful</option>
                              <option value="anxious">Anxious</option>
                              <option value="sad">Sad</option>
                              <option value="angry">Angry</option>
                              <option value="motivated">Motivated</option>
                            </select>
                          );
                      }}
                  />
          <Button type="submit">{buttonLabel}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JournalModal;
