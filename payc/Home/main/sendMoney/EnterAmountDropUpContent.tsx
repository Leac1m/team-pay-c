// payc/Home/DropUps/EnterAmountDropUpContent.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { nairaGlobe } from '@/payc/constants/images';

interface EnterAmountDropUpContentProps {
    onSendConfirm: (amount: string) => void;  // Called when user taps "Send Money"
}

const EnterAmountDropUpContent = ({ onSendConfirm }: EnterAmountDropUpContentProps) => {
    const [amount, setAmount] = useState('0'); // string to easily append/remove digits

    // Format amount with commas and .00
    const formattedAmount = Number(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const handleKeyPress = (key: string) => {
        if (key === 'back') {
            // Remove last digit
            setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
        } else {
            // Append digit (prevent leading zeros after first)
            setAmount((prev) => (prev === '0' ? key : prev + key));
        }
    };

    const handleSend = () => {
        if (amount === '0') return; // prevent sending zero
        console.log('Confirming send amount:', amount);
        onSendConfirm(amount);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <View style={styles.avatarContainer}>
                    <Image source={nairaGlobe} style={styles.avatar} resizeMode="contain" />
                </View>

                <Text style={styles.title}>Enter amount</Text>
                <Text style={styles.recipientName}>John Doe</Text>
                <Text style={styles.recipientId}>PayC Id - @johndoe</Text>

                <Text style={styles.amountDisplay}>₦{formattedAmount}</Text>
            </View>

            <View style={styles.keypadContainer}>
                <View style={styles.keypadRow}>
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={styles.keyButton}
                            activeOpacity={0.7}
                            onPress={() => handleKeyPress(num.toString())}
                        >
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.keypadRow}>
                    {[4, 5, 6].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={styles.keyButton}
                            activeOpacity={0.7}
                            onPress={() => handleKeyPress(num.toString())}
                        >
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.keypadRow}>
                    {[7, 8, 9].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={styles.keyButton}
                            activeOpacity={0.7}
                            onPress={() => handleKeyPress(num.toString())}
                        >
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.keypadRow}>
                    <View style={styles.placeholderKey} />

                    <TouchableOpacity
                        style={styles.keyButton}
                        activeOpacity={0.7}
                        onPress={() => handleKeyPress('0')}
                    >
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.keyButton}
                        activeOpacity={0.7}
                        onPress={() => handleKeyPress('back')}
                    >
                        <ArrowLeft size={28} color="white" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.sendButton}
                    activeOpacity={0.8}
                    onPress={handleSend}
                >
                    <Text style={styles.sendButtonText}>Send Money</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EnterAmountDropUpContent;

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerSection: { alignItems: 'center', marginTop: 12 },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom: 8,
    },
    avatar: { width: '100%', height: '100%' },
    title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    recipientName: { fontSize: 18, fontWeight: '600', color: 'white', marginTop: 8 },
    recipientId: { fontSize: 14, fontWeight: '600', color: '#3B82F6', marginTop: 4 },
    amountDisplay: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#22C55E',
        marginTop: 12,
        width: '100%',
        textAlign: 'center',
    },

    keypadContainer: { marginTop: 32, paddingBottom: 48, gap: 16 },
    keypadRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16 },
    keyButton: {
        flex: 1,
        height: 48,
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: { color: 'white', fontSize: 24, fontWeight: '800' },
    placeholderKey: { flex: 1 },
    sendButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    sendButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
});