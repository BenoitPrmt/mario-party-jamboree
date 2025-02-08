import { create } from "zustand";
import { Asset } from 'expo-asset';
import { Audio } from "expo-av";
import { BOARD_LIST } from "../constants/boards";
import { SOUND_FILES } from "../constants/sounds";

const preloadImages = async () => {
    const imageAssets = BOARD_LIST.reduce((acc, board) => {
        acc.push(Asset.fromModule(board.boardView));
        acc.push(Asset.fromModule(board.boardIcon));
        return acc;
    }, []);

    await Promise.all(imageAssets.map(asset => asset.downloadAsync()));
};

export const useStore = create((set, get) => ({
    boards: BOARD_LIST,
    currentBoard: null,
    isLoading: true,

    initialize: async () => {
        set({ isLoading: true });
        try {
            await Promise.all([
                preloadImages(),
                get().preloadSounds()
            ]);
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    sounds: {},
    preloadSounds: async () => {
        const loadedSounds = {};
        for (const key in SOUND_FILES) {
            const { sound } = await Audio.Sound.createAsync(
                SOUND_FILES[key],
                { shouldPlay: false }
            );
            loadedSounds[key] = sound;
        }
        set({ sounds: loadedSounds });
    },

    setCurrentBoard: (index) => set((state) => ({ currentBoard: state.boards[index] })),
    playSound: async (key) => {
        const sound = get().sounds[key];
        if (sound) {
            await sound.replayAsync();
        }
    },
}));