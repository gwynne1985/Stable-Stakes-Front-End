import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

interface PrivacyPolicyStepProps {
  onClose: () => void;
}

const PrivacyPolicyStep: React.FC<PrivacyPolicyStepProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      {/* Add your privacy policy content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0E6FF',
    padding: scaleWidth(20),
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '800',
    marginBottom: scaleHeight(20),
  }
});

export default PrivacyPolicyStep; 