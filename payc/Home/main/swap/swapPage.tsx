// payc/Home/main/swap/swapPage.tsx
// payc/Home/main/swap/swapPage.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native';

import { _nairaIcon, suiIcon } from '@/payc/constants/images';
import { ArrowDown, ArrowUpDown } from 'lucide-react-native';
import { footerNavs } from '@/payc/constants/footer';
import {openDropUpType} from "@/payc/constants/type";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwapPageProps {
    openDropUp: openDropUpType
    setSwapDetails: (args : {
        transactionFee: { value: number, currency: string },
        conversion: { from: string, to: string, amount: number, rate: number }
    }) => void;
}

const SwapPage = ({ openDropUp , setSwapDetails}: SwapPageProps) => {
    const [currentFooterNav, setCurrentFooterNav] = useState(2);
    const [swapData, setSwapData] = useState({
        from: {
            currency: 'SUI',
            icon: suiIcon,
            available: 200,
        },
        to: {
            currency: 'NGN',
            icon: _nairaIcon,
            available: 50000,
        },
        exchangeRate: 1000, // 1 SUI = 1000 NGN
        percentages: [10, 25, 50, 75, 100],
    });

    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [isInsufficient, setIsInsufficient] = useState(false);
    const transactionFeeRate = 0.02

    const handleFromChange = (text: string) => {
        // Regex validation
        if (/^\d*\.?\d*$/.test(text)) {
            setFromAmount(text);

            const num = parseFloat(text);

            // 1. VALIDATION LOGIC
            if (!isNaN(num) && num > swapData.from.available) {
                setIsInsufficient(true);
            } else {
                setIsInsufficient(false);
            }

            // 2. CALCULATION LOGIC
            if (text === '' || text === '.') {
                setToAmount('');
                setIsInsufficient(false); // Reset error on empty
            } else {
                // Check against NaN just in case
                if (!isNaN(num)) {
                    setToAmount((num * swapData.exchangeRate).toFixed(2));
                }
            }
        }
    };

    const handleToChange = (text: string) => {
        if (/^\d*\.?\d*$/.test(text)) {
            setToAmount(text);

            const num = parseFloat(text);

            // Calculate how much SUI is required for this NGN amount
            const requiredFromAmount = !isNaN(num) ? num / swapData.exchangeRate : 0;

            // 1. VALIDATION LOGIC (Check calculated source against available balance)
            if (requiredFromAmount > swapData.from.available) {
                setIsInsufficient(true);
            } else {
                setIsInsufficient(false);
            }

            // 2. CALCULATION LOGIC
            if (text === '' || text === '.') {
                setFromAmount('');
                setIsInsufficient(false);
            } else {
                if (!isNaN(num)) {
                    setFromAmount(requiredFromAmount.toFixed(2));
                }
            }
        }
    };

    const handleSwap = () => {
        setSwapData(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from,
            // IMPORTANT: Invert the rate (1 / 1000 = 0.001)
            exchangeRate: 1 / prev.exchangeRate
        }));

        setFromAmount(toAmount);
        setToAmount(fromAmount);

        console.log(swapData)
        console.log(fromAmount, toAmount)

    };

    const handlePercentage = (percent: number) => {
        const available = swapData.from.available || 0;

        // Calculate amount
        const val = (available * percent) / 100;

        // Convert to string. Use 4 decimals if value is small, otherwise 2.
        // This helps if swapping highly valuable crypto
        const valueString = val % 1 === 0 ? val.toString() : val.toFixed(4);

        // Pass to your existing change handler to update both inputs
        handleFromChange(valueString);
    };

    const getFontSize = (text: string) => {
        const length = text.length;
        if (length > 20) return 18; // Very small for huge numbers
        if (length > 14) return 24; // Medium shrinking
        if (length > 10) return 28; // Slight shrinking
        return 32; // Default big size
    };

    const handleSwapButtonPress = () => {
        setSwapDetails({
            transactionFee: { value: parseFloat(toAmount)* transactionFeeRate , currency: swapData.to.currency },
            conversion: { from: swapData.from.currency, to: swapData.to.currency, amount: parseFloat(fromAmount), rate: swapData.exchangeRate }
        })

        console.log( { from: swapData.from.currency, to: swapData.to.currency, amount: parseFloat(fromAmount), rate: swapData.exchangeRate })

        openDropUp('swap-confirmation', 'handle')
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.headerTitle}>Swap</Text>

                    <View style={styles.swapForm}>
                        {/* You sell */}
                        <View style={[
                            styles.inputCard,
                            isInsufficient && { borderColor: '#EF4444', borderWidth: 1 ,}]
                        } >
                            <Text style={styles.inputLabel}>You sell</Text>

                            <View style={styles.inputRow}>
                                <TextInput
                                    // 1. Combine static styles with dynamic font size
                                    style={[
                                        styles.amountInput,
                                        { fontSize: getFontSize(fromAmount) }
                                    ]}
                                    keyboardType="decimal-pad"
                                    value={fromAmount}
                                    onChangeText={handleFromChange}
                                    placeholder="0"
                                    placeholderTextColor="#94A3B8"

                                    // 2. Crucial properties to prevent overflow
                                    numberOfLines={1}
                                    // ellipsizeMode='tail' // implies standard scrolling behavior for input

                                />

                                <View style={styles.currencySelector}>
                                    <View style={styles.currencyInner}>
                                        <Image source={swapData.from.icon} style={styles.currencyIcon} />
                                        <Text style={styles.currencyCode}>{swapData.from.currency}</Text>
                                    </View>
                                    <ArrowDown size={12} color="#94A3B8" />
                                </View>
                            </View>

                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceText}>
                                    Available • {swapData.from.currency} • {swapData.from.available}
                                </Text>
                                <Text style={styles.estimateText}>Est~ ${parseFloat(fromAmount) || 0}</Text>
                            </View>
                        </View>

                        {/* Swap arrow */}
                        <View style={styles.arrowOverlay} pointerEvents="box-none">
                            <View style={styles.arrowCircleOuter}>
                                <TouchableOpacity  onPress={handleSwap} style={styles.arrowCircleInner}>
                                    <ArrowUpDown size={24} color="#64748B" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* You receive */}
                        <View style={styles.inputCard}>
                            <Text style={styles.inputLabel}>You receive</Text>

                            <View style={styles.inputRow}>
                                <TextInput
                                    style={[
                                        styles.amountInput,
                                        { fontSize: getFontSize(toAmount) }
                                    ]}
                                    keyboardType="decimal-pad"
                                    value={toAmount}
                                    onChangeText={handleToChange}
                                    placeholder='0'
                                    placeholderTextColor="#94A3B8"
                                    numberOfLines={1}
                                />

                                <View style={styles.currencySelector}>
                                    <View style={styles.currencyInner}>
                                        <Image source={swapData.to.icon} style={styles.currencyIconSmall} />
                                        <Text style={styles.currencyCode}>{swapData.to.currency}</Text>
                                    </View>
                                    <ArrowDown size={12} color="#94A3B8" />
                                </View>
                            </View>

                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceText}>
                                    {/* Dynamic Balance for the 'To' currency */}
                                    Available • {swapData.to.currency} • {swapData.to.available ?? 0}
                                </Text>
                                <Text style={styles.estimateText}>Est~ ${parseFloat(toAmount) || 0}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Percentages */}
                    <View style={styles.percentButtons}>
                        {swapData.percentages.map(percent => (
                            <TouchableOpacity
                                key={percent}
                                style={styles.percentButton}
                                onPress={() => handlePercentage(percent)}
                            >
                                <Text style={styles.percentText}>
                                    {percent === 100 ? 'Max' : `${percent}%`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Rate */}
                    <View style={styles.rateContainer}>
                        <Text style={styles.rateLabel}>Rate:</Text>
                        <View style={styles.rateValueRow}>
                            <Image source={suiIcon} style={styles.rateIcon} />
                            <Text style={styles.rateText}>
                                1 {swapData.from.currency} to {swapData.exchangeRate} {swapData.to.currency}
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity onPress={handleSwapButtonPress} style={styles.swapButton}>
                        <Text style={styles.swapButtonText}>Swap</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer navigation */}
            <View style={styles.footer}>
                <View style={styles.footerInner}>
                    {footerNavs.map((nav, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.footerItem,
                                index === currentFooterNav && styles.footerItemActive,
                            ]}
                            onPress={
                                nav.action
                            }
                        >
                            {React.cloneElement(nav.icon as any, {
                                color: index === currentFooterNav ? '#ffffff' : '#94A3B8',
                                size: 20,
                            })}
                            <Text
                                style={[
                                    styles.footerLabel,
                                    index === currentFooterNav && { color: '#ffffff' },
                                ]}
                            >
                                {nav.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
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
    amountInput: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
        flex: 1,
        width: 90 ,
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
    // Footer
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#475569',
        backgroundColor: '#1B2949',
        paddingTop: 12,
        paddingBottom: 40,
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        alignSelf: 'center',
    },
    footerItem: { alignItems: 'center', gap: 4 },
    footerItemActive: {},
    footerIconContainer: { width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
    footerLabel: { color: '#94A3B8', fontSize: 10 },
});

export default SwapPage;