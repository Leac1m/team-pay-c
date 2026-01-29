// payc/Onboarding/Screens/screen3.tsx

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    Dimensions,
    Animated,
    PanResponder,
} from 'react-native';
import {blankBox,  payCards, payGlobe} from "@/payc/constants/images";


const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Screen3Props {
    onNext: () => void;
    onSignIn: () => void;
}

const slides = [
    {
        image: payGlobe,
        title: 'Send and Receive Crypto',
        text: 'Send and receive crypto assets easily with people',
    },
    {
        image: blankBox,
        title: 'Easily convert your Crypto to Cash',
        text: 'Swap to Crypto to cash in seconds',
    },
    {
        image: payCards,
        title: 'Make Contactless Crypto Payments',
        text: 'Easily airdrop crypto tokens to other people easily',
    },
];

const Screen3 = ({ onNext, onSignIn }: Screen3Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;

    // Animate to a specific slide index
    const goToSlide = (index: number) => {
        Animated.spring(translateX, {
            toValue: -index * SCREEN_WIDTH,
            useNativeDriver: true,
            friction: 10,
            tension: 40,
        }).start();
        setCurrentIndex(index);
    };

    // PanResponder for swipe gestures
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                // Allow dragging left/right
                translateX.setValue(-currentIndex * SCREEN_WIDTH + gestureState.dx);
            },
            onPanResponderRelease: (_, gestureState) => {
                const swipeThreshold = SCREEN_WIDTH * 0.25; // 25% of screen to trigger swipe

                if (gestureState.dx < -swipeThreshold && currentIndex < slides.length - 1) {
                    // Swipe left → next
                    goToSlide(currentIndex + 1);
                } else if (gestureState.dx > swipeThreshold && currentIndex > 0) {
                    // Swipe right → previous
                    goToSlide(currentIndex - 1);
                } else {
                    // Snap back to current slide
                    goToSlide(currentIndex);
                }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <View style={styles.relativeWrapper}>
                {/* Progress indicators */}
                <View style={styles.progressWrapper}>
                    <View style={styles.progressRow}>
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.progressBar,
                                    index === currentIndex ? styles.progressActive : styles.progressInactive,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Swipeable slides */}
                <Pressable
                    {...panResponder.panHandlers}
                    style={styles.sliderWrapper}
                    onPress={() => {
                        // Tap → next slide (or go to sign-in if last)
                        if (currentIndex < slides.length - 1) {
                            goToSlide(currentIndex + 1);
                        } else {
                            onSignIn(); // optional: auto sign in on last slide tap
                        }
                    }}
                >
                    <Animated.View
                        style={[
                            styles.slidesRow,
                            {
                                transform: [{ translateX }],
                            },
                        ]}
                    >
                        {slides.map((slide, index) => (
                            <View key={index} style={styles.slide}>
                                <Image
                                    source={slide.image}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                                <View style={styles.textBlock}>
                                    <Text style={styles.slideTitle}>{slide.title}</Text>
                                    <Text style={styles.slideText}>{slide.text}</Text>
                                </View>
                            </View>
                        ))}
                    </Animated.View>
                </Pressable>

                {/* Bottom sign-in options */}
                <View style={styles.bottomActions}>
                    <Pressable style={styles.primaryButton} onPress={onSignIn}>
                        <Text style={styles.primaryButtonText}>Continue with Google</Text>
                    </Pressable>

                    <Pressable style={styles.secondaryButton} onPress={onSignIn}>
                        <Text style={styles.secondaryButtonText}>Sign up with email address</Text>
                    </Pressable>

                    <Pressable onPress={onNext} style={styles.skipLink}>
                        <Text style={styles.skipText}>Skip for now</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    relativeWrapper: { flex: 1 },
    progressWrapper: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 16,
    },
    progressRow: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
    progressBar: {
        height: 3,
        width: '25%',
        borderRadius: 4,
    },
    progressActive: { backgroundColor: '#00D632' },
    progressInactive: { backgroundColor: '#4B5563' }, // darker gray for dark mode
    sliderWrapper: {
        flex: 1,
        marginTop: 16,
        overflow: 'hidden',
    },
    slidesRow: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 3,
    },
    slide: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: '80%',
        maxWidth: 360,
        height: 280,
    },
    textBlock: {
        width: '80%',
        marginTop: 32,
        alignItems: 'center',
    },
    slideTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    },
    slideText: {
        fontSize: 15,
        color: '#D1D5DB',
        marginTop: 12,
        textAlign: 'center',
        lineHeight: 22,
    },
    bottomActions: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    primaryButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#2563EB',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#2563EB',
        fontSize: 16,
        fontWeight: '600',
    },
    skipLink: {
        marginTop: 20,
    },
    skipText: {
        color: '#94A3B8',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Screen3;