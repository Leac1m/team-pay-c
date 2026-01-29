// payc/Onboarding/Screens/screen2.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { payGlobe } from '@/payc/constants/images';

interface Screen2Props {
    onNext: () => void;
}

const languages = [
    { lang: 'English', code: 'en-US' },
    { lang: 'Français', code: 'fr-FR' },
    { lang: 'Ghanaian', code: 'gh-GH' },
    { lang: 'Swahili', code: 'ke-KE' },
    { lang: 'Afrikaans ', code: 'sa-ZA' },
    { lang: 'Dutch', code: 'nl-NL' },
];

const Screen2 = ({ onNext }: Screen2Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.relativeWrapper}>
                <View style={styles.helpBadge}>
                    <Text style={styles.helpText}>Need help?</Text>
                </View>

                <View style={styles.header}>
                    <Text style={styles.title}>Choose your language</Text>
                    <Text style={styles.subtitle}>What is your preferred language?</Text>
                </View>

                <View style={styles.languageList}>
                    {languages.map((lang, index) => (
                        <Pressable
                            key={index}
                            onPress={onNext} // Selecting any language → next screen
                            style={styles.languageCard}
                        >
                            <Text style={styles.languageName}>{lang.lang}</Text>
                            <Text style={styles.languageDesc}>
                                Continue in {lang.lang.toLowerCase()}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Optional: skip button */}
                <Pressable onPress={onNext} style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip for now</Text>
                </Pressable>
            </View>
        </View>
    );
};


export default Screen2;



const styles = StyleSheet.create({
    container: {
        flex: 1, // w-screen h-screen
    },
    relativeWrapper: {
        flex: 1,
        position: "relative",
    },
    helpBadge: {
        position: "absolute",
        top: 24,        // top-6
        right: 40,      // right-10
        backgroundColor: "#ffffff",
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 8,
        zIndex: 10,
    },
    helpText: {
        fontSize: 12,
        color: "#000000",
    },
    header: {
        paddingTop: 120, // pt-30
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: 0.5,
        color: 'white',
    },
    subtitle: {
        fontWeight: "600",
        marginTop: 4,
        color: 'white',

    },
    languageList: {
        marginTop: 16,
        alignItems: "center",
    },
    languageCard: {
        width: "90%",
        backgroundColor: "#3B82F6",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginVertical: 10,
    },
    languageName: {
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 2,
        textTransform: "capitalize",
        color: "#ffffff",
    },
    languageDesc: {
        fontSize: 12,
        marginTop: 4,
        color: "#ffffff",
    },
    skipButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    skipText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '500',
    },
});
