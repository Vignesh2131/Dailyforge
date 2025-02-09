import { Trash } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "@/lib/axios";
import { allJournals } from "@/atoms/journals";
import { useRecoilValue, useSetRecoilState } from "recoil";
import JournalModal from "../utils/JournalModal";
import moods from "@/lib/moods";
const JournalCard = ({ date, title, mood, description, id }) => {
  const journals = useRecoilValue(allJournals)
  const navigate = useNavigate();
  const setNewJournals = useSetRecoilState(allJournals)
  const deleteJournal = async () => {
    await axiosInstance.delete(
      `/v1/deleteJournal?id=${id}`
    );
    const updatedJournals = journals.filter((journal) => journal._id != id);
    setNewJournals(updatedJournals);
    navigate("/journals")
  }
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-x-4 items-center w-full">
        <div className="flex flex-1 flex-col">
          <Link to={`/journalpage/${id}`}>
            <p className="text-base md:text-lg font-semibold">
              {title} <span>{moods[mood]}</span>
            </p>
          </Link>
          <p className="text-xs md:text-sm">{date}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-x-4">
          <JournalModal
            mainLabel="edit"
            buttonLabel="Update"
            title={title}
            description={description}
            mood={mood}
            id={id}
          />
          <Trash onClick={deleteJournal} className="size-4 md:size-6" />
        </div>
      </div>
    </div>
  );
}

export default JournalCard