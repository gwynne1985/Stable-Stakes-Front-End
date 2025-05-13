import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

interface CommunicationsStepProps {
  onClose: () => void;
}

const CommunicationsStep: React.FC<CommunicationsStepProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Communications</Text>
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <Text style={styles.description}>Manage your communication preferences and notification settings.</Text>
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
    backgroundColor: '#fff',
    padding: scaleWidth(20),
    borderRadius: scaleWidth(10),
  },
  sectionTitle: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(18),
    fontWeight: '800',
    marginBottom: scaleHeight(20),
  },
  description: {
    color: '#666',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    lineHeight: scaleHeight(20),
  }
});

export default CommunicationsStep; 