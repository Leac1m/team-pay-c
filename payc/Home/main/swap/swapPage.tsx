// payc/Home/main/swap/swapPage.tsx

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';


import { _nairaIcon, suiIcon } from "@/payc/constants/images";


import { ArrowDown, ArrowUpDown } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


interface SwapPageProps {
    openDropUp: (type: string, variant?: 'handle' | 'back-arrow' | 'plain') => void;
}
const SwapPage = ({ openDropUp }: SwapPageProps) => {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <Text style={styles.headerTitle}>Swap</Text>

                    {/* Swap form */}
                    <View style={styles.swapForm}>
                        {/* Centered arrow icon overlay */}
                        <View style={styles.arrowOverlay}>
                            <View style={styles.arrowCircleOuter}>
                                <View style={styles.arrowCircleInner}>
                                    <ArrowUpDown size={24} color="#64748B" />
                                </View>
                            </View>
                        </View>

                        {/* You sell */}
                        <View style={styles.inputCard}>
                            <Text style={styles.inputLabel}>You sell</Text>

                            <View style={styles.inputRow}>
                                <Text style={styles.amountText}>100</Text>

                                <View style={styles.currencySelector}>
                                    <View style={styles.currencyInner}>
                                        <Image
                                            source={suiIcon}
                                            style={styles.currencyIcon}
                                            resizeMode="contain"
                                        />
                                        <Text style={styles.currencyCode}>SUI</Text>
                                    </View>
                                    <ArrowDown size={12} color="#94A3B8" />
                                </View>
                            </View>

                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceText}>
                                    Available • USDT • 12
                                </Text>
                                <Text style={styles.estimateText}>Est~ $5000</Text>
                            </View>
                        </View>

                        {/* You receive */}
                        <View style={styles.inputCard}>
                            <Text style={styles.inputLabel}>You receive</Text>

                            <View style={styles.inputRow}>
                                <Text style={styles.amountText}>100000</Text>

                                <View style={styles.currencySelector}>
                                    <View style={styles.currencyInner}>
                                        <Image
                                            source={_nairaIcon}
                                            style={styles.currencyIconSmall}
                                            resizeMode="contain"
                                        />
                                        <Text style={styles.currencyCode}>NGN</Text>
                                    </View>
                                    <ArrowDown size={12} color="#94A3B8" />
                                </View>
                            </View>

                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceText}>
                                    Available • USDT • 12
                                </Text>
                                <Text style={styles.estimateText}>Est~ $5000</Text>
                            </View>
                        </View>
                    </View>

                    {/* Percentage buttons */}
                    <View style={styles.percentButtons}>
                        {[10, 25, 50, 75, 100].map((percent) => (
                            <TouchableOpacity
                                key={percent}
                                style={styles.percentButton}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.percentText}>
                                    {percent === 100 ? 'Max' : `${percent}%`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Rate info */}
                    <View style={styles.rateContainer}>
                        <Text style={styles.rateLabel}>Rate:</Text>

                        <View style={styles.rateValueRow}>
                            <Image
                                source={suiIcon}
                                style={styles.rateIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.rateText}>
                                1 SUI to 4.71 USDC
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Swap button */}
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                        style={styles.swapButton}
                        activeOpacity={0.85}
                        onPress={() => {
                            console.log('Swap button pressed → opening confirmation');
                            openDropUp('swap-confirmation', 'plain'); // 'plain' = no header bar
                        }}
                    >
                        <Text style={styles.swapButtonText}>Swap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 120, // space for bottom button
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 12,
    },

    swapForm: {
        position: 'relative',
        marginTop: 16,
    },
    arrowOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    arrowCircleOuter: {
        width: 48,
        height: 48,
        borderRadius: 999,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowCircleInner: {
        width: '85%',
        height: '85%',
        borderRadius: 999,
        backgroundColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputCard: {
        height: 100,
        backgroundColor: '#234786',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 8,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: 'white',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    amountText: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
    },
    currencySelector: {
        width: 80,
        height: 28,
        backgroundColor: '#1E293B',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    currencyInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    currencyIcon: {
        width: 20,
        height: 20,
        borderRadius: 999,
    },
    currencyIconSmall: {
        width: 16,
        height: 16,
        borderRadius: 999,
    },
    currencyCode: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    balanceText: {
        fontSize: 10,
        color: '#D1D5DB',
    },
    estimateText: {
        fontSize: 10,
        color: '#D1D5DB',
    },

    percentButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    percentButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#234786',
        borderRadius: 6,
    },
    percentText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
    },

    rateContainer: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    rateLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: 'white',
    },
    rateValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    rateIcon: {
        width: 12,
        height: 12,
        borderRadius: 999,
    },
    rateText: {
        fontSize: 10,
        fontWeight: '600',
        color: 'white',
    },

    bottomButtonContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        backgroundColor: '#0F172A',
    },
    swapButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    swapButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default SwapPage;