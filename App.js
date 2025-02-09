import {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {useStore} from "./store/store";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen/build/index";
import {BlurView} from "expo-blur";
import CarouselRandom from "./components/carousel/CarouselRandom";
import BoardsList from "./components/board/BoardsList";
import PressableButton from "./components/button/PressableButton";
import {LinearGradient} from 'expo-linear-gradient';
import {AppLoading} from "./components/AppLoading";
import {AnimatedBackground} from './components/AnimatedBackground';
import AboutModal from "./components/about/AboutModal";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const {currentBoard, playSound, preloadSounds, playBackgroundMusic} = useStore();
    const [showRandomSelection, setShowRandomSelection] = useState(false);
    const [showMapsList, setShowMapsList] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);

    useEffect(() => {
        preloadSounds().then(() => {
            playSound('open');
            playBackgroundMusic();
        });
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
        <AppLoading>
            <View style={[styles.container]}>
                <LinearGradient
                    colors={['#da0e51', '#fa4f79', '#fb6086', '#f6a0b5']}
                    style={styles.background}
                />
                <AnimatedBackground
                    source={showRandomSelection ? (currentBoard ? currentBoard.boardView : null) : null}
                    style={styles.image}
                >
                    <BlurView intensity={40} tint="light" style={styles.blurContainer}
                              experimentalBlurMethod="dimezisBlurView">
                        <StatusBar style="auto"/>
                        {showMapsList ? (
                            <BoardsList onBack={() => setShowMapsList(false)}/>
                        ) : (

                            <View style={{
                                width: '100%',
                                height: '95%'
                            }}>
                                {!showRandomSelection &&
                                    <View style={{height: Dimensions.get('window').height / 4 }}/>}

                                <View style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    {!showRandomSelection && (
                                        <Image source={require('./assets/game-logo.png')}
                                               style={styles.tinyLogo}
                                        />
                                    )}
                                    <View style={{marginTop: 20, width: '100%'}}>
                                        <CarouselRandom setIsAnimated={setShowRandomSelection}
                                                        isDisplayed={showRandomSelection}/>
                                        {!showRandomSelection && (
                                            <PressableButton
                                                variant={"secondary"}
                                                title={"Voir les cartes"}
                                                onPress={() => setShowMapsList(true)}
                                            />
                                        )}
                                    </View>
                                </View>

                                {!showRandomSelection && (
                                    <View style={{
                                        flex: 1,
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        width: '100%'
                                    }}>

                                        <TouchableOpacity onPress={() => setShowAboutModal(true)} style={{
                                            padding: 10,
                                            borderRadius: 5,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontFamily: 'ShinGoPro-Bold',
                                                fontSize: 18,
                                                marginTop: 20
                                            }}>À propos</Text>
                                        </TouchableOpacity>

                                        <AboutModal visible={showAboutModal} onClose={() => setShowAboutModal(false)}/>
                                    </View>
                                )}
                            </View>
                        )}
                    </BlurView>
                </AnimatedBackground>
            </View>
        </AppLoading>
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
    },
    image: {
        height: '100%',
        width: '100%',
    },
    tinyLogo: {
        height: 150,
        width: 186,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get("window").height,
    },
});