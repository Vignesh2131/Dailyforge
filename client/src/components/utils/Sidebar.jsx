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
      <div className="w-full mx-auto">
        <div className="h-full flex flex-col mb-4">
          <div>
            <p className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-100 mb-4">
              Progress
            </p>
            <div className="font-thin">
              <p className="text-lg">
                All Todos - {allTodosCount}
              </p>
              <p className="text-lg">
                Completed Todos - {completedTodosCount}
              </p>
            </div>
          </div>
          <div className="font-thin">
            <p className="text-lg">Journals - {journalCount}</p>
          </div>
        </div>
        <div className="w-full  border-2 border-yellow-300 px-3 py-2 rounded-md">
          <DayPicker
            classNames={{
              today: "text-yellow-400 font-bold",
              month_caption:
                "font-semibold text-center font-semibold",
            }}
            hideNavigation
            selected={date}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
