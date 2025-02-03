import {Image, StyleSheet, Text, View} from "react-native";

const BoardCard = ({ board }) => {
    return (
        <View style={styles.card}>
            <Image source={board.boardView} alt={board.name} style={styles.cardImage}/>

            <View style={styles.cardContainer}>
                <View style={styles.row}>
                    <Image source={board.boardIcon} alt={board.name} style={styles.tinyLogo}/>
                    <Text style={styles.cardTitle}>{board.name}</Text>
                </View>

                <Text style={styles.description}>{board.description}</Text>
            </View>
        </View>
    );
};

export default BoardCard;

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        backgroundColor: 'white',
        margin: 10,
    },
    cardContainer: {
       padding: 10
    },
    cardImage: {
        overflow: 'hidden',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: 200,
        maxWidth: '100%'
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "ShinGoPro-Bold"
    },
    tinyLogo: {
        height: 20,
        width: 20
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    description: {
        fontFamily: "ShinGoPro-Light"
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 90,
        fontWeight: 800
    },
    button: {
        fontSize: 90,
        fontWeight: 800
    },
    smallButton: {
        fontSize: 20,
        fontWeight: 800,
        backgroundColor: 'blue',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'black'
    },
});