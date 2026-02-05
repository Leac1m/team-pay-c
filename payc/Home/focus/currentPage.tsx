// payc/Home/focus/currentPage.tsx

import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

// ──────────────────────────────────────────────
// All possible drop-up contents
// ──────────────────────────────────────────────


import AddMoneyDropUp from '@/payc/Home/main/addMoney/addMoneyDropUp';
import SendMoneyDropUP from '@/payc/Home/main/sendMoney/sendMoneyDropUP';
import LoadingDropUp_SendMoney from '@/payc/Home/main/sendMoney/LoadingDropUp_SendMoney';
import BankTransferDropUpContent from '@/payc/Home/main/addMoney/BankTransferDropUpContent';
import BankTransferSuccessDropUpContent from '@/payc/Home/main/addMoney/BankTransferSuccessDropUpContent';
import PhoneBehindCardIllustration from '@/payc/Home/main/addMoney/PhoneBehindCardIllustration';
import SelectCurrencyDropUpContent from '@/payc/Home/main/currency/SelectCurrencyDropUpContent';
import EnterAmountDropUpContent from '@/payc/Home/main/sendMoney/EnterAmountDropUpContent';
import ConfirmPin_SendMoney from '@/payc/Home/main/sendMoney/ConfirmPin_SendMoney';
import ConfirmationDropUpContext_Swap from "@/payc/Home/main/swap/confirmationDropUpContext_Swap";

// import ConfirmationDropUpContext_Swap from '@/payc/Home/main/swap/ConfirmationDropUpContext_Swap';

// ──────────────────────────────────────────────
// Main screens (uncomment one at a time for testing)
// ──────────────────────────────────────────────
import ProfilePage from '@/payc/Home/main/profilePage';
import SwapPage from '@/payc/Home/main/swap/swapPage';
import PortfolioPage from "@/payc/Home/main/portfolio/portfolioPage";

// import SendPage from '@/payc/Home/main/sendMoney/SendPage';
import AirdropIntroPage from '@/payc/Home/main/sendMoney/AirdropIntroPage';
import SendPage from "@/payc/Home/main/sendMoney/sendPage";
import {router} from "expo-router";
import TransactionSuccessPage from "@/payc/Home/main/sendMoney/TransactionSuccessPage";
import NearbyUserSearchScreen_Airdrop from "@/payc/Home/main/sendMoney/NearbyUserSearchScreen_Airdrop";
import UserFound_Airdrop from "@/payc/Home/main/sendMoney/UserFound_Airdrop";
import {DropUpContentType, DropUpDynamicValue, DropUpVariant} from "@/payc/constants/type";
import SuccessPage_Airdrop from "@/payc/Home/main/sendMoney/SuccessPage_Airdrop";
import EnterAmountDropUpContent_Card from "@/payc/Home/main/sendMoney/EnterAmountDropUpContent_Card";
import ReceiveCrypto from "@/app/(payc)/(addPages)/receive-crypto";
import ReceiveCryptoPage from "@/payc/Home/main/addMoney/RecieveCryptoPage";
import {currencies} from "@/payc/constants/images";


// import MainPage from '@/payc/Home/mainPage';
// import other screens...

const { height: SCREEN_HEIGHT } = Dimensions.get('window');





interface CurrentPageProps {
    page?: string; // e.g. 'profile', 'swap', 'send', 'portfolio', etc.
}

