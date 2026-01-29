// payc/Home/DropUps/ConfirmPin_SendMoney.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { eyeOnShield } from '@/payc/constants/images';
import { Scan, ArrowLeft } from 'lucide-react-native';
import {eyeOnShield} from "@/payc/constants/images";

interface ConfirmPinProps {
    onConfirmPin: (arg: string) => void;
}


const ConfirmPin_SendMoney = ({ onConfirmPin }: ConfirmPinProps ) => {
    const [pinInput, setPinInput] = useState<(string | null)[]>([null, null, null, null]);
    const [currentNumber, setCurrentNumber] = useState(0);


    const handleSubmit = () => {
        onConfirmPin(pinInput.join(''))
    }
    const checkPinCount = () =>{
        if (currentNumber > 3){
            handleSubmit()
        }
    }
    checkPinCount()


    const handleKeyPress = (key: string) => {
        if (key === 'back') {
            setPinInput(pinInput.with(currentNumber - 1, null)) ;
            // pinInputVar[currentNumber - 1] = null;
            // setPinInput(pinInputVar);
            setCurrentNumber(Math.max(currentNumber - 1, 0));

        } else {


            setPinInput(pinInput.with(currentNumber, key)) ;
            setCurrentNumber(Math.min(currentNumber + 1, 4));
            if (currentNumber > 3){
                checkPinCount()
                return
            }
        }
    };




    // Note: This is static for now — in real app you'd use onPress handlers + state update

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <Image source={eyeOnShield} style={styles.shieldIcon} resizeMode="contain" />

                <Text style={styles.title}>Confirm PIN</Text>
                <Text style={styles.subtitle}>
                    Enter your PIN to authorize this transaction
                </Text>
            </View>

            <View style={styles.pinDisplay}>
                {pinInput.map((digit, i) => (
                    <View key={i} style={styles.pinDot}>
                        <Text style={styles.pinText}>{digit === null ? '–' : digit}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.keypadContainer}>
                <View style={styles.keypadRow}>
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity key={num}  onPress={() => handleKeyPress(num.toString())} style={styles.keyButton} activeOpacity={0.7}>
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.keypadRow}>
                    {[4, 5, 6].map((num) => (
                        <TouchableOpacity key={num}  onPress={() => handleKeyPress(num.toString())}  style={styles.keyButton} activeOpacity={0.7}>
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.keypadRow}>
                    {[7, 8, 9].map((num) => (
                        <TouchableOpacity  key={num} onPress={() => handleKeyPress(num.toString())} style={styles.keyButton} activeOpacity={0.7}>
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.keypadRow}>
                    <TouchableOpacity style={styles.keyButton} activeOpacity={0.7}>
                        <Scan size={28} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => handleKeyPress('0')} style={styles.keyButton} activeOpacity={0.7}>
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleKeyPress('back')} style={styles.keyButton} activeOpacity={0.7}>
                        <ArrowLeft size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ConfirmPin_SendMoney;

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerSection: { alignItems: 'center', marginTop: 12 },
    shieldIcon: { width: 64, height: 64 },
    title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 16 },
    subtitle: { fontSize: 16, color: 'white', textAlign: 'center', marginTop: 8, width: '90%' },

    pinDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 48,
    },
    pinDot: {
        height: 60,
        width: 56,
        borderRadius: 6,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinText: { fontSize: 32, fontWeight: 'bold', color: '#3B82F6' },

    keypadContainer: { marginTop: 48, paddingBottom: 48, gap: 16 },
    keypadRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
    keyButton: {
        flex: 1,
        height: 48,
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: { color: 'white', fontSize: 24, fontWeight: '800' },
});