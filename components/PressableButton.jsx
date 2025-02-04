import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {Audio} from "expo-av";

const PressableButton = ({ variant, onPress, title }) => {
    const [sound, setSound] = useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/button.mp3')
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

    const handlePress = () => {
        playSound();
        onPress();
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.button, styles[variant]]}>
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

export default PressableButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        margin: 10,
        display: 'inline-block',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: '19px',
        alignItems: 'center'
    },
    primary: {
        backgroundColor: '#e2b325',
        boxShadow: '0 0 0 2px #e2b325, inset 0 0 0 1px #ffe688'
    },
    secondary: {
        backgroundColor: '#da0e51',
        boxShadow: '0 0 0 2px #da0e51, inset 0 0 0 1px #ff678c'
    },
    buttonTitle: {
        fontWeight: 800,
        fontSize: 18,
        color: 'white',
        fontFamily: "ShinGoPro-Bold"
    }
});
