// ProfileScreen.tsx
// (remove 'use client' — not needed in React Native)

import React, { useState } from 'react';
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

import { nairaGlobe, profileImg, quickMenuImages } from '@/payc/constants/images';


// Use lucide-react-native instead of lucide-react
import {
    Coins,
    Download,
    Eye,
    HandHeart,           // closest match to HelpingHand
    ArrowRightLeft,
    HandCoins,
    Plus,
    Send,
    Wallet, ArrowDown,
} from 'lucide-react-native';
import {useDropUp} from "@/payc/contexts/DropUpContexts";
import {router} from "expo-router";
import {footerNavs} from "@/payc/constants/footer";


// ──────────────────────────────────────────────
// Keep ALL names, structures, types exactly as original
// ──────────────────────────────────────────────

type MainNavItem = {
    label: string;
    icon: React.ReactNode;
    onPress?: () => void;
};



const recentTransactions: {
    title: string;
    otherParty: string;
    status: string;
    type: string;
    amount: {
        absValue: number;
        value: string;
        currency: string;
    };
    date: string;
    time: string;
}[] = [
    {
        title: 'Airdrop to @moufta',
        otherParty: '@moufta',
        status: 'sent',
        type: 'Airdrop',
        amount: {
            absValue: 5,
            value: '+5',
            currency: 'USDC',
        },
        date: 'Jan 21, 2025',
        time: '4:47 PM',
    },
    {
        title: 'Airdrop from @moufta',
        otherParty: '@moufta',
        status: 'received',
        type: 'Airdrop',
        amount: {
            absValue: 5,
            value: '+5',
            currency: 'USDC',
        },
        date: 'Jan 21, 2025',
        time: '4:47 PM',
    },
    {
        title: 'Airdrop from @moufta',
        otherParty: '@moufta',
        status: 'received',
        type: 'Airdrop',
        amount: {
            absValue: 5,
            value: '+5',
            currency: 'USDC',
        },
        date: 'Jan 21, 2025',
        time: '4:47 PM',
    },
];

const recentReceipts: { profileImage: any; userHandle: string }[] = [
    { profileImage: profileImg, userHandle: '@moutfa' },
    { profileImage: nairaGlobe, userHandle: '@vawlence' },
    { profileImage: nairaGlobe, userHandle: '@stickers' },
];

const mockBalance = 5000;

interface ProfilePageProps {
    openDropUp: (type: string, variant?: 'handle' | 'back-arrow') => void;
}

