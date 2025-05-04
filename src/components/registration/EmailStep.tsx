import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import { InputField } from '../InputField';

interface EmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmailStep: React.FC<EmailStepProps> = ({
  email,
  onEmailChange,
  onNext,
}) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounced validation
  useEffect(() => {
    if (!showValidation) return;
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setIsValidEmail(emailRegex.test(email));
    }, 500);
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, showValidation]);

  const handleChange = (text: string) => {
    onEmailChange(text);
    setShowValidation(false);
    setIsValidEmail(false);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setShowValidation(true);
      setIsValidEmail(emailRegex.test(text));
    }, 500);
  };

  const handleBlur = () => {
    setShowValidation(true);
    setIsValidEmail(emailRegex.test(email));
  };

  const shouldShowError = showValidation && email.length > 0 && !isValidEmail;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={scaleHeight(35)}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>ENTER EMAIL</Text>
        <Text style={styles.verificationText}>
          We'll send a <Text style={styles.boldText}>verification code</Text> to your Inbox to confirm your email address.
        </Text>
        <View style={styles.inputContainer}>
          <InputField
            style={styles.input}
            value={email}
            onChangeText={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            placeholderTextColor="rgba(96, 133, 123, 0.50)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            isInvalid={shouldShowError}
            errorMessage={shouldShowError ? 'Enter a valid email' : undefined}
          />
        </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(53),
    paddingBottom: scaleHeight(40),
  },
  container: {
    flex: 1,
  },
  header: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    color: '#18302A',
    marginBottom: scaleHeight(8),
  },
  verificationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
    marginBottom: scaleHeight(24),
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
  },
  inputContainer: {
    marginBottom: scaleHeight(24),
  },
  input: {
    width: '100%',
    paddingVertical: scaleWidth(16),
    paddingLeft: scaleWidth(16),
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined, // normal
    borderRadius: scaleWidth(5),
    fontSize: scaleWidth(14), // default to active size
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
    marginTop: scaleHeight(24),
    width: '100%',
  },
  legalCopy: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: scaleHeight(19.236),
    marginBottom: scaleHeight(8),
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
}); 