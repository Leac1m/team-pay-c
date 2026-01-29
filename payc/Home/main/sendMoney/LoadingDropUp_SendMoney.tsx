// payc/Home/DropUps/LoadingDropUp_SendMoney.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingDropUp_SendMoney = () => {
    return (
        <View style={styles.container}>
            <View style={styles.spinnerWrapper}>
                <View style={styles.spinnerContainer}>
                    <View style={styles.spinnerBase} />

                    <View style={styles.spinnerDotsContainer}>
                        {Array(7)
                            .fill('')
                            .map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.spinnerDotWrapper,
                                        {
                                            transform: [{ rotate: `${180 - index * 45}deg` }],
                                        },
                                    ]}
                                >
                                    <View style={styles.spinnerDot} />
                                </View>
                            ))}
                    </View>
                </View>
            </View>

            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>Hang on</Text>
                <Text style={styles.messageText}>Your transaction is being processed</Text>
            </View>
        </View>
    );
};

export default LoadingDropUp_SendMoney;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    spinnerWrapper: {
        paddingVertical: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerContainer: {
        height: 130,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerBase: {
        height: '85%',
        aspectRatio: 1,
        borderRadius: 999,
        backgroundColor: '#475569', // slate-700
    },
    spinnerDotsContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerDotWrapper: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    spinnerDot: {
        height: 32,
        width: 12,
        borderRadius: 999,
        backgroundColor: 'white',
    },
    messageContainer: {
        paddingBottom: 128,
    },
    messageText: {
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
    },
});