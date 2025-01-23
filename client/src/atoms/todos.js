
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
        if(todoList==undefined) return []
        const filtered = todoList.filter((todo) => {
            const d = todo.createdAt.slice(0, 2);
            const parsed = parseInt(d);
            return parsed==todaydate && todo.status==false
        })
        return filtered
    }
})

export const fetchYesterdayTodos = selector({
    key: "fetchYesterdayTodos",
    get: ({ get }) => {
        const todos = get(todoState)
         if (todos==undefined) return [];
        const filtered = todos.filter((todo) => {
            const d = todo.createdAt.slice(0, 2);
            const parsed = parseInt(d);
            return parsed == todaydate - 1 && todo.status==false;
        })
        return filtered;
    }
})

export const fetchPreviousTodos = selector({
    key: "fetchPreviousTodos",
    get: ({ get }) => {
        const todos = get(todoState);
         if (todos==undefined) return [];
          const filtered = todos.filter((todo) => {
            const d = todo.createdAt.slice(0, 2);
            const parsed = parseInt(d);
            return parsed != todaydate && parsed!=todaydate-1 &&todo.status==false ;
          });
          return filtered;
    }
})


export const fetchCompletedTodos = selector({
    key: "fetchCompletedTasks",
    get: ({ get }) => {
        const todos = get(todoState)
         if (todos==undefined) return [];
        const completedTodos = todos.filter((todo) => {
            return todo.status==true;
        })
        return completedTodos
    }
})

export const fetchTodosData = selector({
  key: "fetchTodosData",
  get: ({ get }) => {
      const todos = get(todoState);
      const completedTodos = get(fetchCompletedTodos)
      const previousTodos = get(fetchPreviousTodos)
      const yesterdayTodos = get(fetchYesterdayTodos)
      const todayTodos = get(fetchTodayTodos)
      const allTodosCount = todos?todos.length:0;
      const todaycount = todayTodos?todayTodos.length:0;
      const completedTodosCount = completedTodos?completedTodos.length:0;
      const previousCount = previousTodos.length;
      const yesterdayCount = yesterdayTodos.length
    return {allTodosCount,completedTodosCount,previousCount,yesterdayCount,todaycount}
  },
});
