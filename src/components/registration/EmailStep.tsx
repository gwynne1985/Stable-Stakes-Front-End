import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import { InputField } from '../InputField';
import { SimpleSlidingPanel } from '../panels/SimpleSlidingPanel';
import { sendVerificationCode } from '../../services/verification';

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
  const [blurFired, setBlurFired] = useState(false);
  const typingTimeout = useRef<any>(null);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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

  const handleBlur = async () => {
    setShowValidation(true);
    setBlurFired(true);
    // TODO: Replace this with real backend check
    // Simulate async check for email already in use
    if (email === 'taken@example.com') {
      setIsEmailTaken(true);
    } else {
      setIsEmailTaken(false);
    }
  };

  const shouldShowError = showValidation && email.length > 0 && !isValidEmail;
  const shouldShowValid = showValidation && email.length > 0 && isValidEmail;

  const handleNext = async () => {
    if (!isValidEmail) return;
    
    try {
      await sendVerificationCode(email);
      onNext();
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to send verification code. Please try again.'
      );
    }
  };

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
        scrollEnabled={!showPrivacy && !showTerms}
      >
        <View style={{ width: scaleWidth(300), alignSelf: 'center' }}>
          <Text style={styles.header}>ENTER EMAIL</Text>
          <Text style={styles.verificationText}>
            We'll send a verification code to your Inbox to confirm your email address.
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
              textContentType="emailAddress"
              autoCorrect={false}
              spellCheck={false}
              isInvalid={shouldShowError || isEmailTaken}
              isValid={isValidEmail && !isEmailTaken}
              errorMessage={
                shouldShowError
                  ? 'Enter a valid email'
                  : isEmailTaken
                    ? 'This email is already in use'
                    : undefined
              }
            />
          </View>
          <Text style={styles.legalCopy}>
            By continuing, I agree to Stable Stakes{' '}
            <Text style={styles.legalLink} onPress={() => setShowPrivacy(true)}>Privacy Policy</Text> and{' '}
            <Text style={styles.legalLink} onPress={() => setShowTerms(true)}>Terms of Use</Text>.
          </Text>
          <PrimaryButton
            title="Next"
            onPress={handleNext}
            isActive={isValidEmail}
            style={styles.nextButton}
          />
        </View>
        <SimpleSlidingPanel
          isVisible={showPrivacy}
          title="Privacy Policy"
          onClose={() => setShowPrivacy(false)}
        >
          <Text style={{ padding: 20 }}>
            Dummy Privacy Policy: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nunc ut laoreet dictum, urna massa dictum enim, at cursus enim sapien eget urna.
          </Text>
        </SimpleSlidingPanel>
        <SimpleSlidingPanel
          isVisible={showTerms}
          title="Terms of Use"
          onClose={() => setShowTerms(false)}
        >
          <Text style={{ padding: 20 }}>
            Dummy Terms of Use: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nunc ut laoreet dictum, urna massa dictum enim, at cursus enim sapien eget urna.
          </Text>
        </SimpleSlidingPanel>
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
    paddingVertical: scaleHeight(14),
    paddingLeft: scaleWidth(16),
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleWidth(18),
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