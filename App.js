import {Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BOARD_LIST} from "./constants/boards";
import BoardCard from "./components/board/BoardCard";
import {useStore} from "./store/store";
import PressableButton from "./components/PressableButton";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function App() {
    const { boards, currentBoard, getRandom } = useStore();

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            {currentBoard && <BoardCard board={currentBoard} key={currentBoard.name}/>}
            <PressableButton variant={'primary'} onPress={getRandom} title={'Carte aléatoire'} />
            <Text>Maps</Text>
            <ScrollView>
                {boards.map((board) => <BoardCard board={board} key={board.name}/>)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20,
        fontFamily: require("./assets/fonts/AOTFShinGoProMedium.otf")
    },
});
