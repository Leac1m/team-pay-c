// payc/Home/DropUps/BankTransferSuccessDropUpContent.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wallet2 } from 'lucide-react-native';
import {router} from "expo-router";

const handleCHeckWallet = () => {
    router.replace('/portfolio');
}
const BankTransferSuccessDropUpContent = ({amount} : { amount: string } ) => {
    return (
        <View>
            <View style={styles.successContainer}>
                <Wallet2 size={144} color="#ffffff" style={styles.successIcon} />

                <Text style={styles.successMessage}>
                    You have successfully deposited NGN { amount || '5000'}
                </Text>
            </View>

            <TouchableOpacity onPress={handleCHeckWallet} style={styles.checkButton} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Check Wallet</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BankTransferSuccessDropUpContent;

const styles = StyleSheet.create({
    successContainer: {
        marginTop: 16,
        alignItems: 'center',
        paddingBottom: 8,
    },
    successIcon: {
        marginTop: 32,
    },
    successMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingVertical: 32,
    },
    checkButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 14,
        marginBottom: 32,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});