import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

interface FAQStepProps {
  onClose: () => void;
}

const FAQStep: React.FC<FAQStepProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>Common Questions</Text>
        <Text style={styles.description}>Find answers to frequently asked questions about Stable Stakes.</Text>
      </View>
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
  },
  panel: {
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(20),
    padding: scaleWidth(20),
    marginBottom: scaleHeight(20),
  },
  sectionTitle: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: scaleHeight(10),
  },
  description: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    lineHeight: scaleHeight(20),
  }
});

export default FAQStep; 