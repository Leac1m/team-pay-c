// payc/Home/main/sendMoney/searchBeneficiaries.tsx

import React from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Plus, Search } from 'lucide-react-native';
import {router} from "expo-router";

const SearchBeneficiaries = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={() => {
                        router.push('/send');           // ← this line does the navigation
                    }}
                    style={styles.backButton}
                >
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.title}>Send Money</Text>

                <View style={styles.form}>
                    <View style={styles.searchContainer}>
                        <Search size={20} color="#3B82F6" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="search beneficiaries"
                            placeholderTextColor="#94A3B8"
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity style={styles.newAccountRow}>
                        <Plus size={20} color="white" />
                        <Text style={styles.newAccountText}>New account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SearchBeneficiaries;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    content: { flex: 1, paddingHorizontal: 32 },
    backButton: { paddingTop: 24, paddingBottom: 8 },
    title: { fontSize: 30, fontWeight: 'bold', color: 'white', paddingTop: 24 },
    form: { marginTop: 32 },
    searchContainer: {
        position: 'relative',
        marginTop: 8,
    },
    searchIcon: { position: 'absolute', left: 16, top: 14, zIndex: 1 },
    searchInput: {
        height: 48,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 6,
        color: 'white',
        fontSize: 14,
        paddingLeft: 48,
    },
    newAccountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        marginTop: 48,
        gap: 32,
    },
    newAccountText: { color: 'white', fontSize: 14 },
});