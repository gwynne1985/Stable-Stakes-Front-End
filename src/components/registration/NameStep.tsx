import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import { InputField } from '../InputField';

interface NameStepProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;
  onNext: () => void;
}

export const NameStep: React.FC<NameStepProps> = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onNext,
}) => {
  const isFormValid = () => {
    return (firstName?.length ?? 0) > 0 && (lastName?.length ?? 0) > 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NAME</Text>
      
      <View style={styles.fieldsContainer}>
        <InputField
          placeholder="First Name"
          value={firstName}
          onChangeText={onFirstNameChange}
          style={styles.input}
        />

        <InputField
          placeholder="Last Name"
          value={lastName}
          onChangeText={onLastNameChange}
          style={styles.input}
        />
      </View>
      
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isFormValid()}
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
  fieldsContainer: {
    position: 'absolute',
    top: scaleHeight(196),
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: scaleWidth(30),
  },
  input: {
    width: scaleWidth(300),
    paddingVertical: scaleWidth(16),
    paddingLeft: scaleWidth(16),
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    borderRadius: scaleWidth(5),
    fontSize: scaleWidth(14),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(96, 133, 123, 0.50)',
    color: 'rgba(96, 133, 123, 0.50)',
    marginBottom: scaleHeight(16),
  },
  nextButton: {
    position: 'absolute',
    top: scaleHeight(495),
    alignSelf: 'center',
  },
}); 