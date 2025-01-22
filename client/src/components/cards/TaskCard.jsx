import { CircleCheckBig } from "lucide-react";

// eslint-disable-next-line react/prop-types
const TaskCard = ({ title, status, description}) => {
  return (
    <div className=" border-2 border-red-300 rounded-md shadow-xl px-4 py-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        {status ? <CircleCheckBig/> : (
          <input className="rounded-full" type="checkbox" name="status"  />
        )}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default TaskCard;
