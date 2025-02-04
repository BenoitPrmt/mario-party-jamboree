import {create} from "zustand/react";
import {BOARD_LIST} from "../constants/boards";
import {selectRandom} from "../utils/selectRandom";

export const useStore = create((set) => ({
    boards: BOARD_LIST,
    currentBoard: null,
    getRandom: () => set((state) => ({ currentBoard: selectRandom(state.boards) })),
    setCurrentBoard: (index) => set((state) => ({ currentBoard: state.boards[index] })),
}));