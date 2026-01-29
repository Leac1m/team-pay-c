// payc/Onboarding/Onboarding.tsx

import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

// Import your screens
import Screen1 from '@/payc/Onboarding/Screens/screen1';
import Screen2 from '@/payc/Onboarding/Screens/screen2';
import Screen3 from '@/payc/Onboarding/Screens/screen3';

// Final destination after onboarding (for now)
import ProfilePage from '@/payc/Home/main/profilePage';
import CurrentPage from "@/payc/Home/focus/currentPage";

const Onboarding = () => {
    const [currentScreen, setCurrentScreen] = useState(0);

    const goToNextScreen = () => {
        if (currentScreen < 2) {
            setCurrentScreen(currentScreen + 1);
        } else {
            // After screen 3 → go to profile (or main app)
            setCurrentScreen(3); // we use 3 as "finished" state
        }
    };

    const handleSignIn = () => {
        // For now: both Google & Email go to ProfilePage
        setCurrentScreen(3);
    };

    // Render the appropriate screen
    const renderScreen = () => {
        switch (currentScreen) {
            case 0:
                return <Screen1 onNext={goToNextScreen} />;
            case 1:
                return <Screen2 onNext={goToNextScreen} />;
            case 2:
                return <Screen3 onNext={goToNextScreen} onSignIn={handleSignIn} />;
            case 3:
                return <CurrentPage />;
            default:
                return <Screen1 onNext={goToNextScreen} />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
            {renderScreen()}
        </SafeAreaView>
    );
};

export default Onboarding;