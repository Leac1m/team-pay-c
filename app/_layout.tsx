// app/_layout.tsx

import {Stack, router, SplashScreen} from 'expo-router';
import {DropUpProvider} from "@/payc/contexts/DropUpContexts";


import * as Font from 'expo-font';
import { useEffect } from 'react';
import {useFonts} from "expo-font";

// ...
import { setCustomText } from 'react-native-global-props';


export default function RootLayout() {

    const [loaded] = useFonts({
        SpaceGrotesk_Bold: require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
        SpaceGrotesk: require('../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf'),
        Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
        Lexend: require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            setCustomText({
                style: {
                    fontFamily: 'Inter', // ← your regular / default weight

                },
                allowFontScaling: true,
            });

            SplashScreen.hideAsync();
        }
    }, [loaded]);


    return (
            <Stack screenOptions={{ headerShown: false }}>
                {/* Start with onboarding */}
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />

                {/* Main app after onboarding */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
    );
}