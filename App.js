import {useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import BoardCard from "./components/board/BoardCard";
import {useStore} from "./store/store";
import PressableButton from "./components/PressableButton";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen/build/index";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const { boards, currentBoard, getRandom } = useStore();

    useEffect(() => {
        getRandom()
    }, []);

    const [loaded, error] = useFonts({
        'ShinGoPro-Regular': require('./assets/fonts/AOTFShinGoProRegular.otf'),
        'ShinGoPro-ExLight': require('./assets/fonts/AOTFShinGoProExLight.otf'),
        'ShinGoPro-Light': require('./assets/fonts/AOTFShinGoProLight.otf'),
        'ShinGoPro-Medium': require('./assets/fonts/AOTFShinGoProMedium.otf'),
        'ShinGoPro-DeBold': require('./assets/fonts/AOTFShinGoProDeBold.otf'),
        'ShinGoPro-Bold': require('./assets/fonts/AOTFShinGoProBold.otf'),
        'SuperMario256': require('./assets/fonts/SuperMario256.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            {currentBoard && <BoardCard board={currentBoard} key={currentBoard.name}/>}
            <PressableButton variant={'secondary'} onPress={getRandom} title={'Carte aléatoire'} />
            <Text style={styles.title}>Maps</Text>
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
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "ShinGoPro-Bold"
    }
});
