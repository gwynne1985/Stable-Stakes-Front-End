import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface PasswordStepProps {
  password: string;
  onPasswordChange: (password: string) => void;
  onNext: () => void;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({
  password,
  onPasswordChange,
  onNext,
}) => {
  const isValidPassword = useMemo(() => {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  }, [password]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CREATE PASSWORD</Text>
      <Text style={styles.verificationText}>
        Create a secure password for your account. Use at least 8 characters with a mix of letters and numbers.
      </Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Enter password"
        placeholderTextColor="#18302A80"
        secureTextEntry
      />
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValidPassword}
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