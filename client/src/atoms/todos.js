import { atom,selector } from "recoil";
import axios from "axios";
export const todoState = atom({
    key: "todoState",
    default:[],
})

export const fetchTodoState = selector({
    key: "fetchTodoState",
    get: async ({ get }) => {
        try {
               const res = await axios.get("http://localhost:3001/v1/todos", {
                 withCredentials: true,
               });
            return res.data.todos;
        } catch (error) {
            console.error("Failed to fetch Todos");
            return [];
        }
    }
})