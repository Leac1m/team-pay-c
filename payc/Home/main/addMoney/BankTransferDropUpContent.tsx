// payc/Home/DropUps/BankTransferDropUpContent.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Copy } from 'lucide-react-native';

const userBankDetails = {
    bankName: 'Providus',
    accountNumber: '1234567890',
    accountName: 'John Doe',
};

const bankDetails = [
    { label: 'Bank', content: userBankDetails.bankName },
    { label: 'Account Number', content: userBankDetails.accountNumber, copiable: true },
    { label: 'Account Name', content: userBankDetails.accountName },
];

const BankTransferDropUpContent = () => {
    return (
        <View>
            <Text style={styles.title}>Bank Transfer</Text>
            <Text style={styles.subtitle}>
                Use the details below to receive money into your TapPayWallet
            </Text>

            <View style={styles.detailsCard}>
                {bankDetails.map((item, index) => (
                    <View key={index} style={styles.detailRow}>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>{item.label}</Text>
                            <Text style={styles.detailValue}>{item.content}</Text>
                        </View>

                        {item.copiable && (
                            <TouchableOpacity style={styles.copyButton}>
                                <Copy size={20} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.confirmButton} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Confirm Transaction</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BankTransferDropUpContent;

const styles = StyleSheet.create({
    title: {
        marginTop: 32,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        marginTop: 8,
        color: '#D1D5DB',
        fontSize: 15,
        width: '90%',
    },
    detailsCard: {
        marginTop: 16,
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        overflow: 'hidden',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.15)',
    },
    detailTextContainer: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    detailValue: {
        fontSize: 14,
        color: 'white',
        marginTop: 2,
    },
    copyButton: {
        padding: 8,
    },
    confirmButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 14,
        marginTop: 32,
        marginBottom: 32,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});