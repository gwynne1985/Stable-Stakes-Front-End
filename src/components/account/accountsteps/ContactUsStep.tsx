import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

interface ContactUsStepProps {
  onClose: () => void;
}

const ContactUsStep: React.FC<ContactUsStepProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      {/* Add your contact us content here */}
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

export default ContactUsStep; 