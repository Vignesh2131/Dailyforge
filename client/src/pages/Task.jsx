import Modal from "@/components/utils/TodoModal";
import { fetchTodayTodos, fetchPreviousTodos, fetchYesterdayTodos, fetchCompletedTodos,fetchTodosData } from "@/atoms/todos";
import { useRecoilValue } from "recoil";
import TodosAccordion from "@/components/utils/TodosAccordion";

const Task = () => {
  const todayTodos = useRecoilValue(fetchTodayTodos);
  const yesterdayTodos = useRecoilValue(fetchYesterdayTodos);
  const remainingTodos = useRecoilValue(fetchPreviousTodos);
  const completedTodos = useRecoilValue(fetchCompletedTodos);
  const {
    completedTodosCount,
    previousCount,
    yesterdayCount,
    todaycount,
  } = useRecoilValue(fetchTodosData);


  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-4xl font-bold text-primary">
          Your To-Dos, Ready to Go!
        </h1>
        <div>
          <Modal mainLabel="Create Todo" buttonLabel="Add" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 md:gap-y-5">
        <TodosAccordion
          label="Today"
          description="Start or end!"
          value="today-todos"
          todosCount={todaycount}
          todos={todayTodos}
        />
        <TodosAccordion
          label="Yesterday"
          description="No carryovers from yesterday. Fresh start!"
          value="yesterday-todos"
          todosCount={yesterdayCount}
          todos={yesterdayTodos}
        />
        <TodosAccordion
          label="Previous"
          description="All caught up! Nothing pending."
          value="previous-todos"
          todosCount={previousCount}
          todos={remainingTodos}
        />
        <TodosAccordion
          label="Completed"
          description="No tasks completed yet. Time to check some off!"
          value="completed-todos"
          todosCount={completedTodosCount}
          todos={completedTodos}
        />
      </div>
    </main>
  );
}



export default Task