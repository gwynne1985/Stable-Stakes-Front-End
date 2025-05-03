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
        style={[
          styles.input,
          email.length === 0
            ? styles.inputInactive
            : isValidEmail
            ? styles.inputValid
            : styles.inputInvalid,
        ]}
        value={email}
        onChangeText={onEmailChange}
        placeholder="Email"
        placeholderTextColor="rgba(96, 133, 123, 0.50)"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Text style={styles.legalCopy}>
        By continuing, I agree to Stable Stakes{' '}
        <Text style={styles.legalLink}>Privacy Policy</Text> and{' '}
        <Text style={styles.legalLink}>Terms of Use</Text>.
      </Text>
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
    top: scaleHeight(110),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
  },
  input: {
    width: scaleWidth(300),
    paddingVertical: scaleWidth(16),
    paddingLeft: scaleWidth(16),
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined, // normal
    borderRadius: scaleWidth(5),
    fontSize: scaleWidth(14), // default to active size
    marginTop: scaleHeight(196),
    marginBottom: scaleHeight(24),
    backgroundColor: '#FFF',
    borderWidth: 1,
  },
  inputInactive: {
    color: 'rgba(96, 133, 123, 0.50)',
    borderColor: 'rgba(96, 133, 123, 0.50)',
    letterSpacing: 0,
  },
  inputValid: {
    color: '#18302A',
    borderColor: '#4EDD69',
    letterSpacing: scaleWidth(-0.28),
  },
  inputInvalid: {
    color: '#18302A',
    borderColor: '#FE606E',
    letterSpacing: 0,
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: scaleHeight(40),
  },
  legalCopy: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: scaleHeight(19.236),
    marginTop: 0,
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
}); 