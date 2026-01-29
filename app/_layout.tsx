// app/_layout.tsx

import { Stack, router } from 'expo-router';
import {DropUpProvider} from "@/payc/contexts/DropUpContexts";


DropUpProvider
export default function RootLayout() {
    return (
            <Stack screenOptions={{ headerShown: false }}>
                {/* Start with onboarding */}
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />

                {/* Main app after onboarding */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
    );
}