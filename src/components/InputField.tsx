import React, { useState } from 'react';
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface Props extends TextInputProps {
  style?: ViewStyle;
}

export const InputField: React.FC<Props> = ({ style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleChangeText = (text: string) => {
    setHasText(text.length > 0);
    props.onChangeText?.(text);
  };

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        style,
        isFocused && styles.focused,
        hasText && styles.hasText,
      ]}
      placeholderTextColor="#60857B"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={handleChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: scaleWidth(300),
    height: scaleHeight(46),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(5),
    backgroundColor: '#F0F2F2',
    color: '#60857B',
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(14),
    letterSpacing: scaleWidth(-0.14),
  },
  focused: {
    borderWidth: 1,
    borderColor: '#60857B',
  },
  hasText: {
    color: '#18302A',
  },
}); 