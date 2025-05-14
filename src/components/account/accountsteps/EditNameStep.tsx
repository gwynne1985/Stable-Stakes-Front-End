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
import { InputField } from '../../InputField';
import { PrimaryButton } from '../../PrimaryButton';

interface EditNameStepProps {
  onClose: () => void;
  onSave: (name: string) => void;
  initialName: string;
  onUpdateStart: () => void;
  onUpdate?: () => void;
}

const EditNameStep: React.FC<EditNameStepProps> = ({ 
  onClose, 
  onSave, 
  initialName,
  onUpdateStart,
  onUpdate
}) => {
  const [firstName, setFirstName] = useState(initialName.split(' ')[0] || '');
  const [lastName, setLastName] = useState(initialName.split(' ').slice(1).join(' ') || '');
  const [firstNameBlurred, setFirstNameBlurred] = useState(false);
  const [lastNameBlurred, setLastNameBlurred] = useState(false);

  const isFormValid = () => {
    return (firstName?.length ?? 0) > 0 && (lastName?.length ?? 0) > 0;
  };

  const hasNameChanged = () => {
    const initialFirstName = initialName.split(' ')[0] || '';
    const initialLastName = initialName.split(' ').slice(1).join(' ') || '';
    return firstName !== initialFirstName || lastName !== initialLastName;
  };

  const isFirstNameValid = firstNameBlurred && (firstName?.length ?? 0) > 0;
  const isLastNameValid = lastNameBlurred && (lastName?.length ?? 0) > 0;

  const handleSave = () => {
    if (isFormValid()) {
      onUpdateStart();
      onSave(`${firstName} ${lastName}`.trim());
      onUpdate?.();
      setTimeout(() => {
        onClose();
      }, 50);
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
          <Text style={styles.header}>YOUR NAME</Text>
          <View style={styles.fieldsContainer}>
            <View style={{ marginBottom: scaleHeight(16) }}>
              <InputField
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                onBlur={() => setFirstNameBlurred(true)}
                isValid={isFirstNameValid}
                autoCapitalize="words"
              />
            </View>
            <View>
              <InputField
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                onBlur={() => setLastNameBlurred(true)}
                isValid={isLastNameValid}
                autoCapitalize="words"
              />
            </View>
            <View style={{ minHeight: scaleHeight(12), marginBottom: scaleHeight(16) }} />
          </View>
          <PrimaryButton
            title="Update"
            onPress={handleSave}
            isActive={isFormValid() && hasNameChanged()}
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
  fieldsContainer: {
    marginBottom: 0,
    width: '100%',
  },
  updateButton: {
    width: '100%',
    marginTop: scaleHeight(30),
  },
});

export default EditNameStep; 