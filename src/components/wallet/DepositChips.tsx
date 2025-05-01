import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface DepositChipsProps {
  onSelect: (amount: number | null) => void;
  selectedAmount: number | null;
}

export const DepositChips: React.FC<DepositChipsProps> = ({ 
  onSelect,
  selectedAmount,
}) => {
  const handlePress = (amount: number) => {
    if (selectedAmount === amount) {
      // Deselect if already selected
      onSelect(null);
    } else {
      onSelect(amount);
    }
  };

  return (
    <View style={styles.container}>
      {[10, 20, 50].map((amount) => (
        <TouchableOpacity
          key={amount}
          style={[
            styles.chip,
            selectedAmount === amount && styles.selectedChip
          ]}
          onPress={() => handlePress(amount)}
        >
          <Text style={styles.chipText}>£{amount}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scaleWidth(300),
    paddingHorizontal: scaleWidth(5),
    gap: scaleWidth(10),
  },
  chip: {
    flex: 1,
    paddingVertical: scaleHeight(8),
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    backgroundColor: '#FFF',
  },
  selectedChip: {
    backgroundColor: '#4EDD69',
  },
  chipText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: -0.42,
  },
}); 