import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface NameStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onNext: () => void;
}

export const NameStep: React.FC<NameStepProps> = ({
  name,
  onNameChange,
  onNext,
}) => {
  const isValidName = useMemo(() => {
    return name.trim().length >= 2 && /^[A-Za-z\s]+$/.test(name);
  }, [name]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ENTER NAME</Text>
      <Text style={styles.verificationText}>
        Please enter your full name as it appears on your golf club membership.
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={onNameChange}
        placeholder="Full name"
        placeholderTextColor="#18302A80"
        autoCapitalize="words"
      />
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValidName}
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