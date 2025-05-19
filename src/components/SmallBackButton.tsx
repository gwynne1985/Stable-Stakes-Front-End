import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface SmallBackButtonProps {
  onPress: () => void;
  title?: string;
}

export const SmallBackButton: React.FC<SmallBackButtonProps> = ({
  onPress,
  title = 'Back'
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
    borderWidth: 1,
    borderColor: '#4EDD69',
    backgroundColor: '#E3E3E3',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scaleHeight(22),
    letterSpacing: scaleWidth(-0.14),
    color: '#18302A',
  },
}); 