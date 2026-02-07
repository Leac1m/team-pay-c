// payc/Home/main/sendMoney/AirdropIntroPage.tsx

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import {handHoldingPhone} from "@/payc/constants/images";
import {router} from "expo-router";


const handleAirdropContinueBtnPress = () => {
    router.push('/airdrop-user-search');
}
const AirdropIntroPage = () => {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Back button + title + description + image — takes most of the space */}
                <View style={styles.upperContent}>
                    {/* Back + header text */}
                    <View>
                        <TouchableOpacity style={styles.backButton}>
                            <ArrowLeft size={28} color="white" />
                        </TouchableOpacity>

                        <View style={styles.headerText}>
                            <Text style={styles.title}>Airdrop a friend</Text>
                            <Text style={styles.description}>
                                PayC uses NFC technology in your phone to allow peer-to-peer transfers between two devices
                            </Text>
                        </View>
                    </View>

                    {/* Illustration — pushed to bottom of upper area */}
                    <View style={styles.imageWrapper}>
                        <Image
                            source={handHoldingPhone}
                            style={styles.illustration}
                            resizeMode='contain'
                        />
                    </View>
                </View>

                {/* Continue button — naturally at bottom */}
                <TouchableOpacity onPress={handleAirdropContinueBtnPress} style={styles.continueButton} activeOpacity={0.85}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AirdropIntroPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 32,               // breathing room at bottom
    },

    upperContent: {
        flex: 1,
        paddingTop: 16,
    },

    backButton: {
        paddingTop: 8,
        paddingBottom: 12,
        alignSelf: 'flex-start',
    },

    headerText: {
        marginTop: 8,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        marginTop: 24,
    },

    description: {
        fontSize: 18,
        color: '#D1D5DB',
        marginTop: 12,
        lineHeight: 26,
    },

    imageWrapper: {
        alignItems: 'flex-end',
        marginTop: 8,
        marginBottom: 24, // space before button
        height: '60%'
    },

    illustration: {
        width: '90%',
        height: '90%',
    },

    continueButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16, // matches original mb-12 feel
    },

    continueText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});