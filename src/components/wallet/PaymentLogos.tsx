import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

export const PaymentLogos: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/wallet/stripe.png')}
        style={styles.stripeLogo}
        resizeMode="contain"
      />
      <View style={styles.cardLogosContainer}>
        <Image
          source={require('../../../assets/images/wallet/mastercard.png')}
          style={styles.cardLogo}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/images/wallet/visa.png')}
          style={styles.cardLogo}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/images/wallet/applepay.png')}
          style={styles.cardLogo}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/images/wallet/googlepay.png')}
          style={styles.cardLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  stripeLogo: {
    width: scaleWidth(120),
    height: scaleHeight(22),
    marginBottom: scaleHeight(10),
  },
  cardLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(5),
  },
  cardLogo: {
    width: scaleWidth(42),
    height: scaleHeight(24),
  },
}); 