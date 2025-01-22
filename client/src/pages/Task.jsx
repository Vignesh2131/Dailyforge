import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskCard from "@/components/cards/TaskCard";
import Modal from "@/components/utils/Modal";
import { fetchTodayTodos, fetchPreviousTodos, fetchYesterdayTodos } from "@/atoms/todos";
import { useRecoilValue } from "recoil";


const Task = () => {
  const todayTodos = useRecoilValue(fetchTodayTodos);
  const yesterdayTodos = useRecoilValue(fetchYesterdayTodos);
  const remainingTodos = useRecoilValue(fetchPreviousTodos);
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
              <AccordionTrigger className="text-xl">Today</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                  {todayTodos &&
                    todayTodos.map((todo) => {
                      return (
                        <TaskCard
                          key={todo._id}
                          title={todo.title}
                          description={todo.description}
                          status={todo.status}
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
              <AccordionTrigger>Yesterday</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                  {yesterdayTodos &&
                    yesterdayTodos.map((todo) => {
                      return (
                        <TaskCard
                          key={todo._id}
                          title={todo.title}
                          description={todo.description}
                          priority={todo.priority}
                          date={todo.createdAt}
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
              <AccordionTrigger>Previous</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-3">
                  {remainingTodos.length==0&&<p>No todo's left!</p>}
                  {remainingTodos &&
                  remainingTodos.map((todo) => {
                      return (
                        <TaskCard
                          key={todo._id}
                          title={todo.title}
                          description={todo.description}
                          priority={todo.priority}
                          date={todo.createdAt}
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
              <AccordionTrigger>Completed</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}



export default Task