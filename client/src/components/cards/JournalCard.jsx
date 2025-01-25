import { SquarePen } from "lucide-react";
import { Link } from "react-router";
const JournalCard = ({ date, title, mood, id }) => {
  console.log(id)
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <Link to={`/journalpage/${id}`}>
          <p className="text-lg font-semibold">{title}</p>
        </Link>
        <p>{date}</p>
        <div className="flex items-center">
          <SquarePen size={18} />
        </div>
      </div>
      <div>
        <p>{mood}</p>
      </div>
    </div>
  );
}

export default JournalCard