import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

export const NotificationsPanel = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(20),
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    color: '#18302A',
  },
}); 