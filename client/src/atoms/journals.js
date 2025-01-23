
import { atom, selector } from "recoil";

export const allJournals = atom({
    key: "allJournals",
    default:[]
})
    
export const journalsData = selector({
    key: "journalsData",
    get: ({ get }) => {
        const journals = get(allJournals);
        const count = journals ? journals.length : 0;
        return count;
    }
})