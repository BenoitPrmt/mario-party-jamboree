import React, { useEffect } from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import { useStore } from '../store/store';
import {LinearGradient} from "expo-linear-gradient";

export function AppLoading({ children }) {
    const { initialize, isLoading } = useStore();

    useEffect(() => {
        initialize();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#da0e51', '#fa4f79', '#fb6086', '#f6a0b5']}
                    style={styles.background}
                />
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return children;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get("window").height,
    },
});