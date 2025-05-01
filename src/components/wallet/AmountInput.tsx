import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  onFocus?: () => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onAmountChange,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) return;
    
    // If there's a decimal point at the end, keep it
    if (text.endsWith('.')) {
      onAmountChange(numericValue);
      return;
    }
    
    // If there's a decimal point with digits after it
    if (parts[1]) {
      // Limit to 2 decimal places
      if (parts[1].length > 2) {
        onAmountChange(`${parts[0]}.${parts[1].slice(0, 2)}`);
        return;
      }
    }
    
    onAmountChange(numericValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (amount === '0.00') {
      onAmountChange('');
    }
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!amount) {
      onAmountChange('0.00');
    } else if (!amount.includes('.')) {
      // Add .00 if no decimal point
      onAmountChange(amount + '.00');
    } else {
      // Ensure two decimal places
      const parts = amount.split('.');
      const decimals = parts[1] || '';
      if (decimals.length === 0) {
        onAmountChange(amount + '00');
      } else if (decimals.length === 1) {
        onAmountChange(amount + '0');
      }
    }
  };

  const displayValue = isFocused ? amount : amount || '0.00';
  const isActive = isFocused || (amount !== '' && amount !== '0.00');
  const textColor = isActive ? '#18302A' : '#60857B';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter other amount</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={[styles.currencySymbol, { color: textColor }]}>£</Text>
          <TextInput
            style={[styles.input, { color: textColor }]}
            value={displayValue}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#60857B"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scaleHeight(12),
    letterSpacing: -0.3,
    marginBottom: scaleHeight(8),
  },
  inputContainer: {
    height: scaleHeight(48),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.13,
    color: '#60857B',
    textAlignVertical: 'center',
    marginRight: scaleWidth(15),
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.13,
    textAlign: 'left',
    color: '#60857B',
    width: scaleWidth(60),
    height: scaleHeight(48),
    textAlignVertical: 'center',
    paddingVertical: 0,
    marginTop: Platform.OS === 'android' ? -scaleHeight(2) : 0,
  },
}); 