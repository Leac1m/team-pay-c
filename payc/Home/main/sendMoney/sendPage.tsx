// payc/Home/main/sendMoney/SendPage.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Platform,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import {router} from "expo-router";


interface SendPageProps {
    onSendPress: () => void;  // Called when user taps "Send Money"
}

const SendPage = ({ onSendPress }: SendPageProps) => {
    const [paycTag, setPaycTag] = useState('');
    const [description, setDescription] = useState('');
    const [saveToBeneficiaries, setSaveToBeneficiaries] = useState(false);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header / Back */}
                <TouchableOpacity onPress={() =>router.replace('/profile')} style={styles.backButton} activeOpacity={0.7}>
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.pageTitle}>Send Money</Text>

                <View style={styles.formContainer}>
                    {/* PayC Tag field */}
                    <View>
                        <Text style={styles.label}>PayC Tag</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="@johndoe"
                            placeholderTextColor="#94A3B8"
                            value={paycTag}
                            onChangeText={setPaycTag}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {/* Preview / Account name suggestion */}
                        <View style={styles.previewContainer}>
                            <Text style={styles.previewName}>John Doe Sept</Text>
                            <Text style={styles.previewLabel}>Account name</Text>
                        </View>
                    </View>

                    {/* Description field + Checkbox */}
                    <View style={{ marginTop: 24 }}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Add a short note"
                            placeholderTextColor="#94A3B8"
                            value={description}
                            onChangeText={setDescription}
                        />

                        <View style={styles.beneficiaryOptions}>
                            <TouchableOpacity
                                style={styles.checkboxRow}
                                activeOpacity={0.7}
                                onPress={() => setSaveToBeneficiaries(!saveToBeneficiaries)}
                            >
                                <View
                                    style={[
                                        styles.customCheckbox,
                                        saveToBeneficiaries && styles.customCheckboxChecked,
                                    ]}
                                >
                                    {saveToBeneficiaries && <View style={styles.checkboxInner} />}
                                </View>
                                <Text style={styles.checkboxLabel}>Send to beneficiaries</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    router.push('/beneficiaries');           // ← this line does the navigation
                                }}
                            >
                                <Text style={styles.viewLink}>View beneficiaries</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Fixed bottom button */}
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                        style={styles.sendButton}
                        activeOpacity={0.85}
                        onPress={onSendPress}  // ← parent handles drop-up
                    >
                        <Text style={styles.sendButtonText}>Send Money</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SendPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A', // dark background (adjust to your theme)
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        position: 'relative',
    },
    backButton: {
        paddingTop: Platform.OS === 'ios' ? 8 : 24,
        paddingBottom: 12,
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
    },
    formContainer: {
        marginTop: 32,
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: '#D1D5DB', // neutral-300
        fontWeight: '600',
    },
    input: {
        height: 48,
        marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#334155', // slate-700 approx for _payc-btn-border
        borderRadius: 6,
        color: 'white',
        fontSize: 14,
    },
    previewContainer: {
        alignItems: 'flex-end',
        marginTop: 8,
    },
    previewName: {
        color: '#00DC8A',
        fontSize: 14,
    },
    previewLabel: {
        color: 'white',
        fontWeight: '600',
        marginTop: 2,
        fontSize: 13,
    },
    beneficiaryOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    customCheckbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#334155',
        backgroundColor: '#182C53',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customCheckboxChecked: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    checkboxInner: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: 'white',
    },
    checkboxLabel: {
        color: '#D1D5DB',
        fontSize: 14,
        fontWeight: '600',
    },
    viewLink: {
        color: '#3B82F6',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 40 : 60,
        left: 32,
        right: 32,
    },
    sendButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});