import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface AccountStepProps {
  onClose: () => void;
}

export const AccountStep: React.FC<AccountStepProps> = ({
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ACCOUNT SETTINGS</Text>
      <Text style={styles.description}>
        Manage your account preferences and personal information.
      </Text>
      {/* Add account settings content here */}
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