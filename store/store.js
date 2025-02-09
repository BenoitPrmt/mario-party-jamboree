import {create} from "zustand";
import {Asset} from "expo-asset";
import {Audio} from "expo-av";
import {BOARD_LIST} from "../constants/boards";
import {SOUND_FILES} from "../constants/sounds";

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
        set({isLoading: true});
        try {
            await Promise.all([preloadImages(), get().preloadSounds()]);
        } catch (error) {
            console.error("Erreur lors de l'initialisation:", error);
        } finally {
            set({isLoading: false});
        }
    },

    sounds: {},
    preloadSounds: async () => {
        const loadedSounds = {};
        for (const key in SOUND_FILES) {
            if (key === "tick") {
                const pool = [];
                for (let i = 0; i < 5; i++) {
                    const {sound} = await Audio.Sound.createAsync(
                        SOUND_FILES[key],
                        {shouldPlay: false}
                    );
                    pool.push(sound);
                }
                loadedSounds[key] = pool;
            } else {
                const {sound} = await Audio.Sound.createAsync(
                    SOUND_FILES[key],
                    {shouldPlay: false}
                );
                loadedSounds[key] = sound;
            }
        }
        set({sounds: loadedSounds});
    },

    setCurrentBoard: (index) =>
        set((state) => ({currentBoard: state.boards[index]})),

    playSound: async (key) => {
        if (key === "tick") {
            const tickPool = get().sounds["tick"];
            if (tickPool && tickPool.length > 0) {
                const tickSound = tickPool.shift();
                tickPool.push(tickSound);
                await tickSound.setPositionAsync(0);
                await tickSound.playAsync();
            }
        } else {
            const sound = get().sounds[key];
            if (sound) {
                await sound.setPositionAsync(0);
                await sound.playAsync();
            }
        }
    },

    playBackgroundMusic: async () => {
        const {sounds} = get();
        if (sounds["backgroundMusic"]) {
            await sounds["backgroundMusic"].setIsLoopingAsync(true);
            await sounds["backgroundMusic"].setVolumeAsync(0.2);
            await sounds["backgroundMusic"].playAsync();
            return;
        }
        const {sound} = await Audio.Sound.createAsync(
            SOUND_FILES["background"],
            {
                isLooping: true,
                volume: 0.1,
                shouldPlay: true,
            }
        );
        set((state) => ({
            sounds: {...state.sounds, backgroundMusic: sound},
        }));
    },
}));
