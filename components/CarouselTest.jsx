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
const INITIAL_CYCLE = 3;

export default function CarouselTest({onBack}) {
    const {boards, setCurrentBoard} = useStore();
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

    const initialIndex = boards.length * INITIAL_CYCLE;

    const carouselRef = useRef(null);

    const triggerHapticFeedback = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        const targetIndex = initialIndex + cycles * boards.length + finalIndex;

        console.log(targetIndex, boardsLoop[targetIndex]);

        if (carouselRef.current) {
            carouselRef.current.scrollToIndex({
                index: targetIndex,
                animated: true,
            }, false);
        }

        translateY.value = withTiming(
            targetOffset,
            {
                duration,
                easing: Easing.out(Easing.cubic),
            },
            () => {
                translateY.value = initialOffset - finalIndex * ITEM_HEIGHT;
                runOnJS(setSelectedIndex)(finalIndex);
                runOnJS(setCurrentBoard)(finalIndex);
                runOnJS(triggerHapticFeedback)();
                selectedScale.value = withTiming(
                    1.1,
                    {duration: 500},
                    () => {
                        runOnJS(setAnimating)(false);
                    }
                );
            }
        );
    };

    const animatedCarouselStyle = useAnimatedStyle(() => ({
        transform: [{translateY: translateY.value}],
    }));

    const animatedScaleStyle = useAnimatedStyle(() => ({
        transform: [{scale: selectedScale.value}],
    }));


    return (
        <View style={[styles.container, {height: CARD_HEIGHT * VISIBLE_COUNT}]}>
            <View style={[styles.mask, {height: CARD_HEIGHT * VISIBLE_COUNT}]}>
                <PressableButton variant={"primary"} title={"Retour"} onPress={onBack}/>
                <Animated.FlatList
                    // style={[styles.carousel, animatedCarouselStyle]}
                    ref={carouselRef}
                    data={boardsLoop}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    onScrollToIndexFailed={(error) => console.log(error)}
                    renderItem={({item, index}) => {
                        const isCentral = index >= boards.length && index < boards.length * 2;
                        const isSelected = isCentral && selectedIndex !== null && index - boards.length === selectedIndex;

                        return isSelected ? (
                            <Animated.View
                                key={`${item.id}-${index}`}
                                style={[styles.item, animatedScaleStyle, styles.selectedItem]}
                            >
                                <BoardCard board={item}/>
                            </Animated.View>
                        ) : (
                            <View key={`${item.id}-${index}`} style={styles.item}>
                                <BoardCard board={item}/>
                            </View>
                        );
                    }}/>
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
    carousel: {
        borderWidth: 4
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
    },
});