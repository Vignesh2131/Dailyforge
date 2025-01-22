import { atom,selector } from "recoil";


const date = new Date();
let todaydate = date.getDate();


export const todoState = atom({
    key: "todoState",
    default:[],
})

export const fetchTodayTodos = selector({
    key: "fetchTodayTodos",
    get: ({ get }) => {
        const todoList = get(todoState)

        const filtered = todoList.filter((todo) => {
            const d = todo.createdAt.slice(0, 2);
            const parsed = parseInt(d);
            return parsed==todaydate
        })
        return filtered
    }
})

export const fetchYesterdayTodos = selector({
    key: "fetchYesterdayTodos",
    get: ({ get }) => {
        const todos = get(todoState)
        const filtered = todos.filter((todo) => {
            const d = todo.createdAt.slice(0, 2);
            const parsed = parseInt(d);
            return parsed == todaydate - 1;
        })
        return filtered;
    }
})

export const fetchPreviousTodos = selector({
    key: "fetchPreviousTodos",
    get: ({ get }) => {
        const todos = get(todoState);
          const filtered = todos.filter((todo) => {
            const d = todo.createdAt.slice(0, 2);
            const parsed = parseInt(d);
            return parsed != todaydate && parsed!=todaydate-1 ;
          });
          return filtered;
    }
})

export const fetchTodosData = selector({
    key: "fetchTodosData",
    get: ({ get }) => {
        const todos = get(todoState)
        const allTodosCount = todos.length;
        return allTodosCount
    }
})