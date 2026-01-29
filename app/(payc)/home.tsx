import React from "react";
import { View, StyleSheet } from "react-native";

import Onboarding from "@/payc/Onboarding/onboarding";
// import MainPage from "@/Home/mainPage";

const PayCHome = () => {
    return (
        <View style={styles.container}>
            <Onboarding />
            {/* <MainPage /> */}
        </View>
    );
};

export default PayCHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,                 // w-screen h-screen
        backgroundColor: "#0F172A",
    },
});
