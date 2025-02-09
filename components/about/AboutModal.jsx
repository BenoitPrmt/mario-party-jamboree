import React from "react";
import {Modal, View, Text, StyleSheet, TouchableOpacity, Linking} from "react-native";
import PressableButton from "../button/PressableButton";
import LinkedInIcon from "../icons/LinkedInIcon";
import GitHubIcon from "../icons/GitHubIcon";
import GlobeIcon from "../icons/GlobeIcon";

const AboutModal = ({visible, onClose}) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>⚡️À propos</Text>

                    <Text style={styles.sectionTitle}>✨ L'application</Text>
                    <Text style={styles.text}>
                        Cette application a pour but de choisir aléatoirement un plateau de jeu sur <Text style={styles.bold}>Super Mario Party
                        Jamboree</Text>.
                    </Text>

                    <Text style={styles.sectionTitle}>👨‍💻 Le développeur</Text>
                    <Text style={styles.text}>
                        Je m'appelle <Text style={styles.bold}>Benoît Parmentier</Text>. Je suis un développeur
                        passionné par la création d'applications mobiles et de sites web.
                    </Text>

                    <Text style={styles.sectionTitle}>☎️ Me contacter</Text>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => Linking.openURL("mailto:hello@benoit.fun")}>
                            <Text style={[styles.link, styles.text]}>hello@benoit.fun</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => Linking.openURL("https://benoit.fun")}>
                            <Text style={[styles.link, styles.text]}>
                                <GlobeIcon />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL("https://www.linkedin.com/in/benoit-parmentier/")}>
                            <Text style={[styles.link, styles.text]}>
                                <LinkedInIcon />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/BenoitPrmt")}>
                            <Text style={[styles.link, styles.text]}>
                                <GitHubIcon />
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.sectionTitle}>📚 Autres projets</Text>
                    <TouchableOpacity onPress={() => Linking.openURL("https://viteuneplace.fr")}>
                        <Text style={[styles.link, styles.text]}>🚗 viteuneplace.fr - Parkings à Orléans</Text>
                    </TouchableOpacity>

                    <PressableButton variant={"primary"} title={"Fermer"} onPress={onClose} sound={"secondary"}/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: "85%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "ShinGoPro-Bold",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        fontFamily: "ShinGoPro-Bold",
    },
    text: {
        fontSize: 14,
        marginVertical: 5,
        lineHeight: 22,
        fontFamily: "ShinGoPro-Light",
    },
    bold: {
        fontWeight: "bold",
        fontFamily: "ShinGoPro-DeBold",
    },
    link: {
        color: "#007AFF",
        textDecorationLine: "underline",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
});

export default AboutModal;