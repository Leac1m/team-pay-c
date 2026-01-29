import React from 'react';
import { View, StyleSheet } from 'react-native';

import Onboarding from '@/payc/Onboarding/onboarding';
import MainPage from '@/payc/Home/mainPage';

const PayCHome = () => {
    return (
        <View style={styles.container}>
             <Onboarding />
            {/*<MainPage />*/}
        </View>
    );
};

export default PayCHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
});
