// payc/Home/DropUps/DropUpComponent.tsx

import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

// import LoadingDropUp_SendMoney from '@/payc/Home/main/sendMoney/LoadingDropUp_SendMoney';
import SendMoneyDropUP from '@/payc/Home/main/sendMoney/sendMoneyDropUP';
// import AddMoneyDropUp from '@/payc/Home/main/addMoney/addMoneyDropUp';
// import BankTransferDropUpContent from '@/payc/Home/main/addMoney/BankTransferDropUpContent';
// import BankTransferSuccessDropUpContent from '@/payc/Home/main/addMoney/BankTransferSuccessDropUpContent';
// import {ArrowLeft} from "lucide-react-native";
// import PhoneBehindCardIllustration from '@/payc/Home/main/addMoney/PhoneBehindCardIllustration';
// import SelectCurrencyDropUpContent from '@/payc/Home/main/currency/SelectCurrencyDropUpContent';
// import EnterAmountDropUpContent from "@/payc/Home/main/sendMoney/EnterAmountDropUpContent";
// import ConfirmPin_SendMoney from "@/payc/Home/main/sendMoney/ConfirmPin_SendMoney";
//


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DropUpComponent = () => {
    const handleBackdropPress = () => {
        // Placeholder — implement close behavior here (e.g. via context, redux, props)
        console.log('Backdrop pressed — should close drop-up');
    };

    return (
        <View style={styles.overlay}>
            {/* Backdrop — taps outside the sheet can close it */}
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            {/* The actual bottom sheet content */}
            <View style={styles.sheetContainer}>
                <View style={styles.sheet}>
                    {/* Drag handle bar */}
                    <View style={styles.handleBar} />

                    {/* Active content — same as web: only one is rendered at a time */}
                     <SendMoneyDropUP />
                    {/* <LoadingDropUp_SendMoney />*/}
                    {/* <AddMoneyDropUp />*/}

                     {/*<BankTransferDropUpContent />*/}
                    {/* <BankTransferSuccessDropUpContent /> */}
                    {/* <PhoneBehindCardIllustration />*/}

                    {/*<SelectCurrencyDropUpContent />*/}


                    {/*<SelectCurrencyDropUpContent />*/}
                </View>

                {/* Commented second sheet — preserved exactly */}
             {/*   <View style={styles.sheet}>*/}
             {/*   <View>*/}
             {/*       <ArrowLeft size={28} color={'#ffffff'} />*/}
             {/*    </View>*/}

             {/*/!*<EnterAmountDropUpContent />*!/*/}
             {/*<ConfirmPin_SendMoney />*/}
             {/*</View>*/}
            </View>
        </View>
)};

export default DropUpComponent;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 30,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // ≈ bg-black/60
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    sheet: {
        width: '100%',
        backgroundColor: '#10182B',
        borderTopLeftRadius: 32,    // ≈ rounded-t-4xl (large radius)
        borderTopRightRadius: 32,
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 40,          // extra safe area padding
        minHeight: 50,
        // Shadow for depth (optional but looks nice)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 12,
    },
    handleBar: {
        width: 48,
        height: 4,
        backgroundColor: '#94A3B8', // ≈ slate-400
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
});