import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
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
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={scaleHeight(35)}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>CREATE PASSWORD</Text>
        <Text style={styles.instructions}>
          Minimum 8 characters, including an uppercase letter, number, and special character. No spaces.
        </Text>
        <View style={styles.fieldsContainer}>
          <PasswordFields
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
            shouldValidate={true}
          />
        </View>
        <PrimaryButton
          title="Next"
          onPress={() => onNext(password)}
          isActive={isValid}
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
  instructions: {
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
    marginBottom: scaleHeight(24),
  },
  fieldsContainer: {
    marginBottom: scaleHeight(24),
    width: '100%',
  },
  nextButton: {
    width: '100%',
    marginTop: scaleHeight(24),
  },
}); 