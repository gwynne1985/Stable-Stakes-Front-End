import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface NotificationsStepProps {
  onClose: () => void;
}

export const NotificationsStep: React.FC<NotificationsStepProps> = ({
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOTIFICATIONS</Text>
      <Text style={styles.description}>
        Manage your notification preferences and view recent alerts.
      </Text>
      {/* Add notifications content here */}
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
  description: {
    position: 'absolute',
    top: scaleHeight(90),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
}); 