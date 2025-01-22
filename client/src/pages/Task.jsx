
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskCard from "@/components/cards/TaskCard";
import Modal from "@/components/utils/Modal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "@/atoms/todos";
import axios from "axios";

const Task = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  useEffect(() => {
    fetchTodos();
  }, [])
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3001/v1/todos", {
      withCredentials: true,
    });
    setTodos(res.data.todos);
  }
  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-cyan-700">
          Let's see what Todo's you've got
        </h1>
        <div>
        <Modal mainLabel="Create Todo" buttonLabel="Add"/>
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
                  {todos && todos.map((todo) => {
                    return <TaskCard key={todo.id} title={todo.title} description={todo.description} priority={todo.priority} date={todo.createdAt}/>
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
              <AccordionContent></AccordionContent>
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
                Yes. It adheres to the WAI-ARIA design pattern.
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