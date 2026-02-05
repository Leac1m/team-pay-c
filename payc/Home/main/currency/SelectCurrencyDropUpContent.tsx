// payc/Home/DropUps/SelectCurrencyDropUpContent.tsx

import React, {Dispatch, SetStateAction, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {currencies} from "@/payc/constants/images";
// import { currencies } from '@/payc/constants/images';

const SelectCurrencyDropUpContent = ({selectedCurrencyIndex, setSelectedCurrencyIndex} : {selectedCurrencyIndex: number, setSelectedCurrencyIndex: Dispatch<SetStateAction<number>>}) => {

    const handleCurrencySwitch = (index : number) => {
        setSelectedCurrencyIndex(index)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Currency</Text>

            <View style={styles.list}>
                {currencies.map((currency, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={
                            () => handleCurrencySwitch(index)
                        }
                        style={[
                            styles.currencyItem,
                            index === selectedCurrencyIndex && styles.currencyItemSelected,
                        ]}
                    >
                        <Image
                            source={currency.img}
                            style={styles.currencyIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.currencyText}>
                            {currency.title} ({currency.code})
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default SelectCurrencyDropUpContent;

const styles = StyleSheet.create({
    container: { paddingHorizontal: 8 },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5,
        marginTop: 48,
    },
    list: { marginTop: 24, gap: 12, paddingBottom: 80 },
    currencyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        gap: 16,
    },
    currencyItemSelected: {
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59,130,246,0.1)',
    },
    currencyIcon: { height: 32, width: 32 },
    currencyText: { color: 'white', fontSize: 14 },
});