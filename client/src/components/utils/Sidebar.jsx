
import { Calendar } from "../ui/calendar";
import { useRecoilValue } from "recoil";
import { fetchTodosData } from "@/atoms/todos";
const Sidebar = () => {
  const {allTodosCount,completedTodosCount} = useRecoilValue(fetchTodosData);
  const date= new Date();
  return (
    <aside className="">
      <div>
        <div className="flex flex-col items-start">
          <div>
            <p>Tasks info</p>
            <div>
              <p>All Tasks - {allTodosCount}</p>
              <p>Completed Tasks - {completedTodosCount}</p>
            </div>
          </div>
          <div>
            <p>Journals - 10</p>
          </div>
        </div>
        <div>
          <Calendar className="bg-black-" mode="single" selected={date} />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar