import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
const Sidebar = () => {
  const date= new Date();
  console.log(date)
  return (
    <aside className="">
      <div>
        <div className="flex flex-col items-start">
          <div>
            <p>Tasks info</p>
            <div>
              <p>All Tasks - 20</p>
              <p>Completed Tasks - 9</p>
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