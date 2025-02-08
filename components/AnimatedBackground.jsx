import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    runOnJS
} from 'react-native-reanimated';

export const AnimatedBackground = ({ source, children, style }) => {
    const [currentBackground, setCurrentBackground] = useState(source);
    const opacity = useSharedValue(source ? 1 : 0);

    useEffect(() => {
        if (source && source !== currentBackground) {
            setCurrentBackground(source);
            opacity.value = 0;
            opacity.value = withTiming(1, { duration: 800 });
        } else if (!source && currentBackground) {
            opacity.value = withTiming(0, { duration: 800 }, () => {
                runOnJS(setCurrentBackground)(null);
            });
        }
    }, [source]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <View style={[styles.container, style]}>
            {currentBackground && (
                <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                    <ImageBackground
                        source={currentBackground}
                        resizeMode="cover"
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
            )}
            <View style={StyleSheet.absoluteFill}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});
