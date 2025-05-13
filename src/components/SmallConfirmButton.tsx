import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface SmallConfirmButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

export const SmallConfirmButton: React.FC<SmallConfirmButtonProps> = ({
  onPress,
  title = 'Confirm',
  disabled = false
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && { opacity: 0.7 }]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: scaleWidth(140),
    height: scaleHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#4EDD69',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: -0.42,
    color: '#18302A',
  },
}); 