import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface VerificationStepProps {
  code: string;
  onCodeChange: (code: string) => void;
  onNext: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  code,
  onCodeChange,
  onNext,
}) => {
  const isValidCode = useMemo(() => {
    return code.length === 5 && /^\d+$/.test(code);
  }, [code]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ENTER CODE</Text>
      <Text style={styles.verificationText}>
        Please enter the 5-digit verification code we sent to your email address.
      </Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={onCodeChange}
        placeholder="Enter verification code"
        placeholderTextColor="#18302A80"
        keyboardType="number-pad"
        maxLength={5}
      />
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValidCode}
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