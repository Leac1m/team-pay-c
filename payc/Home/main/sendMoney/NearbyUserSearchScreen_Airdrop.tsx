// payc/Home/main/sendMoney/NearbyUserSearchScreen_Airdrop.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import {nearbyDeviceSearchImage} from "@/payc/constants/images";
import {router} from "expo-router";
// import { nearbyDeviceSearchImage } from '@/payc/constants/images';



const NearbyUserSearchScreen_Airdrop = () => {
    const [userFound, setUserFound] = React.useState(false);

    const initializeSearch = () => {
        // mock logic
        setTimeout(() => {
            setUserFound(true)
        }, 1000);
    };

    initializeSearch()

    userFound? router.replace('/airdrop-user-found') : null;


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.backButtonContainer}>
                    <ArrowLeft size={32} color="white" />
                </View>

                <View style={styles.centerContent}>
                    <Image
                        source={nearbyDeviceSearchImage}
                        style={styles.searchImage}
                        resizeMode="contain"
                    />

                    <Text style={styles.heading}>Searching for nearby users</Text>

                    <View style={styles.instructionContainer}>
                        <Text style={styles.instructionText}>
                            PayC is searching for nearby devices.
                        </Text>
                        <Text style={styles.instructionText}>
                            Make sure devices are not more than 4 meters apart
                        </Text>
                    </View>
                </View>

                <View style={styles.bottomSpacer} />
            </View>
        </SafeAreaView>
    );
};

export default NearbyUserSearchScreen_Airdrop;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    content: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' },
    backButtonContainer: { marginTop: 24 },
    centerContent: { alignItems: 'center', justifyContent: 'center' },
    searchImage: { width: 144, height: 144 },
    heading: { fontSize: 30, fontWeight: 'bold', color: 'white', marginTop: 48, textAlign: 'center' },
    instructionContainer: { marginTop: 8 },
    instructionText: { fontSize: 18, color: '#D1D5DB', textAlign: 'center', lineHeight: 26 },
    bottomSpacer: { paddingBottom: 64 },
});