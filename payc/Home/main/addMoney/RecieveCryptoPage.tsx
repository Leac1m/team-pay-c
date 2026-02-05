import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { ChevronDown, Copy, ArrowLeft } from 'lucide-react-native';
// import { Image } from 'expo-image';        // ← if using expo-image (recommended)
// or use built-in Image from react-native
import { Image } from 'react-native';
import {suiIcon} from "@/payc/constants/images";
import {router} from "expo-router";


const { width } = Dimensions.get('window');

function ReceiveCryptoPage() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header / Back */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <ArrowLeft onPress={()=> router.replace('/profile')} size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Receive Crypto</Text>

                {/* Token selector */}
                <View style={styles.section}>
                    <Text style={styles.label}>Token</Text>

                    <View style={styles.selector}>
                        <View style={styles.selectorRow}>
                            <View style={styles.tokenLeft}>
                                <Image
                                    source={suiIcon}
                                    style={styles.tokenIcon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.tokenName}>SUI</Text>
                            </View>

                            <ChevronDown size={16} color="white" />
                        </View>
                    </View>
                </View>

                {/* Network */}
                <View style={styles.section}>
                    <Text style={styles.label}>Network</Text>
                    {/* You can later replace with real dropdown / selector */}
                    <View style={[styles.selector, { paddingVertical: 14 }]}>
                        <TextInput
                            style={styles.networkInput}
                            placeholder="Select Network"
                            placeholderTextColor="#888"
                            editable={false} // placeholder for now
                        />
                    </View>
                </View>

                {/* Wallet Address + QR */}
                <View style={styles.section}>
                    <Text style={styles.label}>Wallet address</Text>

                    <View style={styles.addressRow}>
                        <Text style={styles.addressText} numberOfLines={2} ellipsizeMode="middle">
                            0x1cbdjlskdji2o3jd239dweewdeujd09322ew0923fewc023d0e434332323wejwio+cjoijwocw
                        </Text>

                        <TouchableOpacity style={styles.copyBtn}>
                            <Text style={styles.copyText}>Copy</Text>
                            <Copy size={14} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* QR area */}
                    <View style={styles.qrContainer}>
                        <View style={styles.qrPlaceholder} />

                        <Text style={styles.scanText}>Scan to send</Text>
                        <Text style={styles.hintText}>
                            Use this address to receive Sui in seconds
                        </Text>

                        <View style={styles.warning}>
                            <View style={styles.warningDot} />
                            <Text style={styles.warningText}>
                                Only use this account to receive Sui to avoid losing your account permanently
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Bottom buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.buttonText}>Save QR to Device</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.outlineButton}>
                        <Text style={styles.outlineButtonText}>Return to Home</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // or your dark theme color
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        marginTop: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        marginBottom: 24,
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
        marginBottom: 8,
    },
    selector: {
        backgroundColor: '#182C53',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    selectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tokenLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    tokenIcon: {
        width: 24,
        height: 24,
    },
    tokenName: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    networkInput: {
        color: 'white',
        fontSize: 16,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    addressText: {
        fontSize: 11,
        color: '#a3a3a3',
        fontWeight: '600',
        flex: 1,
        marginRight: 12,
        width: 70,
    },
    copyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2563eb', // your _payc-btn-color
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        gap: 4,
    },
    copyText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '700',
    },
    qrContainer: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    qrPlaceholder: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: '#444',
        marginVertical: 16,
        backgroundColor: '#222', // optional
    },
    scanText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    hintText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    warning: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        gap: 8,
    },
    warningDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ca8a04',
    },
    warningText: {
        color: '#1e40af', // your _payc-blue-text
        fontSize: 9,
        fontWeight: '700',
        flexShrink: 1,
    },
    buttonContainer: {
        marginTop: 24,
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#2563eb', // _payc-btn-color
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    outlineButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
});

export default ReceiveCryptoPage;