import React, {useEffect, useRef, useState} from "react";
import { StyleSheet, View } from "react-native";
import { useStore } from "../store/store";
import BoardCard from "./board/BoardCard";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import PressableButton from "./PressableButton";
import * as Haptics from 'expo-haptics';
import { Audio} from "expo-av";

const CARD_HEIGHT = 300;
const ITEM_MARGIN = 10;
const ITEM_HEIGHT = CARD_HEIGHT + ITEM_MARGIN * 2;
const VISIBLE_COUNT = 2;

export default function CarouselTest({ onBack }) {
    const { boards, setCurrentBoard } = useStore();
    const [animating, setAnimating] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const translateY = useSharedValue(0);

    const selectedScale = useSharedValue(1);
    const lastHapticIndex = useRef(null);

    const [sound, setSound] = useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/success.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    useAnimatedReaction(
        () => {
            return Math.floor(-translateY.value / ITEM_HEIGHT) % boards.length;
        },
        (currentIndex, previousIndex) => {
            if (currentIndex !== previousIndex && currentIndex !== lastHapticIndex.current) {
                lastHapticIndex.current = currentIndex;
                runOnJS(triggerHapticFeedback)();
            }
        }
    );

    const startAnimation = () => {
        if (animating) return;
        setAnimating(true);
        setSelectedIndex(null);
        selectedScale.value = 1;

        const finalIndex = Math.floor(Math.random() * boards.length);
        const duration = 2500 + Math.floor(Math.random() * 1000);
        const cycles = 3;
        const targetOffset = -((cycles * boards.length + finalIndex) * ITEM_HEIGHT);

        translateY.value = withTiming(
            targetOffset,
            {
                duration,
                easing: Easing.out(Easing.back(1)),
            },
            () => {
                translateY.value = -(finalIndex * ITEM_HEIGHT);
                runOnJS(setSelectedIndex)(finalIndex);
                runOnJS(setCurrentBoard)(finalIndex);
                runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
                runOnJS(playSound)();
                selectedScale.value = withTiming(
                    1.1,
                    { duration: 500 },
                    () => {
                        runOnJS(setAnimating)(false);
                    }
                );
            }
        );
    };

    const animatedCarouselStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value % (boards.length * ITEM_HEIGHT) }],
    }));

    return (
        <View style={[styles.container]}>
            <View style={styles.mask}>
                <Animated.View style={[styles.carousel, animatedCarouselStyle]}>
                    {boards.map((board, index) => (
                        <View key={board.id} style={selectedIndex === index ? [styles.item, styles.selectedItem] : styles.item}>
                            <BoardCard board={board} />
                        </View>
                    ))}
                </Animated.View>
            </View>

            <View style={{ opacity: animating ? 0 : 1, marginTop: 10 }}>
                <PressableButton onPress={startAnimation} variant={"secondary"} title="Choisir une carte" />
                <PressableButton variant={"primary"} title={"Retour"} onPress={onBack} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    mask: {
        overflow: "hidden",
        borderRadius: 10,
        height: CARD_HEIGHT * VISIBLE_COUNT,
    },
    carousel: {},
    item: {
        height: CARD_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    selectedItem: {
        borderColor: "#f9ed0a",
        borderWidth: 4,
        borderRadius: 10,
        overflow: "hidden",
        zIndex: 999,
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
});
