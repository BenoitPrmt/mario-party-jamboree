import React, { useState } from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Animated, { FadeInDown, FadeOutUp, useSharedValue, withSpring } from 'react-native-reanimated';
import { useStore } from "../store/store";
import BoardCard from "./board/BoardCard";
import PressableButton from "./PressableButton";

const MapsList = ({ onBack }) => {
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
        <ScrollView style={{ borderRadius: 10 }}>
            <PressableButton variant={"primary"} title={"Retour"} onPress={onBack} />
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
    backButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    backText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapsList;
