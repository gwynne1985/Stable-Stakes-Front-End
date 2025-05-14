import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

interface RedemptionTermsStepProps {
  onClose: () => void;
}

const RedemptionTermsStep: React.FC<RedemptionTermsStepProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redemption Terms</Text>
      {/* Add your redemption terms content here */}
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

export default RedemptionTermsStep; 