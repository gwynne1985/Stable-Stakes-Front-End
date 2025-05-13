import React, { useState } from 'react';
import { TextInput, StyleSheet, ViewStyle, TextInputProps, View, Text } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface Props extends TextInputProps {
  style?: ViewStyle;
  isInvalid?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  containerStyle?: ViewStyle;
}

export const InputField: React.FC<Props> = ({ style, isInvalid, isValid, errorMessage, containerStyle, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleChangeText = (text: string) => {
    setHasText(text.length > 0);
    props.onChangeText?.(text);
  };

  return (
    <View style={containerStyle ? containerStyle : { width: '100%' }}>
      <TextInput
        {...props}
        style={[
          styles.input,
          isFocused && styles.focused,
          hasText && styles.hasText,
          isInvalid && styles.invalid,
          isValid && styles.valid,
          style,
        ]}
        placeholderTextColor="#60857B"
        onFocus={() => setIsFocused(true)}
        onBlur={e => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        onChangeText={handleChangeText}
      />
      {isInvalid && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: scaleHeight(46),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(5),
    backgroundColor: '#FFF',
    color: '#60857B',
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(14),
    letterSpacing: scaleWidth(-0.14),
    borderWidth: 1,
    borderColor: 'rgba(96, 133, 123, 0.50)',
  },
  focused: {
    borderWidth: 1,
    borderColor: '#CCC',
  },
  hasText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
  },
  invalid: {
    borderColor: '#FE606E',
  },
  valid: {
    borderColor: '#4EDD69',
  },
  errorText: {
    color: '#FE606E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    marginTop: scaleHeight(4),
    marginLeft: scaleWidth(2),
  },
}); 