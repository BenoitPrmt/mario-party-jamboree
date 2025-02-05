import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const usePreloadSounds = (soundFiles) => {
    const [sounds, setSounds] = useState({});

    useEffect(() => {
        let isMounted = true;

        const loadSounds = async () => {
            const loadedSounds = {};
            for (const key in soundFiles) {
                const { sound } = await Audio.Sound.createAsync(soundFiles[key], { shouldPlay: false });
                loadedSounds[key] = sound;
            }
            if (isMounted) setSounds(loadedSounds);
        };

        loadSounds();

        return () => {
            isMounted = false;
            Object.values(sounds).forEach((sound) => sound?.unloadAsync());
        };
    }, []);

    return sounds;
};

export default usePreloadSounds;
