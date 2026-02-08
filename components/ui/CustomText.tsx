// components/ui/Text.tsx
import React from 'react';
import { Text as ReactText, TextProps, StyleProp, TextStyle } from 'react-native';

// ────────────────────────────────────────────────
// Inter – default body / paragraph text
// ────────────────────────────────────────────────

export function InterText({
                          style,
                          ...props
                      }: TextProps) {
    return (
        <ReactText
            style={[{ fontFamily: 'Inter' }, style]}
            {...props}
        />
    );
}

// ────────────────────────────────────────────────
// SpaceGrotesk – for headings, balances, accents
// ────────────────────────────────────────────────

export function SpaceGroteskText({
                                 style,
                                 ...props
                             }: TextProps) {
    return (
        <ReactText
            style={[{ fontFamily: 'SpaceGrotesk' }, style]}
            {...props}
        />
    );
}

// Optional: if you want the bold variant as a separate component
export function SpaceGroteskBold({
                                     style,
                                     ...props
                                 }: TextProps) {
    return (
        <ReactText
            style={[{ fontFamily: 'SpaceGrotesk_Bold' }, style]}
            {...props}
        />
    );
}

export function Text({
                              style,
                              ...props
                          }: TextProps) {
    return (
        <ReactText
            style={[{ fontFamily: 'Inter' }, style]}
            {...props}
        />
    );
}