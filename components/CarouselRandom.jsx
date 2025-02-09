import React, { useEffect, useRef, useState } from "react";
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
const BUFFER_MULTIPLIER = 3;

export default function CarouselRandom({ setIsAnimated, isDisplayed }) {
    const { boards, currentBoard, setCurrentBoard, playSound } = useStore();
    const [animating, setAnimating] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const translateY = useSharedValue(0);
    const selectedScale = useSharedValue(1);
    const lastHapticIndex = useRef(null);

    const bufferedBoards = Array(BUFFER_MULTIPLIER).fill(boards).flat();
    const middleSetIndex = Math.floor(BUFFER_MULTIPLIER / 2) * boards.length;

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
                // runOnJS(playSound)('tick');
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

        translateY.value = -(middleSetIndex * ITEM_HEIGHT);

        const duration = 2500 + Math.floor(Math.random() * 1000);
        const cycles = 2;
        const targetOffset = -((middleSetIndex + cycles * boards.length + finalIndex) * ITEM_HEIGHT) + ITEM_HEIGHT / 2;

        translateY.value = withTiming(
            targetOffset,
            {
                duration,
                easing: Easing.out(Easing.back(1)),
            },
            () => {
                runOnJS(setSelectedIndex)(finalIndex);
                runOnJS(setCurrentBoard)(finalIndex);
                runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
                runOnJS(playSound)('success');
                runOnJS(playSound)('particules');
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

    const animatedCarouselStyle = useAnimatedStyle(() => {
        const wrappedTranslateY = translateY.value % (boards.length * ITEM_HEIGHT);
        return {
            transform: [{ translateY: wrappedTranslateY }],
        };
    });

    const buttonsOpacity = useSharedValue(0);

    useEffect(() => {
        if (!animating) {
            buttonsOpacity.value = withTiming(1, { duration: 300 });
        } else {
            buttonsOpacity.value = withTiming(0, { duration: 300 });
        }
    }, [animating]);

    const animatedButtonsStyle = useAnimatedStyle(() => ({
        opacity: buttonsOpacity.value,
    }));

    const handleBackPress = () => {
        setCurrentBoard(null);
        setSelectedIndex(null);
        setAnimating(false);
        setIsAnimated(false);
    };

    return (
        <View style={styles.container}>
            {(animating || (!animating && currentBoard != null)) && (
                <View style={styles.mask}>
                    <Animated.View style={[styles.carousel, animatedCarouselStyle]}>
                        {bufferedBoards.map((board, index) => (
                            <View
                                key={`${board.id}-${index}`}
                                style={
                                    selectedIndex === index % boards.length
                                        ? [styles.item, styles.selectedItem]
                                        : styles.item
                                }
                            >
                                <BoardCard board={board} />
                            </View>
                        ))}
                    </Animated.View>
                </View>
            )}

            <Animated.View style={[{ marginTop: 10, opacity: 0}, animatedButtonsStyle]}>
                <PressableButton onPress={startAnimation} variant={"secondary"} title="Choisir une carte" />
                {isDisplayed && (
                    <PressableButton variant={"primary"} title={"Retour"} onPress={handleBackPress} sound={"secondary"} style={{ opacity: currentBoard != null ? 1 : 0 }} />
                )}
                </Animated.View>
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
    carousel: {
        position: 'relative',
    },
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
    }
});