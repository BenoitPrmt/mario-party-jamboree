import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import { BlurView } from "expo-blur";
import Animated, { FadeIn } from 'react-native-reanimated';

const BoardCard = ({ board }) => {
    return (
        <Animated.View
            style={styles.card}
            entering={FadeIn.duration(300)}
        >
            <Image
                source={board.boardView}
                style={styles.cardImage}
                resizeMode="cover"
            />

            <ImageBackground source={board.boardView} resizeMode="cover" style={styles.image}>
                <BlurView intensity={100} tint="light" style={styles.blurContainer}
                          experimentalBlurMethod="dimezisBlurView">
                    <View style={styles.cardContainer}>
                        <View style={styles.row}>
                            <Image source={board.boardIcon} alt={board.name} style={styles.tinyLogo}/>
                            <Text style={styles.cardTitle}>{board.name}</Text>
                        </View>

                        <Text style={styles.description}>{board.description}</Text>
                    </View>
                </BlurView>
            </ImageBackground>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    blurContainer: {
        height: 100,
    },
    cardContainer: {
        padding: 10,
        height: '100%',
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    tinyLogo: {
        height: 20,
        width: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "ShinGoPro-Bold",
    },
    description: {
        fontFamily: "ShinGoPro-Light",
    },
});

export default React.memo(BoardCard);