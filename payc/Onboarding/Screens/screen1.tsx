// payc/Onboarding/Screens/screen1.tsx

import React, { useEffect, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
} from 'react-native';
import {payCLogo} from "@/payc/constants/images";

interface Screen1Props {
    onNext: () => void;
}

const Screen1 = ({ onNext }: Screen1Props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in animation (1.5 seconds)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            // After fade-in finishes, wait ~2.5 seconds then auto-advance
            const timer = setTimeout(() => {
                onNext();
            }, 1500);

            // Cleanup timer if component unmounts early
            return () => clearTimeout(timer);
        });

        // Cleanup animation if screen is left early
        return () => {
            fadeAnim.stopAnimation();
        };
    }, [fadeAnim, onNext]);

    return (
        <View style={styles.wrapper}>

            <TouchableOpacity style={styles.wrapper} onPress={onNext} activeOpacity={0.8}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={payCLogo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F172A', // match your app theme
    },
    logoContainer: {
        paddingBottom: 80,
    },
    logo: {
        height: 160,
        width: 160,
    },
    nextButton: {
        position: 'absolute',
        bottom: 60,
        backgroundColor: '#3B82F6',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    nextText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Screen1;