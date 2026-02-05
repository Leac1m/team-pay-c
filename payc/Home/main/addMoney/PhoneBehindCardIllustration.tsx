// payc/Home/DropUps/PhoneBehindCardIllustration.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {cardBehindPhone} from "@/payc/constants/images";

const PhoneBehindCardIllustration = ({cardCheck} :{cardCheck: () => void}) => {
    cardCheck()
    return (
        <View>
            <View style={styles.illustrationContainer}>
                <Image
                    source={cardBehindPhone}
                    style={styles.cardImage}
                    resizeMode="contain"
                />
                <Text style={styles.instructionText}>
                    Place your card behind your phone
                </Text>
            </View>

            <TouchableOpacity style={styles.confirmButton} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Confirming Card</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PhoneBehindCardIllustration;

const styles = StyleSheet.create({
    illustrationContainer: {
        marginTop: 16,
        alignItems: 'center',
        paddingBottom: 8,
    },
    cardImage: {
        width: 192,          // ≈ w-48
        height: undefined,
        aspectRatio: 400 / 600,
        marginLeft: 64,
        marginTop: 32,
    },
    instructionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingVertical: 32,
    },
    confirmButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 14,
        marginBottom: 32,
        alignItems: 'center',
    },
    buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});