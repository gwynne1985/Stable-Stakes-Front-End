import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface Props {
  title: string;
  onPress: () => void;
  isActive?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  isActive = false,
  isLoading = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isActive || isLoading}
      style={[
        styles.button,
        isActive && styles.buttonActive,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: scaleWidth(300),
    height: scaleHeight(40),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(20),
    backgroundColor: '#9BA19C',
  },
  buttonActive: {
    backgroundColor: '#4EDD69',
  },
  buttonText: {
    color: '#18302A',
    fontFamily: 'Poppins-SemiBold',
    fontSize: scaleWidth(14),
    letterSpacing: scaleWidth(-0.14),
  },
}); 