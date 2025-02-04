import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskCard from "@/components/cards/TaskCard";
const TodosAccordion = ({ label, description, value, todosCount, todos }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-b border-black rounded-sm px-3 md:px-5"
    >
      <AccordionItem value={value}>
        <AccordionTrigger className="text-base md:text-xl">
          {label} ({todosCount})
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-y-2 md:grid md:grid-cols-3 md:gap-3">
                      {todos.length == 0 && <p>{description}</p>}
            {todos &&
              todos.map((todo) => {
                return (
                  <TaskCard
                    key={todo._id}
                    title={todo.title}
                    description={todo.description}
                    status={todo.status}
                    id={todo._id}
                    priority={todo.priority}
                  />
                );
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TodosAccordion;
