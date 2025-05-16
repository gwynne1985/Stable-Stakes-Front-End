import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';
import { InputField } from '../../InputField';

interface EditEmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onUpdate: () => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EditEmailStep: React.FC<EditEmailStepProps> = ({
  email,
  onEmailChange,
  onUpdate,
}) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [blurFired, setBlurFired] = useState(false);
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
    setIsValidEmail(emailRegex.test(text));
  };

  const handleBlur = () => {
    setShowValidation(true);
    setBlurFired(true);
  };

  const shouldShowError = showValidation && email.length > 0 && !isValidEmail;
  const shouldShowValid = showValidation && email.length > 0 && isValidEmail;

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
        <View style={{ width: scaleWidth(300), alignSelf: 'center' }}>
          <Text style={styles.header}>EDIT EMAIL</Text>
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
              textContentType="emailAddress"
              autoCorrect={false}
              spellCheck={false}
              isInvalid={shouldShowError}
              isValid={isValidEmail}
              errorMessage={shouldShowError ? 'Enter a valid email' : undefined}
            />
          </View>
          <PrimaryButton
            title="Update"
            onPress={onUpdate}
            isActive={isValidEmail}
            style={styles.updateButton}
          />
        </View>
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
  inputContainer: {
    marginBottom: scaleHeight(24),
  },
  input: {
    width: '100%',
    paddingVertical: scaleHeight(14),
    paddingLeft: scaleWidth(16),
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleWidth(18),
    borderRadius: scaleWidth(5),
    fontSize: scaleWidth(14),
    backgroundColor: '#FFF',
    borderWidth: 1,
  },
  updateButton: {
    marginTop: scaleHeight(24),
    width: '100%',
  },
}); 