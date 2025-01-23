import { CircleCheckBig } from "lucide-react";
import { useState } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const TaskCard = ({ title, status, description,id }) => {
  const [checked, setChecked] = useState(status);
  const uncheck = () => {
    setChecked(true)
    updatedTodo(id)
  }
  const updatedTodo = async (id) => {
    const res = await axios.patch(`http://localhost:3001/v1/updateTodo?id=${id}`, { "status": checked }, { withCredentials: true });
  }
  return (
    <div className=" border-2 border-red-300 rounded-md shadow-xl px-4 py-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        {status ? <CircleCheckBig/> : (
          <input className="rounded-full" type="checkbox" name="status"  onChange={uncheck} />
        )}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default TaskCard;
