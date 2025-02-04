import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { useRecoilValue } from "recoil";
import { fetchTodosData } from "@/atoms/todos";
import { journalsData } from "@/atoms/journals";
import "react-calendar/dist/Calendar.css";
const Sidebar = () => {
  const { allTodosCount, completedTodosCount } = useRecoilValue(fetchTodosData);
  const journalCount = useRecoilValue(journalsData);
  const date = new Date();
  return (
    <aside className="w-full p-3">
      <div className="w-full">
        <div className="h-full flex flex-col">
          <div>
            <p className="text-center text-2xl font-bold">Progress</p>
            <div>
              <p className="text-lg font-semibold">
                All Todos - {allTodosCount}
              </p>
              <p className="text-lg font-semibold">
                Completed Todos - {completedTodosCount}
              </p>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Journals - {journalCount}</p>
          </div>
        </div>
        <div className="w-full">
          <DayPicker hideNavigation selected={date} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
