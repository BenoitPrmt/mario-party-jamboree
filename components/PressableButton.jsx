import {StyleSheet, Text, TouchableOpacity} from "react-native";

const PressableButton = ({ variant, onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles[variant]]}>
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

export default PressableButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        padding: 10
    },
    primary: {
        backgroundColor: '#e2b325',
        display: 'inline-block',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: '19px',
        boxShadow: '0 0 0 2px #e2b325, inset 0 0 0 1px #ffe688'
    },
    buttonTitle: {
        fontWeight: 800,
        color: 'white',
    }
});
