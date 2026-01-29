// payc/Home/DropUps/AddMoneyDropUp.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BadgeDollarSign, CreditCard, Bitcoin, Smartphone, Send, Wallet } from 'lucide-react-native';

const addMoneyDropUpOptions = [
    {
        label: 'Bank Transfer',
        desc: 'Receive money with your account number',
        icon: <BadgeDollarSign size={28} color="white" />,
    },
    {
        label: 'Card',
        desc: 'Fund wallet using a debit card',
        icon: <CreditCard size={28} color="white" />,
    },
    {
        label: 'Onchain Deposit',
        desc: 'Fund your wallet from a crypto wallet',
        icon: <Bitcoin size={28} color="white" />,
    },
];

const AddMoneyDropUp = () => {
    console.log('[AddMoneyDropUp] Component mounted / rendered');

    return (
        <View>
            <Text style={styles.title}>Add Money</Text>

            <View style={styles.optionsContainer}>
                {addMoneyDropUpOptions.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.optionButton} activeOpacity={0.8}>
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

export default AddMoneyDropUp;

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
        paddingHorizontal: 4,
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