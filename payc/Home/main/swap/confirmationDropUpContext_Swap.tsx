// payc/Home/main/swap/ConfirmationDropUpContext_Swap.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    onConfirm: () => void;
}


const ConfirmationDropUpContext_Swap = ({ onConfirm }: Props) => {
    const swapDetails = {
        transactionFee: { value: 10, currency: 'NGN' },
        conversion: { from: 'SUI', to: 'USDC', amount: 1, rate: 4.9 },
    };

    const swapDetailsArray = [
        {
            label: 'Transaction Fee',
            value: `${swapDetails.transactionFee.currency} ${swapDetails.transactionFee.value.toFixed(2)}`,
        },
        {
            label: 'Conversion Rate',
            value: `${swapDetails.conversion.amount} ${swapDetails.conversion.from} = ${swapDetails.conversion.rate} ${swapDetails.conversion.to}`,
        },
        {
            label: 'Currency',
            value: `${swapDetails.conversion.to}`,
        },
        {
            label: 'You receive',
            value: `${swapDetails.conversion.amount * swapDetails.conversion.rate} ${swapDetails.conversion.to}`,
        },
    ];

    return (
        <View style={styles.container}>
            {/* Summary header */}
            <View style={styles.summaryHeader}>
                <Text style={styles.summaryLabel}>You are Converting</Text>
                <Text style={styles.summaryAmount}>200 Sui</Text>
                <Text style={styles.summaryReceive}>
                    and receiving {2.9} USDC
                </Text>
            </View>

            {/* Details card */}
            <View style={styles.detailsCard}>
                {swapDetailsArray.map((item, index) => (
                    <View key={index} style={styles.detailRow}>
                        <Text style={styles.detailLabel}>{item.label}</Text>
                        <Text style={styles.detailValue}>{item.value}</Text>
                    </View>
                ))}
            </View>

            {/* Confirm button */}
            <TouchableOpacity style={styles.confirmButton} activeOpacity={0.85} onPress={onConfirm}>
                <Text style={styles.confirmButtonText}>Confirm Swap</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 48,
    },

    summaryHeader: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 16,
    },
    summaryLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#D1D5DB',
    },
    summaryAmount: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        textTransform: 'uppercase',
        marginTop: 4,
    },
    summaryReceive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#D1D5DB',
        marginTop: 4,
    },

    detailsCard: {
        width: '100%',
        backgroundColor: '#234786',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 24,
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 11,
        color: '#D1D5DB',
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 11,
        fontWeight: '700',
        color: 'white',
    },

    confirmButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 16,
        marginTop: 56,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
});

export default ConfirmationDropUpContext_Swap;