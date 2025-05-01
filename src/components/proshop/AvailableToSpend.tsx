import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface AvailableToSpendProps {
  amount: number;
}

export const AvailableToSpend: React.FC<AvailableToSpendProps> = ({ amount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Available</Text>
          <Text style={styles.label}>to Spend:</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>£{amount.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(300),
    height: scaleHeight(71),
    backgroundColor: '#E3E3E3',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  labelContainer: {
    justifyContent: 'center',
    width: scaleWidth(100),
  },
  amountContainer: {
    flex: 1,
    paddingLeft: 10,
    width: scaleWidth(160),
  },
  label: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: -0.39,
  },
  amount: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: undefined,
    letterSpacing: -1,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
}); 