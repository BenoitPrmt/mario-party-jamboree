import {create} from "zustand/react";
import {BOARD_LIST} from "../constants/boards";
import {selectRandom} from "../utils/selectRandom";

export const useStore = create((set) => ({
    boards: BOARD_LIST,
    currentBoard: null,
    getRandom: () => set(() => ({ currentBoard: selectRandom(BOARD_LIST) })),
}));