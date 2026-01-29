// payc/Home/main/sendMoney/TransactionSuccessPage.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft, Wallet2 } from 'lucide-react-native';
import {router} from "expo-router";



const TransactionSuccessPage = ({amount} :{amount: string}) => {

    const handleCheckWallet = () => {
        router.replace('/profile')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.backButton}>
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.successBody}>
                    <Wallet2 size={180} color="#ffffff" style={styles.walletIcon} />

                    <Text style={styles.message}>
                        You have successfully sent{' '}
                        <Text style={styles.highlight}>NGN { amount }</Text> to{' '}
                        <Text style={styles.highlight}>John</Text>
                    </Text>
                </View>

                <TouchableOpacity onPress={handleCheckWallet} style={styles.checkButton}>
                    <Text style={styles.checkText}>Check Wallet</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TransactionSuccessPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    content: { flex: 1, justifyContent: 'space-between' },
    backButton: { paddingTop: 16, paddingLeft: 16 },
    successBody: { alignItems: 'center', gap: 16 },
    walletIcon: { marginBottom: 16 },
    message: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        width: '70%',
        lineHeight: 26,
    },
    highlight: { fontWeight: 'bold' },
    checkButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 16,
        marginHorizontal: 24,
        marginBottom: 80,
        alignItems: 'center',
    },
    checkText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
});