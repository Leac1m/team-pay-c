// payc/contexts/DropUpContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type DropUpVariant = 'handle' | 'back-arrow';

type DropUpContentType =
    | 'add-money'
    | 'send-money'
    | 'bank-transfer'
    | 'bank-transfer-success'
    | 'select-currency'
    | 'enter-amount'
    | 'confirm-pin'
    | 'phone-card-illustration'
    | 'loading-send-money'
| null;

interface DropUpContextType {
    isVisible: boolean;
    variant: DropUpVariant;
    contentType: DropUpContentType;
    openDropUp: (type: DropUpContentType, variant?: DropUpVariant) => void;
    closeDropUp: () => void;
}

const DropUpContext = createContext<DropUpContextType | undefined>(undefined);

export const DropUpProvider = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [contentType, setContentType] = useState<DropUpContentType>(null);
    const [variant, setVariant] = useState<DropUpVariant>('handle');

    const openDropUp = (type: DropUpContentType, v: DropUpVariant = 'handle') => {
        console.log(`[DropUpProvider] openDropUp called → type: ${type}, variant: ${v}`);

        setContentType(type);
        setVariant(v);
        setIsVisible(true);

        console.log('[DropUpProvider] State updated →', { isVisible: true, contentType: type, variant: v });
    };

    const closeDropUp = () => {
        console.log('[DropUpProvider] closeDropUp called');
        setIsVisible(false);
        setTimeout(() => {
            setContentType(null);
            console.log('[DropUpProvider] Content cleared after delay');
        }, 300);
    };

    return (
        <DropUpContext.Provider
            value={{ isVisible, contentType, variant, openDropUp, closeDropUp }}
        >
            {children}
        </DropUpContext.Provider>
    );
};

export const useDropUp = () => {
    const context = useContext(DropUpContext);
    if (!context) {
        throw new Error('useDropUp must be used within DropUpProvider');
    }
    return context;
};