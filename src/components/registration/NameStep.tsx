import React from 'react';
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
  const isFormValid = () => {
    return (firstName?.length ?? 0) > 0 && (lastName?.length ?? 0) > 0;
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
        <Text style={styles.header}>YOUR NAME</Text>
        <Text style={styles.bodyText}>
          Let us know what you like to be called so we can personalise your app experience.
        </Text>
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
    width: '100%',
    marginTop: scaleHeight(24),
  },
}); 