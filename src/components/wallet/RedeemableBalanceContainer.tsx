import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface RedeemableBalanceContainerProps {
  balance: number;
  onInfoPress?: () => void;
}

export const RedeemableBalanceContainer: React.FC<RedeemableBalanceContainerProps> = ({ 
  balance,
  onInfoPress 
}) => {
  // Format the balance to always show 2 decimal places
  const formattedBalance = `£${balance.toFixed(2)}`;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.label}>Redeemable Balance</Text>
          <TouchableOpacity 
            onPress={onInfoPress}
            style={styles.infoButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image 
              source={require('../../../assets/icons/info2.png')}
              style={styles.infoIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.balance} numberOfLines={1} adjustsFontSizeToFit>{formattedBalance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: scaleHeight(157),
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(2),
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
    marginTop: -scaleHeight(10),
  },
  infoButton: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -scaleHeight(4),
  },
  infoIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    resizeMode: 'contain',
  },
}); 