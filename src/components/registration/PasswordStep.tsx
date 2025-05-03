import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PasswordFields } from '../PasswordFields';
import { PrimaryButton } from '../PrimaryButton';

interface PasswordStepProps {
  onNext: (password: string) => void;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({ onNext }) => {
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setIsValid(true);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    // Additional validation if needed
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? scaleHeight(35) : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
      >
        {/* Extra top spacer for more scroll/bounce */}
        <View style={{ height: scaleHeight(80) }} />

        <View style={styles.content}>
          <Text style={styles.title}>CREATE PASSWORD</Text>
          <Text style={styles.instructions}>
            Minimum 8 characters, including an uppercase letter, number, and special character. No spaces.
          </Text>
        </View>

        <View style={styles.fieldsContainer}>
          <PasswordFields
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
            shouldValidate={true}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Next"
            onPress={() => onNext(password)}
            isActive={isValid}
          />
        </View>

        {/* Extra bottom spacer for more scroll/bounce */}
        <View style={{ height: scaleHeight(120) }} />

        {/* Haptic test button */}
        <TouchableOpacity
          style={styles.hapticTestButton}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <Text style={styles.hapticTestText}>Test Haptic</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(30),
    paddingBottom: scaleHeight(40),
  },
  content: {
    paddingTop: scaleHeight(20),
    marginBottom: scaleHeight(40),
  },
  title: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    letterSpacing: scaleWidth(-0.2),
    textTransform: 'uppercase',
    marginBottom: scaleHeight(8),
  },
  instructions: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    lineHeight: scaleHeight(20),
  },
  fieldsContainer: {
    marginBottom: scaleHeight(40),
  },
  buttonContainer: {
    marginBottom: scaleHeight(40),
  },
  hapticTestButton: {
    marginTop: scaleHeight(40),
    alignSelf: 'center',
    backgroundColor: '#18302A',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(24),
    borderRadius: 8,
  },
  hapticTestText: {
    color: '#fff',
    fontSize: scaleWidth(16),
    fontWeight: 'bold',
  },
}); 