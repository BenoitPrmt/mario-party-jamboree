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

const CARD_HEIGHT = 300;
const ITEM_MARGIN = 10;
const ITEM_HEIGHT = CARD_HEIGHT + ITEM_MARGIN * 2;
const VISIBLE_COUNT = 2;

export default function CarouselRandom({ setIsAnimated }) {
    const { boards, currentBoard, setCurrentBoard, playSound } = useStore();
    const [animating, setAnimating] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const translateY = useSharedValue(0);

    const selectedScale = useSharedValue(1);
    const lastHapticIndex = useRef(null);

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    useEffect(() => {
        setIsAnimated(animating || (!animating && currentBoard != null));
    }, [animating]);

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
        let finalIndex;
        do {
            finalIndex = Math.floor(Math.random() * boards.length);
        } while (finalIndex === selectedIndex);

        setAnimating(true);
        setSelectedIndex(null);
        selectedScale.value = 1;

        const duration = 2500 + Math.floor(Math.random() * 1000);
        const cycles = 3;
        const targetOffset = -((cycles * boards.length + finalIndex) * ITEM_HEIGHT) + (ITEM_HEIGHT / 2);

        translateY.value = withTiming(
            targetOffset,
            {
                duration,
                easing: Easing.out(Easing.back(1)),
            },
            () => {
                translateY.value = -(finalIndex * ITEM_HEIGHT) + (ITEM_HEIGHT / 2);
                runOnJS(setSelectedIndex)(finalIndex);
                runOnJS(setCurrentBoard)(finalIndex);
                runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
                runOnJS(playSound)('success');
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

    const handleBackPress = () => {
        setCurrentBoard(null);
        setSelectedIndex(null);
        setAnimating(false);
        setIsAnimated(false);
    }

    return (
        <View style={[styles.container]}>
            {(animating || (!animating && currentBoard != null)) && (
                <View style={styles.mask}>
                    <Animated.View style={[styles.carousel, animatedCarouselStyle]}>
                        {boards.map((board, index) => (
                            <View key={board.id} style={selectedIndex === index ? [styles.item, styles.selectedItem] : styles.item}>
                                <BoardCard board={board} />
                            </View>
                        ))}
                    </Animated.View>
                </View>
            )}

            <View style={{ opacity: animating ? 0 : 1, marginTop: 10 }}>
                <PressableButton onPress={startAnimation} variant={"secondary"} title="Choisir une carte" />
                {currentBoard != null && <PressableButton variant={"primary"} title={"Retour"} onPress={handleBackPress} />}
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
