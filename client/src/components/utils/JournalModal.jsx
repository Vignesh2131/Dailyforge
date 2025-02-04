import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { allJournals } from "@/atoms/journals";
import { NotebookPen } from "lucide-react";
import axios from "axios";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import { PencilLine } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {useSetRecoilState } from "recoil";
import { useState } from "react";
import TiptapEditor from "./TiptapEditor";

const JournalModal = ({ mainLabel, buttonLabel,title,description,mood,id }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
      reset,
      setValue,
  } = useForm({ defaultValues: { journalTitle: "", description: "", mood: "happy" } });
  const [open, setOpen] = useState(false);
  const setJournals = useSetRecoilState(allJournals);
 
  const addJournal = async(data) => {
      const { journalTitle, description, mood } = data;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/addJournal`,
        { title: journalTitle, description: description, mood: mood },
        { withCredentials: true }
      );
      setJournals((prev)=>Array.isArray(prev)?[...prev,res.data.journal]:[res.data.journal])
      reset();
      setOpen(false);
    };

  const updateJournal = async (data) => {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/v1/updateJournal?id=${id}`,
      { ...data },
      { withCredentials: true }
    );
    console.log(res);
    reset();
    setOpen(false);
  }

  const handleForm = mainLabel == "Add Journal" ? addJournal : updateJournal;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mainLabel==="edit" ?<PencilLine className="size-5 md:size-6"/> : <Button>{mainLabel}</Button>}
      </DialogTrigger>
      <DialogContent className="w-[350px] md:w-[500px] lg:w-[700px]">
        <DialogHeader>
          <DialogTitle>Add your Journal</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          Reflect your thoughts buddy.
        </DialogDescription>
        <form className="grid gap-4" onSubmit={handleSubmit(handleForm)}>
          <Controller
            control={control}
            name="journalTitle"
            render={({ field }) => (
              <input
                className={`px-2 py-1 border ${
                  errors.title ? "border-[1px] border-red-500" : ""
                }`}
                placeholder={title?title:"Title your moment"}
                onChange={(e) => setValue("journalTitle", e.target.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              return (
                <TiptapEditor
                  onChange={field.onChange}
                  description={description}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="mood"
            render={({ field }) => {
              return (
                <select
                  value={mood}
                  onChange={(e) => setValue("mood", e.target.value)}
                  className="px-1 py-1 border rounded-md w-1/2 md:px-2 md:py-2"
                >
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