export default function ProfilePage({ openDropUp }: ProfilePageProps) {
    const [currentFooterNav, setCurrentFooterNav] = useState(1);
    // const { openDropUp } = useDropUp();


    const mainNavs: MainNavItem[] = [
        {
            label: 'Add Money',
            icon: <Plus size={20} color="#3B82F6" />,
            onPress: () => openDropUp('add-money', 'handle'),

        },
        {
            label: 'Withdraw',
            icon: <HandCoins size={20} color="#3B82F6" />,
            // onPress: () => openDropUp('withdraw', 'handle'), // add later
        },
        {
            label: 'Receive',
            icon: <Download size={20} color="#3B82F6" />,
            // onPress: () => openDropUp('receive', 'handle'), // add later
        },
    ];


    const handleAirdropBtnClick = () => {
      openDropUp('send-money', 'handle')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContentWrapper}>

                {/* Top bar - profile + quick menu */}
                <View style={styles.headerRelative}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatarBorder}>
                            <View style={styles.avatarInner}>
                                <Image source={profileImg} style={styles.avatarImg} />
                            </View>
                        </View>
                        <Text style={styles.greeting}>HI, Jimmy</Text>
                    </View>

                    <View style={styles.quickMenuContainer}>
                        <View style={styles.quickIconsWrapper}>
                            {quickMenuImages.map((item, index) => (
                                <View key={index} style={styles.quickIconItem}>
                                    <Image
                                        source={item.img}
                                        style={styles.quickIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>


                    {/* Balance */}
                    <View style={styles.balanceSection}>
                        <View style={styles.balanceLabelRow}>
                            <Text style={styles.balanceLabel}>Funding Balance</Text>
                            <Eye size={12} color="#9CA3AF" />
                        </View>

                        <View style={styles.balanceValueRow}>
                            <Text style={styles.balanceText}>NGN {mockBalance.toFixed(0)}</Text>
                            <View style={styles.balanceDot} >
                                <ArrowDown size={10} color="#3B82F6" />
                            </View>
                        </View>

                        <View style={styles.mainNavContainer}>
                            {mainNavs.map((nav, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.mainNavItem}
                                    onPress={() => {
                                        console.log(`[ProfilePage] "${nav.label}" tapped`);

                                        if (nav.onPress) {
                                            console.log(`[ProfilePage] Executing onPress for "${nav.label}"`);
                                            nav.onPress();
                                        } else {
                                            console.log(`[ProfilePage] No onPress defined for "${nav.label}"`);
                                        }
                                    }}
                                >
                                    <View style={styles.mainNavIconBg}>{nav.icon}</View>
                                    <Text style={styles.mainNavLabel}>{nav.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Cards section */}
                    <View style={styles.cardsContainer}>
                        {/* Recent receipts */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>Recent receipts</Text>
                                <Text style={styles.seeAll}>See all</Text>
                            </View>

                            <View style={styles.receiptsContent}>
                                {recentReceipts.length === 0 ? (
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyText}>Make a friend your first receipt</Text>
                                    </View>
                                ) : (
                                    recentReceipts.map((receipt, index) => (
                                        <View key={index} style={styles.receiptItem}>
                                            <View style={styles.receiptAvatarWrapper}>
                                                <Image
                                                    source={receipt.profileImage}
                                                    style={styles.receiptAvatar}
                                                />
                                            </View>
                                            <Text style={styles.receiptHandle}>{receipt.userHandle}</Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>

                        {/* Recent transactions */}
                        <View style={[styles.card, { marginTop: 24 }]}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>Recent transactions</Text>
                                <Text style={styles.seeAll}>See all</Text>
                            </View>

                            <View style={styles.transactionsContent}>
                                {recentTransactions.length === 0 ? (
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyText}>You don't have any transactions yet</Text>
                                    </View>
                                ) : (
                                    recentTransactions.map((trans, index) => (
                                        <View key={index} style={styles.transactionItem}>
                                            <View style={styles.transactionLeft}>
                                                <View style={styles.iconWrapper}>
                                                    {trans.status === 'sent' ? (
                                                        <Send size={24} color="#3B82F6" />
                                                    ) : trans.status === 'received' ? (
                                                        <HandHeart size={24} color="#3B82F6" />
                                                    ) : null}
                                                </View>

                                                <View>
                                                    <Text style={styles.transTitle}>{trans.title}</Text>
                                                    <Text style={styles.transDate}>
                                                        {trans.date}, {trans.time}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.transactionRight}>
                                                <Text style={styles.transAmount}>
                                                    {trans.status === 'sent' ? '-' : '+'}
                                                    {trans.amount.absValue} {trans.amount.currency}
                                                </Text>
                                                <Text style={styles.transStatus}>{trans.status}</Text>
                                            </View>
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Airdrop button */}
                    <View style={styles.airdropSection}>
                        <TouchableOpacity style={styles.airdropBtn}>
                            <Text onPress={handleAirdropBtnClick} style={styles.airdropText}>Airdrop a friend</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            {/* Footer nav */}
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
                            <View style={styles.footerIconContainer}>
                                {React.cloneElement(nav.icon as any, {
                                    color: index === currentFooterNav ? '#ffffff' : '#94A3B8',
                                    size: 20,
                                })}
                            </View>
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
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    mainContentWrapper: { flex: 1 },
    scrollContent: { paddingBottom: 0 },

    headerRelative: { position: 'relative', paddingTop: 16 },
    profileRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 16, gap: 8 },
    avatarBorder: { padding: 2, backgroundColor: '#3B82F6', borderRadius: 999 },
    avatarInner: { borderRadius: 999, overflow: 'hidden' },
    avatarImg: { width: 32, height: 32 },

    greeting: { fontWeight: '600', color: 'white', fontSize: 16 },

    quickMenuContainer: {
        position: 'absolute',
        top: 20,
        right: 16,
        borderRadius: 6,
        overflow: 'hidden',
    },
    quickIconsWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#1E293B',
        gap: 16,
    },
    quickIconItem: {},
    quickIcon: { width: 16, height: 16 },

    balanceSection: { marginTop: 32, alignItems: 'center' },
    balanceLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    balanceLabel: { color: '#9CA3AF', fontSize: 12 },
    balanceValueRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    balanceText: { color: 'white', fontSize: 38, fontWeight: '700' },
    balanceDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3B82F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainNavContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '65%',
        marginTop: 12,
    },
    mainNavItem: { alignItems: 'center', gap: 8 },
    mainNavIconBg: {
        width: 40,
        height: 40,
        borderRadius: 999,
        backgroundColor: '#182C53',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    mainNavLabel: { color: '#D1D5DB', fontSize: 10 },

    cardsContainer: { marginTop: 32 },
    card: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#182C53',
        borderRadius: 12,
        shadowColor: '#737373',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    cardTitle: { color: '#9CA3AF', fontWeight: '600', fontSize: 15 },
    seeAll: { color: '#3B82F6', fontSize: 12 },

    receiptsContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 32,
        paddingVertical: 8,
        gap: 16,
        minHeight: 60,
    },
    receiptItem: { alignItems: 'center' },
    receiptAvatarWrapper: { borderRadius: 999, overflow: 'hidden' },
    receiptAvatar: { width: 48, height: 48 },
    receiptHandle: { color: 'white', fontSize: 11, marginTop: 4 },

    transactionsContent: { paddingHorizontal: 12, paddingVertical: 8, gap: 12 },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 4,

    },
    transactionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    iconWrapper: {},
    transTitle: { color: 'white', fontWeight: '700', fontSize: 15 },
    transDate: { color: '#9CA3AF', fontSize: 11 },
    transactionRight: { alignItems: 'flex-end' },
    transAmount: { color: 'white', fontWeight: '700', fontSize: 15 },
    transStatus: { color: '#9CA3AF', fontSize: 11 },

    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
    emptyText: { color: '#9CA3AF', fontSize: 12 },

    airdropSection: { paddingVertical: 32, alignItems: 'center' },
    airdropBtn: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 999,
    },
    airdropText: { color: 'white', fontWeight: '600', fontSize: 14 },

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

