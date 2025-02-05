import { create } from "zustand";
import { Audio } from "expo-av";
import { BOARD_LIST } from "../constants/boards";
import { selectRandom } from "../utils/selectRandom";
import { SOUND_FILES } from "../constants/sounds";

export const useStore = create((set, get) => ({
    boards: BOARD_LIST,
    currentBoard: null,
    getRandom: () => set((state) => ({ currentBoard: selectRandom(state.boards) })),
    setCurrentBoard: (index) => set((state) => ({ currentBoard: state.boards[index] })),

    sounds: {},
    preloadSounds: async () => {
        const loadedSounds = {};
        for (const key in SOUND_FILES) {
            const { sound } = await Audio.Sound.createAsync(SOUND_FILES[key], { shouldPlay: false });
            loadedSounds[key] = sound;
        }
        set({ sounds: loadedSounds });
    },
    playSound: async (key) => {
        const sound = get().sounds[key];
        if (sound) {
            await sound.replayAsync();
        }
    },
}));
