// payc/Home/main/portfolio/portfolioPage.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions, Platform,
} from 'react-native';

import { nairaImage, suiImage, usdcImage } from '@/payc/constants/images';
import {ArrowDown, Coins, Eye, ArrowRightLeft, Wallet, ArrowLeft} from 'lucide-react-native';
import {router} from "expo-router";
import {footerNavs} from "@/payc/constants/footer";

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const mockBalance = 0;

const fiatPort = [
    {
        tokenName: 'Naira',
        tokenImage: nairaImage,
        currency: 'NGN',
        value: 30000,
        dollarExchangeRate: 1440,
    },
];

const cryptoPort = [
    {
        tokenName: 'USDC',
        tokenImage: usdcImage,
        amount: {
            value: 5,
            currency: 'USDC',
            fiatCurrency: 'NGN',
            fiatExchangeRate: 6000,
            dollarExchangeRate: 1.01,
        },
    },
    {
        tokenName: 'SUI',
        tokenImage: suiImage,
        amount: {
            value: 5,
            currency: 'SUI',
            fiatCurrency: 'NGN',
            fiatExchangeRate: 6000,
            dollarExchangeRate: 1.75,
        },
    },
];

const PortfolioPage = () => {
    const [currentFooterNav, setCurrentFooterNav] = useState(0); // Tokens selected by default

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {router.replace('/profile')}} style={styles.backButton} activeOpacity={0.7}>
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Portfolio title & total balance */}
                    <View style={styles.balanceSection}>
                        <Text style={styles.pageTitle}>Your Portfolio</Text>

                        <View style={styles.totalBalanceRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Eye size={14} color="#9CA3AF" />
                        </View>

                        <View style={styles.totalAmountRow}>
                            <Text style={styles.totalAmount}>NGN {fiatPort[0]?.value.toFixed(0) || '0'}</Text>
                            <View style={styles.balanceDot}>
                                <ArrowDown size={12} color="#3B82F6" />
                            </View>
                        </View>
                    </View>

                    {/* Portfolio cards */}
                    <View style={styles.cardsContainer}>
                        {/* Fiat section */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>Fiat</Text>
                            </View>

                            <View style={styles.cardContent}>
                                {fiatPort.length === 0 ? (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyText}>You have no cash yet</Text>
                                    </View>
                                ) : (
                                    fiatPort.map((fiat, index) => (
                                        <View key={index} style={styles.portfolioRow}>
                                            <View style={styles.leftSide}>
                                                <Image
                                                    source={fiat.tokenImage}
                                                    style={styles.tokenIcon}
                                                    resizeMode="contain"
                                                />
                                                <View>
                                                    <Text style={styles.tokenName}>{fiat.tokenName}</Text>
                                                    <Text style={styles.rateText}>
                                                        $1 = {fiat.currency} {fiat.dollarExchangeRate}
                                                    </Text>
                                                </View>
                                            </View>

                                            <Text style={styles.fiatAmount}>
                                                {fiat.currency} {fiat.value.toLocaleString()}
                                            </Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>

                        {/* Crypto section */}
                        <View style={[styles.card, { marginTop: 24 }]}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>Crypto</Text>
                            </View>

                            <View style={styles.cardContent}>
                                {cryptoPort.length === 0 ? (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyText}>You don't have any crypto yet</Text>
                                    </View>
                                ) : (
                                    cryptoPort.map((token, index) => (
                                        <View key={index} style={styles.portfolioRow}>
                                            <View style={styles.leftSide}>
                                                <Image
                                                    source={token.tokenImage}
                                                    style={styles.tokenIcon}
                                                    resizeMode="contain"
                                                />
                                                <View>
                                                    <Text style={styles.tokenName}>{token.tokenName}</Text>
                                                    <Text style={styles.rateText}>
                                                        1 {token.amount.currency} = ${token.amount.dollarExchangeRate}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.rightSide}>
                                                <Text style={styles.cryptoAmount}>
                                                    {token.amount.value} {token.amount.currency}
                                                </Text>
                                                <Text style={styles.fiatEquivalent}>
                                                    {token.amount.fiatCurrency}{' '}
                                                    {(token.amount.value * token.amount.fiatExchangeRate).toLocaleString()}
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Swap Crypto CTA */}
                    <View style={styles.ctaSection}>
                        <TouchableOpacity style={styles.swapCtaButton}>
                            <Text style={styles.swapCtaText}>Swap Crypto</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

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
    backButton: {
        paddingTop: Platform.OS === 'ios' ? 8 : 24,
        paddingBottom: 0,
        paddingHorizontal: 16,

    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 0, // space for footer + CTA
    },

    // Balance section
    balanceSection: {
        alignItems: 'center',
        marginTop: 32,
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
    },
    totalBalanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
    },
    totalLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    totalAmountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 8,
    },
    totalAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: 'white',
    },
    balanceDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Cards
    cardsContainer: {
        marginTop: 32,
    },
    card: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#182C53',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#737373',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
    },
    cardHeader: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    cardTitle: {
        color: '#9CA3AF',
        fontWeight: '600',
        fontSize: 12,
    },
    cardContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        gap: 16,
    },
    portfolioRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    tokenIcon: {
        width: 32,
        height: 32,
    },
    tokenName: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
    rateText: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 2,
    },
    rightSide: {
        alignItems: 'flex-end',
    },
    cryptoAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
    fiatEquivalent: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 2,
    },
    fiatAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
    },
    emptyText: {
        color: '#9CA3AF',
        fontSize: 12,
    },

    // CTA
    ctaSection: {
        paddingVertical: 80,
        alignItems: 'center',
    },
    swapCtaButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 999,
    },
    swapCtaText: {
        color: 'white',
        fontSize: 14,
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
        justifyContent: 'space-around',
        width: '70%',
        alignSelf: 'center',
    },
    footerItem: {
        alignItems: 'center',
        gap: 4,
    },
    footerItemActive: {},
    footerLabel: {
        color: '#94A3B8',
        fontSize: 10,
    },
});

export default PortfolioPage;