import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';
import { InfoBottomSheet } from '../../panels/InfoBottomSheet';
import { ConfirmDepositBottomSheet } from '../../panels/ConfirmDepositBottomSheet';

interface RefundDepositStepProps {
  onClose: () => void;
  refundableBalance?: number;
}

const RefundDepositStep: React.FC<RefundDepositStepProps> = ({ onClose, refundableBalance = 20.00 }) => {
  const [amount, setAmount] = useState('');
  const [isInfoSheetVisible, setIsInfoSheetVisible] = useState(false);
  const [isConfirmSheetVisible, setIsConfirmSheetVisible] = useState(false);
  const formattedBalance = `£${(refundableBalance || 0).toFixed(2)}`;

  const handleAmountChange = (text: string) => {
    // Remove any non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    setAmount(cleaned);
  };

  const isAmountValid = () => {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount > 0 && numAmount <= (refundableBalance || 0);
  };

  const handleRefund = () => {
    setIsConfirmSheetVisible(true);
  };

  const handleConfirmRefund = () => {
    // Handle the refund confirmation here
    console.log('Refunding amount:', amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceContentContainer}>
          <View style={styles.balanceHeaderContainer}>
            <Text style={styles.balanceLabel}>Refundable Balance</Text>
            <TouchableOpacity 
              onPress={() => setIsInfoSheetVisible(true)}
              style={styles.infoButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image 
                source={require('../../../../assets/icons/info2.png')}
                style={styles.infoIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balance} numberOfLines={1} adjustsFontSizeToFit>{formattedBalance}</Text>
        </View>
      </View>

      <Text style={styles.title}>REFUND DEPOSITS</Text>
      <Text style={styles.description}>
        Enter the amount you would like to refund from your Stable Stakes wallet to your bank account.
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>£</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#8CA09A"
            textAlign="center"
          />
        </View>
      </View>

      <PrimaryButton
        title="Refund"
        onPress={handleRefund}
        isActive={isAmountValid()}
        style={styles.button}
      />

      <View style={styles.paymentMethodsContainer}>
        <Image 
          source={require('../../../../assets/images/wallet/stripe.png')}
          style={styles.stripeLogo}
          resizeMode="contain"
        />
        <View style={styles.cardLogosContainer}>
          <Image 
            source={require('../../../../assets/images/wallet/mastercard.png')}
            style={styles.cardLogo}
            resizeMode="contain"
          />
          <Image 
            source={require('../../../../assets/images/wallet/visa.png')}
            style={styles.cardLogo}
            resizeMode="contain"
          />
          <Image 
            source={require('../../../../assets/images/wallet/applepay.png')}
            style={styles.cardLogo}
            resizeMode="contain"
          />
          <Image 
            source={require('../../../../assets/images/wallet/googlepay.png')}
            style={styles.cardLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      <InfoBottomSheet
        isVisible={isInfoSheetVisible}
        title="Refundable Balance"
        content="Your refundable balance represents the amount you can withdraw from your wallet. This includes winnings from competitions and any promotional credits that have met their withdrawal requirements."
        onClose={() => setIsInfoSheetVisible(false)}
      />

      <ConfirmDepositBottomSheet
        isVisible={isConfirmSheetVisible}
        amount={amount}
        onClose={() => setIsConfirmSheetVisible(false)}
        onConfirm={handleConfirmRefund}
        isRefund={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    paddingTop: scaleHeight(20),
  },
  balanceContainer: {
    width: scaleWidth(300),
    height: scaleHeight(110),
    backgroundColor: '#E3E3E3',
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    borderRadius: scaleWidth(20),
    justifyContent: 'center',
    marginTop: scaleHeight(20),
  },
  balanceContentContainer: {
    paddingHorizontal: scaleWidth(25),
    marginTop: scaleHeight(13),
  },
  balanceHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(2),
  },
  balanceLabel: {
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
  title: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(22),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(22),
    letterSpacing: scaleWidth(-0.22),
    textTransform: 'uppercase',
    marginTop: scaleHeight(40),
    textAlign: 'center',
    width: scaleWidth(300),
    paddingTop: scaleHeight(10),
  },
  description: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20),
    letterSpacing: scaleWidth(-0.39),
    marginTop: scaleHeight(20),
    width: scaleWidth(300),
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(5),
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: scaleHeight(30),
    height: scaleHeight(43),
    width: scaleWidth(300),
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleWidth(200),
    position: 'relative',
  },
  currencySymbol: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '500',
    textAlign: 'center',
    position: 'absolute',
    left: scaleWidth(60),
  },
  input: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '500',
    height: '100%',
    textAlign: 'center',
    width: scaleWidth(100),
  },
  button: {
    marginTop: scaleHeight(30),
    width: scaleWidth(300),
  },
  paymentMethodsContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(40),
    width: scaleWidth(300),
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

export default RefundDepositStep; 