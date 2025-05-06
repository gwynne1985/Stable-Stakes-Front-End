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
import { InputField } from '../InputField';
import { PrimaryButton } from '../PrimaryButton';

interface NameStepProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (name: string) => void;
  onLastNameChange: (name: string) => void;
  onNext: () => void;
}

export const NameStep: React.FC<NameStepProps> = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onNext,
}) => {
  const [firstNameBlurred, setFirstNameBlurred] = useState(false);
  const [lastNameBlurred, setLastNameBlurred] = useState(false);

  const isFormValid = () => {
    return (firstName?.length ?? 0) > 0 && (lastName?.length ?? 0) > 0;
  };

  const isFirstNameValid = firstNameBlurred && (firstName?.length ?? 0) > 0;
  const isLastNameValid = lastNameBlurred && (lastName?.length ?? 0) > 0;

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
          <Text style={styles.header}>YOUR NAME</Text>
          <Text style={styles.bodyText}>
            Let us know what you like to be called so we{"\n"}
            can personalise your app experience.{"\n"}
            <Text style={{ color: '#E3E3E3' }}>…………..</Text>
          </Text>
          <View style={styles.fieldsContainer}>
            <View style={{ marginBottom: scaleHeight(16) }}>
              <InputField
                placeholder="First Name"
                value={firstName}
                onChangeText={onFirstNameChange}
                onBlur={() => setFirstNameBlurred(true)}
                isValid={isFirstNameValid}
                autoCapitalize="words"
              />
            </View>
            <View>
              <InputField
                placeholder="Last Name"
                value={lastName}
                onChangeText={onLastNameChange}
                onBlur={() => setLastNameBlurred(true)}
                isValid={isLastNameValid}
                autoCapitalize="words"
              />
            </View>
            <View style={{ minHeight: scaleHeight(12), marginBottom: scaleHeight(16) }} />
          </View>
          <PrimaryButton
            title="Next"
            onPress={onNext}
            isActive={isFormValid()}
            style={styles.nextButton}
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
  bodyText: {
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
  },
  nextButton: {
    width: '100%',
    marginTop: scaleHeight(10),
  },
}); 