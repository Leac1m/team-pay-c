// payc/Home/main/sendMoney/UserFound_Airdrop.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import {userFound_PhoneImage} from "@/payc/constants/images";
import {router} from "expo-router";
import {DropUpContentType, DropUpDynamicValue, DropUpVariant} from "@/payc/constants/type";

// import { userFound_PhoneImage } from '@/payc/constants/images';

const UserFound_Airdrop = ({openDropUp, setNextFunction} : {setNextFunction: (arg: () => void)=> void, openDropUp: {type: DropUpContentType, variant: DropUpVariant, dynamicValue?: DropUpDynamicValue , next? :() => void }}) => {

    const handleContinueBtnPress = () => {
        openDropUp('enter-amount-airdrop', 'back-arrow', null);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity  style={styles.backButton}>
                    <ArrowLeft size={32} color="#D1D5DB" />
                </TouchableOpacity>

                <View style={styles.centerSection}>
                    <Image
                        source={userFound_PhoneImage}
                        style={styles.phoneImage}
                        resizeMode="contain"
                    />

                    <View style={styles.messageContainer}>
                        <Text style={styles.foundTitle}>Joshua's Phone</Text>
                        <Text style={styles.foundSubtitle}>User found!</Text>
                        <Text style={styles.foundSubtitle}>You can send him tokens</Text>
                    </View>

                    <TouchableOpacity onPress={handleContinueBtnPress} style={styles.continueButton}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSpacer} />
            </View>
        </SafeAreaView>
    );
};

export default UserFound_Airdrop;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    content: { flex: 1, paddingHorizontal: 24, paddingVertical: 16, justifyContent: 'space-between' },
    backButton: { alignSelf: 'flex-start' },
    centerSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    phoneImage: { width: 120, height: 160 },
    messageContainer: { alignItems: 'center', marginTop: 48 },
    foundTitle: { fontSize: 30, fontWeight: 'bold', color: 'white' },
    foundSubtitle: { fontSize: 18, color: '#D1D5DB', marginTop: 8, textAlign: 'center' },
    continueButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 14,
        width: '100%',
        alignItems: 'center',
        marginTop: 48,
    },
    continueText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    bottomSpacer: { paddingBottom: 48 },
});