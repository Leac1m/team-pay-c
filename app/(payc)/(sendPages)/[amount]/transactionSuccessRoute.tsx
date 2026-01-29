import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
// import TransactionSuccessPage from "@/app/(payc)/(sendPages)/transactionSuccessPage";
import React from "react";
import TransactionSuccessPage from "@/payc/Home/main/sendMoney/TransactionSuccessPage";

export default function TransactionSuccessRoute() {
    const { amount } = useLocalSearchParams<{ amount: string }>();

    return (
        <TransactionSuccessPage amount={amount} />
    );
}

