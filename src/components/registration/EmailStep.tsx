import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface EmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({
  email,
  onEmailChange,
  onNext,
}) => {
  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ENTER EMAIL</Text>
      <Text style={styles.verificationText}>
        We'll send a <Text style={styles.boldText}>verification code</Text> to your Inbox to confirm your email address.
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={onEmailChange}
        placeholder="Email"
        placeholderTextColor="#18302A80"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValidEmail}
        style={styles.nextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(24),
  },
  header: {
    position: 'absolute',
    top: scaleHeight(53),
    left: scaleWidth(30),
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    color: '#18302A',
  },
  verificationText: {
    position: 'absolute',
    top: scaleHeight(90),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
  },
  input: {
    marginTop: scaleHeight(130),
    height: scaleHeight(48),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: scaleWidth(16),
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    color: '#18302A',
    marginBottom: scaleHeight(24),
  },
  nextButton: {
    alignSelf: 'center',
  },
}); 