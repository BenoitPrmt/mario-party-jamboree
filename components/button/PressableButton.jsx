import {StyleSheet, Text, TouchableOpacity} from "react-native";
import * as Haptics from 'expo-haptics';
import {useStore} from "../../store/store";

const PressableButton = ({ variant, onPress, title, sound = "primary", style = {} }) => {
    const { playSound } = useStore();

    const handlePress = () => {
        switch (sound) {
            case 'primary':
                playSound('buttonPrimary');
                break;
            case 'secondary':
                playSound('buttonSecondary');
                break;
            default:
                break;
        }
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.button, styles[variant], style]}>
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

export default PressableButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        marginVertical: 10,
        display: 'inline-block',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: '19px',
        alignItems: 'center',
        width: '100%',
    },
    primary: {
        backgroundColor: '#da0e51',
        boxShadow: '0 0 0 2px #da0e51, inset 0 0 0 1px #ff678c'
    },
    secondary: {
        backgroundColor: '#e2b325',
        boxShadow: '0 0 0 2px #e2b325, inset 0 0 0 1px #ffe688'
    },
    buttonTitle: {
        fontWeight: 800,
        fontSize: 18,
        color: 'white',
        fontFamily: "ShinGoPro-Bold"
    }
});
