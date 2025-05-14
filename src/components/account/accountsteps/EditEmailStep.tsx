import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

interface EditEmailStepProps {
  onClose: () => void;
  onSave: (email: string) => void;
  initialEmail: string;
}

const EditEmailStep: React.FC<EditEmailStepProps> = ({ onClose, onSave, initialEmail }) => {
  const [email, setEmail] = useState(initialEmail);

  const handleSave = () => {
    onSave(email);
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#707070"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(20),
    backgroundColor: '#1A1A1A',
  },
  label: {
    color: '#FFFFFF',
    fontSize: scaleWidth(16),
    fontFamily: 'Poppins',
    marginBottom: scaleHeight(8),
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: scaleWidth(8),
    padding: scaleWidth(12),
    color: '#FFFFFF',
    fontSize: scaleWidth(16),
    fontFamily: 'Poppins',
    marginBottom: scaleHeight(20),
  },
  saveButton: {
    backgroundColor: '#4EDD69',
    borderRadius: scaleWidth(8),
    padding: scaleWidth(12),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: scaleWidth(16),
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});

export default EditEmailStep; 