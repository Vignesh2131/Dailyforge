import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskCard from "@/components/cards/TaskCard";
import Modal from "@/components/utils/TodoModal";
import { fetchTodayTodos, fetchPreviousTodos, fetchYesterdayTodos, fetchCompletedTodos,fetchTodosData } from "@/atoms/todos";
import { useRecoilValue } from "recoil";


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
        <h1 className="text-3xl font-semibold text-cyan-700">
          Let's see what Todo's you've got
        </h1>
        <div>
          <Modal mainLabel="Create Todo" buttonLabel="Add" />
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full border-red-300 border-2 rounded-lg px-5"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">Today ({todaycount})</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                  {todayTodos.length == 0 && <p>Yay! You're done today!</p>}
                  {todayTodos &&
                    todayTodos.map((todo) => {
                      return (
                        <TaskCard
                          key={todo._id}
                          title={todo.title}
                          description={todo.description}
                          status={todo.status}
                          id={todo._id}
                        />
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full border-red-300 border-2 rounded-lg px-5"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">Yesterday ({yesterdayCount})</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                  {yesterdayTodos.length == 0 && <p>Left no crumbs and backlogs.</p>}
                  {yesterdayTodos &&
                    yesterdayTodos.map((todo) => {
                      return (
                        <TaskCard
                          key={todo._id}
                          title={todo.title}
                          description={todo.description}
                          status={todo.status}
                          id={todo._id}
                        />
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full border-red-300 border-2 rounded-lg px-5"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">Previous ({previousCount})</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                  {remainingTodos.length == 0 && <p>No todo's left!</p>}
                  {remainingTodos &&
                    remainingTodos.map((todo) => {
                      return (
                        <TaskCard
                          key={todo._id}
                          title={todo.title}
                          description={todo.description}
                          status={todo.status}
                          id={todo._id}
                        />
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full border-red-300 border-2 rounded-lg px-5"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">Completed ({completedTodosCount})</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                  {completedTodos.length == 0 && (
                    <p>
                      Looks like there's lot of work left.
                    </p>
                  )}
                  {completedTodos &&
                    completedTodos.map((todo) => {
                      return (
                        <TaskCard
                          key={todo._id}
                          title={todo.title}
                          description={todo.description}
                          status={todo.status}
                          id={todo._id}
                        />
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}



export default Task