import { SquarePen } from "lucide-react";

const JournalCard = ({date,title,mood}) => {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <p className="text-lg font-semibold">{title}</p>
        <p>{date}</p>
        <div className="flex items-center"><SquarePen size={18}/></div>
      </div>
      <div>
        <p>{mood}</p>
      </div>
    </div>
  );
}

export default JournalCard