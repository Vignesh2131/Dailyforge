import { SquarePen,Trash } from "lucide-react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { allJournals } from "@/atoms/journals";
import { useRecoilValue, useSetRecoilState } from "recoil";
import JournalModal from "../utils/JournalModal";
const JournalCard = ({ date, title, mood, description, id }) => {
  const journals = useRecoilValue(allJournals)
  const navigate = useNavigate();
  const setNewJournals = useSetRecoilState(allJournals)
  const deleteJournal = async () => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/v1/deleteJournal?id=${id}`,
      {
        withCredentials: true,
      }
    );
    const updatedJournals = journals.filter((journal) => journal._id != id);
    setNewJournals(updatedJournals);
    navigate("/journals")
  }
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <div className="flex flex-col md:flex-row">
          <Link to={`/journalpage/${id}`}>
            <p className="text-base md:text-lg font-semibold">{title}</p>
          </Link>
          <p>{date}</p>
        </div>

        <div className="flex items-center gap-x-4">
          <JournalModal
            mainLabel="edit"
            buttonLabel="Update"
            title={title}
            description={description}
            mood={mood}
            id={id}
          />
          <Trash
            onClick={deleteJournal}
            size={18}
          />
        </div>
      </div>
      <div>
        <p>{mood}</p>
      </div>
    </div>
  );
}

export default JournalCard