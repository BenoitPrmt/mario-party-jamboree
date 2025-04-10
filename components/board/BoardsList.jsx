import React, { useState } from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import Animated, { FadeInDown, FadeOutUp, useSharedValue, withSpring } from 'react-native-reanimated';
import { useStore } from "../../store/store";
import BoardCard from "./BoardCard";
import PressableButton from "../button/PressableButton";

const BoardsList = ({ onBack }) => {
    const { boards } = useStore();
    const [selectedMap, setSelectedMap] = useState(null);
    const scale = useSharedValue(1);

    const handlePress = (board) => {
        setSelectedMap(board);
        scale.value = withSpring(1.1, { damping: 2 });
        setTimeout(() => {
            scale.value = withSpring(1);
        }, 200);
    };

    return (
        <View style={{ borderRadius: 10, paddingTop: 30 }}>
            <ScrollView style={{ borderRadius: 10 }} showsVerticalScrollIndicator={false}>
                {selectedMap ? (
                    <Animated.View style={[styles.container, { transform: [{ scale: scale.value }] }]}>
                        <BoardCard board={selectedMap} />
                    </Animated.View>
                ) : (
                    boards.map((board) => (
                            <Animated.View entering={FadeInDown} exiting={FadeOutUp} key={board.name} style={{ marginBottom: 20 }} onPress={() => handlePress(board)}>
                                <BoardCard board={board} onPress={() => handlePress(board)} scale={scale} />
                            </Animated.View>
                        ))
                )}
            </ScrollView>
            <View>
                <PressableButton variant={"secondary"} title={"Retour"} onPress={onBack} sound={"secondary"} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 150,
        marginBottom: 15,
        borderRadius: 10,
    },
});

export default BoardsList;
