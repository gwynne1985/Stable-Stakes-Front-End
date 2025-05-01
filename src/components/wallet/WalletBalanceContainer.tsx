import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface WalletBalanceContainerProps {
  balance: number;
}

export const WalletBalanceContainer: React.FC<WalletBalanceContainerProps> = ({ balance }) => {
  // Format the balance to always show 2 decimal places
  const formattedBalance = `£${balance.toFixed(2)}`;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Wallet Balance</Text>
        <Text style={styles.balance} numberOfLines={1} adjustsFontSizeToFit>{formattedBalance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: scaleHeight(37),
    left: scaleWidth(30),
    width: scaleWidth(300),
    height: scaleHeight(110),
    backgroundColor: '#E3E3E3',
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    borderRadius: scaleWidth(20),
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: scaleWidth(25),
    marginTop: scaleHeight(13),
  },
  label: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(15.6),
    fontWeight: '600',
    letterSpacing: -0.39,
    textTransform: 'none',
    height: scaleHeight(20),
  },
  balance: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(65),
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -3,
    textTransform: 'uppercase',
    height: scaleHeight(60),
    marginTop: 0,
  },
}); 