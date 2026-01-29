// payc/Home/DropUps/SendMoneyDropUp.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Send, Smartphone, Wallet } from 'lucide-react-native';
import { router } from 'expo-router'; // Make sure this is imported if using Expo Router

const sendMoneyDropUpOptions = [
    {
        label: 'PayC ID',
        desc: 'Send money to a PayC user',
        icon: <Send size={28} color="white" />,
        onPress: () => {
            console.log('Navigating to PayC ID Send Page');
            router.push('/send'); // or '/(payc)/send' depending on your route
        },
    },
    {
        label: 'Airdrop a friend',
        desc: 'Send money wirelessly to another user',
        icon: <Smartphone size={28} color="white" />,
        onPress: () => {
            console.log('Navigating to Airdrop flow');
            router.push('/airdrop'); // or wherever your airdrop intro is
        },
    },
    {
        label: 'Onchain Transfer',
        desc: 'Send to a crypto wallet',
        icon: <Wallet size={28} color="white" />,
        onPress: () => {
            console.log('Onchain Transfer tapped — coming soon');
            // router.push('/onchain'); // or alert('Coming soon')
        },
    },
];

const SendMoneyDropUp = () => {
    return (
        <View>
            <Text style={styles.title}>Send Money</Text>

            <View style={styles.optionsContainer}>
                {sendMoneyDropUpOptions.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        activeOpacity={0.8}
                        onPress={item.onPress}          // ← FIXED: pass the function directly
                    >
                        <View style={styles.iconContainer}>{item.icon}</View>

                        <View style={styles.textContainer}>
                            <Text style={styles.optionLabel}>{item.label}</Text>
                            <Text style={styles.optionDesc}>{item.desc}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default SendMoneyDropUp;

const styles = StyleSheet.create({
    title: {
        marginTop: 32,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    optionsContainer: {
        marginTop: 32,
        gap: 16,
        paddingBottom: 48,
    },
    optionButton: {
        width: '100%',
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 16,
    },
    iconContainer: {
        paddingHorizontal: 8,
    },
    textContainer: {
        flex: 1,
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    optionDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
    },
});