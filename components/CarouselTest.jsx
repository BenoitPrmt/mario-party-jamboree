import React, {useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useStore} from "../store/store";
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


const CARD_HEIGHT = 280;
const ITEM_MARGIN = 10;
const ITEM_HEIGHT = CARD_HEIGHT + ITEM_MARGIN * 2;
const VISIBLE_COUNT = 2;
const CENTER_OFFSET = (VISIBLE_COUNT * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2;

export default function CarouselTest() {
    const { boards, getRandom } = useStore();
    const [animating, setAnimating] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const boardsLoop = [
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
        ...boards,
    ];
    const cycleHeight = boards.length * ITEM_HEIGHT;
    const initialOffset = CENTER_OFFSET - boards.length * ITEM_HEIGHT;
    const translateY = useSharedValue(initialOffset);

    const selectedScale = useSharedValue(1);
    const lastHapticIndex = useRef(null);

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    useAnimatedReaction(
        () => {
            return Math.floor((initialOffset - translateY.value) / ITEM_HEIGHT);
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
        const targetOffset = initialOffset - (cycles * cycleHeight + finalIndex * ITEM_HEIGHT);

        translateY.value = withTiming(
            targetOffset,
            {
                duration,
                easing: Easing.out(Easing.cubic),
            },
            () => {
                translateY.value = initialOffset - finalIndex * ITEM_HEIGHT;
                runOnJS(setSelectedIndex)(finalIndex);
                runOnJS(getRandom)();
                runOnJS(triggerHapticFeedback)();
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
        transform: [{ translateY: translateY.value }],
    }));

    const animatedScaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: selectedScale.value }],
    }));

    return (
        <View style={[styles.container, { height: CARD_HEIGHT * VISIBLE_COUNT }]}>
            <View style={[styles.mask, { height: CARD_HEIGHT * VISIBLE_COUNT }]}>
                <Animated.View style={[styles.carousel, animatedCarouselStyle]}>
                    {boardsLoop.map((board, index) => {
                        const isCentral = index >= boards.length && index < boards.length * 2;
                        const isSelected = isCentral && selectedIndex !== null && index - boards.length === selectedIndex;

                        return isSelected ? (
                            <Animated.View
                                key={`${board.id}-${index}`}
                                style={[styles.item, animatedScaleStyle, styles.selectedItem]}
                            >
                                <BoardCard board={board} />
                            </Animated.View>
                        ) : (
                            <View key={`${board.id}-${index}`} style={styles.item}>
                                <BoardCard board={board} />
                            </View>
                        );
                    })}
                </Animated.View>
            </View>
            {!animating && (
                <PressableButton
                    onPress={startAnimation}
                    variant={"secondary"}
                    title="Choisir une carte"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    mask: {
        overflow: "visible",
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
});