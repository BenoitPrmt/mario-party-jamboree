import { useEffect, useState } from 'react';
import {ImageBackground, StatusBar, StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import { useStore } from "./store/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen/build/index";
import { BlurView } from "expo-blur";
import CarouselTest from "./components/CarouselTest";
import MapsList from "./components/MapsList";
import PressableButton from "./components/PressableButton";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const { boards, currentBoard, getRandom } = useStore();
    const [showRandomSelection, setShowRandomSelection] = useState(false);
    const [showMapsList, setShowMapsList] = useState(false);

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
        <View style={[styles.container]}>
            <ImageBackground source={currentBoard.boardView} resizeMode="cover" style={styles.image}>
                <BlurView intensity={40} tint="light" style={styles.blurContainer}>
                    <StatusBar style="auto" />
                    {showMapsList ? (
                        <MapsList onBack={() => setShowMapsList(false)} />
                    ) : (
                        showRandomSelection ? (
                            <CarouselTest onBack={() => setShowMapsList(false)} />
                        ) : (
                            <>
                                <Image source={currentBoard.boardIcon} style={styles.tinyLogo}/>
                                <PressableButton variant={"secondary"} title={"Choisir une carte"} onPress={() => setShowRandomSelection(true)} />
                                <PressableButton variant={"primary"} title={"Voir les cartes"} onPress={() => setShowMapsList(true)} />
                            </>
                        )
                    )}
                </BlurView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        padding: 30,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        flexWrap: 'wrap',
        ...StyleSheet.absoluteFill,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "ShinGoPro-Bold"
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});