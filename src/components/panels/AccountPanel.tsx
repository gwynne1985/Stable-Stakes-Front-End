import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

export const AccountPanel = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Settings</Text>
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