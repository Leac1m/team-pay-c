// payc/Home/main/sendMoney/TransactionSuccessPage.tsx

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { successHalfCheck} from "@/payc/constants/images";
import {router} from "expo-router";

interface Props {
    onClose?: () => void;
}

const AirdropSuccessPage = ({ onClose }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {onClose && (
                    <TouchableOpacity onPress={() => router.replace('/profile')} style={{ alignSelf: 'flex-start', padding: 16 }}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                )}
                <View style={styles.successBody}>
                    <Image
                        source={successHalfCheck}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.message}>
                        <Text style={styles.highlight}>Success!</Text>
                        You have successfully sent joshua tokens
                    </Text>

                </View>

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeText}>Close Wallet</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AirdropSuccessPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    content: { flex: 1, justifyContent: 'space-between' },
    backButton: { paddingTop: 16, paddingLeft: 16 },
    successBody: { alignItems: 'center', gap: 16 },
    walletIcon: { marginBottom: 16 },
    logo: {
        height: 160,
        width: 160,
    },
    message: {
        fontSize: 12,
        fontWeight: '600',
        color: 'grey',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '50%',
        lineHeight: 26
    },
    highlight: { fontWeight: 'bold', fontSize: 18, color: 'white', },
    closeButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 16,
        marginHorizontal: 24,
        marginBottom: 80,
        alignItems: 'center',
    },
    closeText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

});