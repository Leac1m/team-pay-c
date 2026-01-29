import {ArrowRightLeft, Coins, Wallet} from "lucide-react-native";
import {router} from "expo-router";
import React from "react";

export  const footerNavs = [
    { label: 'Tokens', icon: <Coins size={20} /> , action: () => router.replace('/portfolio')},
    { label: 'Wallet', icon: <Wallet size={20} /> , action: () => router.replace('/profile') },
    { label: 'Swap', icon: <ArrowRightLeft size={20} /> , action: () => router.replace('/swap')},
];