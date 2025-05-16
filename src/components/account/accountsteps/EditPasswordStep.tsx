import React, { useState } from 'react';
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

interface EditPasswordStepProps {
  onClose: () => void;
  onUpdate: (currentPassword: string, newPassword: string) => void;
}

export const EditPasswordStep: React.FC<EditPasswordStepProps> = ({ onClose, onUpdate }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidPassword = (pw: string) => {
    const hasMinLength = pw.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
    const hasNoSpaces = !/\s/.test(pw);
    return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar && hasNoSpaces;
  };

  const isFormValid = () => {
    return currentPassword.length > 0 && isValidPassword(newPassword);
  };

  const handleUpdate = () => {
    setTouched(true);
    if (isFormValid()) {
      onUpdate(currentPassword, newPassword);
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
      >
        <View style={{ width: scaleWidth(300), alignSelf: 'center' }}>
          <Text style={styles.header}>EDIT PASSWORD</Text>
          <Text style={styles.instructions}>
            Minimum 8 characters, including an uppercase letter, number, and special character. No spaces.
          </Text>
          <View style={styles.fieldsContainer}>
            <InputField
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              autoCapitalize="none"
              style={styles.input}
              onBlur={() => setTouched(true)}
            />
            <InputField
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
              style={styles.input}
              onBlur={() => setTouched(true)}
              isInvalid={touched && !isValidPassword(newPassword) && newPassword.length > 0}
              errorMessage={
                touched && newPassword.length > 0 && !isValidPassword(newPassword)
                  ? 'Password must be 8+ chars, uppercase, number, special char, no spaces.'
                  : undefined
              }
            />
          </View>
          <PrimaryButton
            title="Update"
            onPress={handleUpdate}
            isActive={isFormValid()}
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
    marginBottom: 0,
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: scaleHeight(16),
  },
  updateButton: {
    width: '100%',
    marginTop: 0,
  },
}); 