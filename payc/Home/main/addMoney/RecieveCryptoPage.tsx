import React, {useRef, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
    Alert,          // for iOS-style feedback (optional)
    Platform,
    ToastAndroid, Pressable, FlatList, Modal,   // for Android toast (optional)
} from 'react-native';

import * as Clipboard from 'expo-clipboard';
import {ChevronDown, Copy, ArrowLeft, ChevronUp} from 'lucide-react-native';
import { Image } from 'expo-image';        // ← if using expo-image (recommended)
// or use built-in Image from react-native
// import { Image } from 'react-native';
import {suiIcon} from "@/payc/constants/images";
import {router} from "expo-router";
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as url from "node:url";

const tokens = [
    {
        id: '1',
        name: 'SUI',
        symbol: 'SUI',
        icon: suiIcon,
    }
];

const networks = [
    {
        id: '1',
        name: 'Mainnet',
        description: 'Production - Real SUI',
        isActive: true, // you can use this later for highlighting
    },
    {
        id: '2',
        name: 'Testnet',
        description: 'Testing - Fake tokens',
    },
    {
        id: '3',
        name: 'Devnet',
        description: 'Development - Experimental',
    },
    // Add more if needed, e.g. future custom networks or sidechains
];

const TokenDropdown = () => {
    const [selectedToken, setSelectedToken] = useState(tokens[0]); // default to first
    const [modalVisible, setModalVisible] = useState(false);

    const renderItem = ({ item }: {item: {id: string, name: string, symbol: string, icon: any}}) => (
        <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
                setSelectedToken(item);
                setModalVisible(false);
            }}
        >
            <View style={styles.itemLeft}>
                <Image
                    source={item.icon}
                    style={styles.tokenIcon}
                    contentFit="contain"
                />
                <Text style={styles.tokenName}>{item.symbol}</Text>
            </View>
        </TouchableOpacity>
    );




        return (
        <>
            {/* The visible selector (what user sees when closed) */}
            <TouchableOpacity
                style={styles.selector}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
            >
                <View style={styles.selectorRow}>
                    <View style={styles.tokenLeft}>
                        <Image
                            source={selectedToken.icon}
                            style={styles.tokenIcon}
                            contentFit="contain"
                        />
                        <Text style={styles.tokenName}>{selectedToken.symbol}</Text>
                    </View>

                    {modalVisible ? (
                        <ChevronUp size={16} color="white" />
                    ) : (
                        <ChevronDown size={16} color="white" />
                    )}
                </View>
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        {/* Header (optional) */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Token</Text>
                        </View>

                        <FlatList
                            data={tokens}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            style={styles.list}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

const NetworkDropdown = () => {
    const [selectedNetwork, setSelectedNetwork] = useState(
        networks.length > 0 ? networks[0] : null
    );
    const [modalVisible, setModalVisible] = useState(false);

    const hasNetworks = networks.length > 0;

    const renderItem = ({ item } :{item : {id: string, name: string, description: string}}) => (
        <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
                setSelectedNetwork(item);
                setModalVisible(false);
                // Here you could later trigger: switch network in wallet / provider
            }}
        >
            <View style={styles.itemContent}>
                <Text style={styles.networkName}>{item.name}</Text>
                {item.description && (
                    <Text style={styles.networkDesc}>{item.description}</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            {/* The visible selector */}
            <TouchableOpacity
                style={[styles.selector, { paddingVertical: 14 }]}
                onPress={() => hasNetworks && setModalVisible(true)}
                activeOpacity={0.8}
                disabled={!hasNetworks}
            >
                <View style={styles.selectorRow}>
                    <Text
                        style={[
                            styles.networkInput,
                            !hasNetworks && { color: '#666' },
                        ]}
                    >
                        {hasNetworks
                            ? selectedNetwork?.name || 'Select Network'
                            : 'No networks available'}
                    </Text>

                    {hasNetworks && (
                        modalVisible ? (
                            <ChevronUp size={16} color="white" />
                        ) : (
                            <ChevronDown size={16} color="white" />
                        )
                    )}
                </View>
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Network</Text>
                        </View>

                        {hasNetworks ? (
                            <FlatList
                                data={networks}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                style={styles.list}
                            />
                        ) : (
                            <View style={styles.fallbackContainer}>
                                <Text style={styles.fallbackText}>
                                    No networks available
                                </Text>
                                <Text style={styles.fallbackSubText}>
                                    Please check your connection or wallet configuration
                                </Text>
                            </View>
                        )}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

const { width } = Dimensions.get('window');

function ReceiveCryptoPage() {

    const walletAddress = '0x1cbdjlskdji2o3jd239dweewdeujd09322ew0923fewc023d0e434332323wejwio+cjoijwocw';

    const qrRef = useRef(null);

    const [copyStatus, setCopyStatus] = useState(false); // to show "Copied!" feedback
    const [isSaving, setIsSaving] = useState(false);

    const handleCopy = async () => {
        try {
            await Clipboard.setStringAsync(walletAddress);

            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000); // revert after 2 seconds

            // Optional: show toast/alert
            if (Platform.OS === 'android') {
                ToastAndroid.show('Address copied!', ToastAndroid.SHORT);
            } else if (Platform.OS === 'ios') {
                Alert.alert('Copied', 'Wallet address copied to clipboard');
            }
        } catch (error) {
            console.error('Failed to copy:', error);
            Alert.alert('Error', 'Could not copy address');
        }
    };


    const saveQRToDevice = async () => {
        if (isSaving) return;
        setIsSaving(true);

        try {
            // 1. Request permission (required on iOS; Android usually auto-grants on save)
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission needed',
                    'Please allow access to your photo library to save the QR code.',
                    [{ text: 'OK' }]
                );
                return;
            }

            // 2. Capture the QR code view
            if (!qrRef.current) {
                throw new Error('QR view not ready');
            }

            const localUri = await captureRef(qrRef.current, {
                format: 'png',          // or 'jpg'
                quality: 1,             // 0–1
                width: 300,             // higher res if you want (original size × scale)
                height: 300,
                // You can add more options like pixelRatio if needed
            });

            // 3. Save to gallery
            await MediaLibrary.saveToLibraryAsync(localUri);

            Alert.alert('Success', 'QR code saved to your photos!');
        } catch (error) {
            console.error('Save failed:', error);
            Alert.alert('Error', 'Failed to save QR code. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

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

                    <TokenDropdown />

                </View>

                {/* Network */}
                <View style={styles.section}>
                    <Text style={styles.label}>Network</Text>
                    {/* You can later replace with real dropdown / selector */}
                    <NetworkDropdown />

                </View>

                {/* Wallet Address + QR */}
                <View>
                    <Text style={styles.label}>Wallet address</Text>

                    <View style={styles.addressRow}>
                        <Text style={styles.addressText} numberOfLines={2} ellipsizeMode="middle">
                            {walletAddress}
                        </Text>

                        <TouchableOpacity
                            style={[
                                styles.copyBtn,
                                copyStatus && { backgroundColor: '#16a34a' } // green when copied (optional)
                            ]}
                            onPress={handleCopy}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.copyText}>
                                {copyStatus ? 'Copied!' : 'Copy'}
                            </Text>
                            <Copy size={14} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* QR area */}
                    <View style={styles.qrContainer}>
                        {/*<View ref={qrRef} collapsable={false}>*/}
                            <View style={styles.qrPlaceholder} >
                                <QRCode
                                    value={walletAddress.trim()}           // ← your Sui wallet address here
                                    size={140}                      // matches your placeholder size
                                    color="white"                   // QR modules (dots)
                                    backgroundColor="black"       // matches your container bg
                                />
                            </View>
                        {/*</View>*/}

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

                    <TouchableOpacity onPress={()=> router.replace('/profile')} style={styles.outlineButton}>
                        <Text style={styles.outlineButtonText}>Return to Home</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const networkStyles = {
    itemContent: {
        flexDirection: 'column',
    },
    networkName: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    networkDesc: {
        color: '#94a3b8',
        fontSize: 13,
        marginTop: 2,
    },
    // Fallback when array is empty
    fallbackContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackText: {
        color: '#f87171',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    fallbackSubText: {
        color: '#94a3b8',
        fontSize: 14,
        textAlign: 'center',
    },
};
const tokenDropDownStyles = StyleSheet.create({

    // Modal / Dropdown styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent backdrop
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        maxHeight: '60%',
        backgroundColor: '#1e293b', // dark card
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#334155',
    },
    modalHeader: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },
    modalTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    list: {
        paddingVertical: 8,
    },
    dropdownItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    // Reuse tokenIcon & tokenName styles from above
});


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
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: 'white',
        marginBottom: 8,
    },
    section: {
        marginBottom: 12,
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
        width: 20,
        height: 20,
    },
    tokenName: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    networkInput: {
        color: 'white',
        fontSize: 12,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    addressText: {
        fontSize: 9,
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
        alignItems: 'center',
    },
    qrPlaceholder: {
        width: 160,
        height: 160,
        borderWidth: 1,
        borderColor: '#444',
        marginVertical: 16,
        backgroundColor: 'white',
        padding: 10,
    },
    scanText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    hintText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    warning: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 6,
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
        fontSize: 7,
        fontWeight: '700',
        flexShrink: 1,
    },
    buttonContainer: {
        marginTop: 16,
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
    ...tokenDropDownStyles,
    // ...networkStyles,

    itemContent: {
        flexDirection: 'column',
    },
    networkName: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    networkDesc: {
        color: '#94a3b8',
        fontSize: 13,
        marginTop: 2,
    },
    // Fallback when array is empty
    fallbackContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackText: {
        color: '#f87171',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    fallbackSubText: {
        color: '#94a3b8',
        fontSize: 14,
        textAlign: 'center',
    },

});
export default ReceiveCryptoPage;