const CurrentPage = ({ page = 'profile' }: CurrentPageProps) => {
    // Drop-up state
    const [showDropUp, setShowDropUp] = useState(false);
    const [dropUpContent, setDropUpContent] = useState<DropUpContentType>(null);
    const [dropUpVariant, setDropUpVariant] = useState<DropUpVariant>('handle');
    const [dropUpDynamicValue, setDropUpDynamicValue] = useState<DropUpDynamicValue>({ currency: 'NGN' , deposit: 0, fromUser : 'none'});
    const [nextFunction, setNextFunction] = useState<()=> void>();

    const [sendMoneyAmount_CurrencyRoute, setSendMoneyAmount_CurrencyRoute] = useState<string>('0000-null');
    const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0)

    const [swapDetails, setSwapDetails] = useState({
        transactionFee: { value: 0, currency: currencies[selectedCurrencyIndex].code },
        conversion: { from: 'SUI', to: 'USDC', amount: 1, rate: 4.9 }
    });

    // Helper to open drop-up
    const openDropUp = (type: DropUpContentType, variant: DropUpVariant = 'handle', dynamicValue?: DropUpDynamicValue, next? :() => void ) => {
        console.log(`Opening drop-up: ${type} (${variant})`);
        setDropUpContent(type);
        setDropUpVariant(variant);
        dynamicValue && setDropUpDynamicValue(dynamicValue);
        setShowDropUp(true);
        setNextFunction(next)

    };

    const closeDropUp = () => {
        console.log('Closing drop-up');
        setShowDropUp(false);
        setTimeout(() => setDropUpContent(null), 300);
    };

    // Render main content (pass openDropUp to screens that need it)

    const renderMainContent = () => {
        switch (page) {
            case 'profile':
                return <ProfilePage openDropUp={openDropUp} selectedCurrencyIndex={selectedCurrencyIndex} />;
            case 'swap':
                return <SwapPage openDropUp={openDropUp} startSwapFlow={startSwapFlow} setSwapDetails={setSwapDetails} />;
            case 'send':
                return (
                    <SendPage
                        onSendPress={() => openDropUp('enter-amount', 'back-arrow')}
                    />
                );
            case 'portfolio':
                return <PortfolioPage />;
            case 'transaction-success':
                return <TransactionSuccessPage amount={sendMoneyAmount_CurrencyRoute} />;
            case 'airdrop':
                return <AirdropIntroPage />;
            case 'airdrop-user-search':
                return <NearbyUserSearchScreen_Airdrop />;
            case 'airdrop-user-found':
                return <UserFound_Airdrop setNextFunction={setNextFunction} openDropUp={openDropUp}/>;
             case 'airdrop-success':
                return <SuccessPage_Airdrop onClose={() => router.replace('/profile')}/>;

            case 'receive-crypto':
                return <ReceiveCryptoPage />;

            // Add more cases as needed
            default:
                return <ProfilePage openDropUp={openDropUp} selectedCurrencyIndex={selectedCurrencyIndex} />;
        }
    };

    // New: mock swap flow with transitions
    const startSwapFlow = () => {
        console.log('Starting mock swap flow');

        // Step 1: Show confirmation
        openDropUp('swap-confirmation', 'plain');

        // Step 2: After user "confirms" (simulated by delay or button press inside confirmation)
        // For now we simulate confirmation with a 1.5s delay
        setTimeout(() => {
            openDropUp('loading-send-money', 'handle');

            // Step 3: After loading (mock 2s delay), go to success
            setTimeout(() => {
                openDropUp('bank-transfer-success', 'plain'); // new type
            }, 2000);
        }, 1500); // short delay to mimic "user thinking"
    };


    // New: function to simulate confirmation → loading → success
    const handleConfirmSwap = () => {
        console.log('User confirmed swap → starting loading');

        // Show loading immediately

        openDropUp('loading-send-money', 'handle');

        console.log(swapDetails)

        setDropUpDynamicValue({currency: swapDetails.conversion.to , deposit: swapDetails.conversion.amount * swapDetails.conversion.rate, fromUser: '(conversion)'})
        console.log(dropUpDynamicValue)
        const details = {currency: swapDetails.conversion.to , deposit: swapDetails.conversion.amount * swapDetails.conversion.rate, fromUser: '(conversion)'}

        // After 2 seconds (mock processing), show success
        setTimeout(() => {
            console.log('Mock processing done → showing success');
            openDropUp('bank-transfer-success', 'plain', details);
        }, 2000);
    };

    const handleConfirmPinFlow = (pin:string)=> {
        // Show loading immediately
        openDropUp('loading-send-money', 'handle');

        // After 2 seconds (mock processing), show success
        setTimeout(() => {
            console.log('Mock processing done → showing success');
            openDropUp(null, undefined);
            router.replace(`/(sendPages)/${sendMoneyAmount_CurrencyRoute}/transactionSuccessRoute`)
        }, 2000);
    }



    // Render selected drop-up content
    const renderDropUpContent = () => {
        if (!dropUpContent) return null;

        switch (dropUpContent) {
            case 'add-money':
                return <AddMoneyDropUp openDropUp={openDropUp} />;
            case 'send-money':
                return <SendMoneyDropUP />;
            case 'loading-send-money':
                return <LoadingDropUp_SendMoney />;
            case 'bank-transfer':
                return <BankTransferDropUpContent onConfirmTransaction={
                    () => {
                        openDropUp('loading-send-money', "handle")
                        setTimeout(() => {
                            openDropUp('bank-transfer-success', "handle")
                        }, 2000)
                    }

                } />;
            case 'bank-transfer-success':
                return <BankTransferSuccessDropUpContent amount = {dropUpDynamicValue} />;
            case 'phone-card-illustration':
                return <PhoneBehindCardIllustration cardCheck={
                    () => {
                        setTimeout(()=>{
                            openDropUp('bank-transfer-success', 'handle')
                        }, 1000)
                    }
                }  />;
            case 'select-currency':
                return <SelectCurrencyDropUpContent selectedCurrencyIndex={selectedCurrencyIndex} setSelectedCurrencyIndex={setSelectedCurrencyIndex} />;
            case 'enter-amount':
                return (
                    <EnterAmountDropUpContent
                        onSendConfirm={(amount) => {
                            setSendMoneyAmount_CurrencyRoute(amount)
                             openDropUp('confirm-pin', 'back-arrow')
                            }
                    }
                    />
                );
            case 'enter-amount-airdrop':
                return (
                    <EnterAmountDropUpContent
                        onSendConfirm={(amount) => {
                            setSendMoneyAmount_CurrencyRoute(amount)
                            openDropUp('loading-send-money', 'back-arrow');
                            setTimeout(() => {
                                router.replace('/airdrop-success')
                            }, 2000)
                        }}

                    />
                );
             case 'enter-amount-card':
                return (
                    <EnterAmountDropUpContent_Card
                        onSendConfirm={(amount) => {
                            setDropUpDynamicValue(amount)
                            openDropUp('phone-card-illustration', 'back-arrow');
                        }}
                    />
                );
            case 'confirm-pin':
                return <ConfirmPin_SendMoney
                        onConfirmPin={(pin) => {
                            handleConfirmPinFlow(pin);
                    }}
                />;
            case 'swap-confirmation':
                return <ConfirmationDropUpContext_Swap swapDetails={swapDetails} onConfirm={handleConfirmSwap} />;
             default:
                return (
                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', padding: 40 }}>
                        Unknown drop-up: {dropUpContent}
                    </Text>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContent}>
                {/* Main screen */}
                {renderMainContent()}

                {/* Drop-up overlay */}
                {showDropUp && dropUpContent && (
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={closeDropUp}>
                            <View style={styles.backdrop} />
                        </TouchableWithoutFeedback>

                        <View style={styles.sheetContainer}>
                            <View style={styles.sheet}>
                                {/* Header based on variant */}
                                {dropUpVariant === 'handle' ? (
                                    <View style={styles.handleBar} />
                                ) : dropUpVariant === 'back-arrow' ? (
                                    <View style={styles.headerWithBack}>
                                        <TouchableOpacity onPress={closeDropUp} style={styles.backIcon}>
                                            <ArrowLeft size={28} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    // 'plain' variant — no header at all (for swap confirmation)
                                    <View style={{ height: 16 }} /> // just top padding
                                )}

                                {/* Content */}
                                <View style={styles.contentPadding}>{renderDropUpContent()}</View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    innerContent: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    sheet: {
        backgroundColor: '#10182B',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        minHeight: 200,
        maxHeight: SCREEN_HEIGHT * 0.92,
    },
    handleBar: {
        width: 48,
        height: 5,
        backgroundColor: '#64748B',
        borderRadius: 999,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    headerWithBack: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    backIcon: {
        padding: 8,
    },
    contentPadding: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
});

export default CurrentPage;