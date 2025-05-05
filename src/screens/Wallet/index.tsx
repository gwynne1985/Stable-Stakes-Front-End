import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Animated, Dimensions, Easing, TouchableWithoutFeedback } from 'react-native';
import { PageContainer } from '../../components/PageContainer';
import { WalletBalanceContainer } from '../../components/wallet/WalletBalanceContainer';
import { RedeemableBalanceContainer } from '../../components/wallet/RedeemableBalanceContainer';
import { InfoBottomSheet } from '../../components/panels/InfoBottomSheet';
import { ConfirmDepositBottomSheet } from '../../components/panels/ConfirmDepositBottomSheet';
import { DepositChips } from '../../components/wallet/DepositChips';
import { AmountInput } from '../../components/wallet/AmountInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { PaymentLogos } from '../../components/wallet/PaymentLogos';
import { scaleWidth, scaleHeight } from '../../utils/scale';

export const WalletScreen = () => {
  const [isInfoSheetVisible, setIsInfoSheetVisible] = useState(false);
  const [isConfirmSheetVisible, setIsConfirmSheetVisible] = useState(false);
  const [chipAmount, setChipAmount] = useState<number | null>(null);
  const [manualAmount, setManualAmount] = useState('0.00');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  
  // TODO: Replace with actual wallet balance from state management
  const walletBalance = 40.00;
  const redeemableBalance = 30.00;

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.timing(translateY, {
          toValue: -scaleHeight(200),
          duration: 400,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }).start();
        Animated.timing(keyboardOffset, {
          toValue: scaleHeight(200),
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }).start();
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY]);

  const handleInfoPress = () => {
    setIsInfoSheetVisible(true);
  };

  const handleCloseInfoSheet = () => {
    setIsInfoSheetVisible(false);
  };

  const handleDepositSelect = (amount: number | null) => {
    setChipAmount(amount);
    // Reset manual amount when chip is selected
    if (amount !== null) {
      setManualAmount('0.00');
    }
  };

  const handleAmountChange = (amount: string) => {
    setManualAmount(amount);
    // Clear chip selection when manual amount is entered
    if (amount !== '' && amount !== '0.00') {
      setChipAmount(null);
    }
  };

  const handleAmountFocus = () => {
    // Clear chip selection when manual input is focused
    setChipAmount(null);
  };

  const handleNextPress = () => {
    // TODO: Handle next button press
    const depositAmount = chipAmount || (manualAmount !== '0.00' ? parseFloat(manualAmount) : null);
    console.log('Next pressed with amount:', depositAmount);
    if (depositAmount) setIsConfirmSheetVisible(true);
  };

  // Check if either a chip is selected or a valid manual amount is entered
  const isNextActive = chipAmount !== null || (manualAmount !== '0.00' && manualAmount !== '');

  return (
    <PageContainer title="WALLET" variant="light" notificationCount={2}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.keyboardAvoidingView, { backgroundColor: '#E3E3E3' }]}
          keyboardVerticalOffset={-scaleHeight(100)}
          enabled
        >
          <Animated.View style={{ flex: 1, transform: [{ translateY: isConfirmSheetVisible ? 0 : translateY }] }}>
            <Animated.ScrollView 
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={[
                styles.container,
                keyboardVisible && { marginBottom: scaleHeight(300) }
              ]}>
                <View style={styles.contentContainer}>
                  <WalletBalanceContainer balance={walletBalance} />
                  <RedeemableBalanceContainer 
                    balance={redeemableBalance}
                    onInfoPress={handleInfoPress}
                  />
                  <Text style={styles.depositText}>DEPOSIT</Text>
                  <View style={styles.chipsContainer}>
                    <DepositChips 
                      onSelect={handleDepositSelect}
                      selectedAmount={chipAmount}
                    />
                  </View>
                  <View style={styles.amountInputContainer}>
                    <AmountInput
                      amount={manualAmount}
                      onAmountChange={handleAmountChange}
                      onFocus={handleAmountFocus}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <PrimaryButton
                      title="Next"
                      onPress={handleNextPress}
                      isActive={isNextActive}
                    />
                    <PaymentLogos />
                  </View>
                </View>
              </View>
            </Animated.ScrollView>
          </Animated.View>
          <InfoBottomSheet
            isVisible={isInfoSheetVisible}
            title="Redeemable Balance"
            content="Your redeemable balance represents the amount you can withdraw from your wallet. This includes winnings from competitions and any promotional credits that have met their withdrawal requirements."
            onClose={handleCloseInfoSheet}
          />
          <ConfirmDepositBottomSheet
            isVisible={isConfirmSheetVisible}
            amount={chipAmount || manualAmount}
            paymentMethod="Visa"
            cardImage={require('../../../assets/images/wallet/visa.png')}
            cardNumber="xxx 3301"
            onClose={() => setIsConfirmSheetVisible(false)}
            onConfirm={(cvv) => {
              // Only handle deposit logic here, do not close the sheet
              console.log('Deposit confirmed with CVV:', cvv);
            }}
            keyboardOffset={keyboardOffset}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: scaleHeight(600),
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  depositText: {
    position: 'absolute',
    top: scaleHeight(287),
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(22),
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -0.22,
  },
  chipsContainer: {
    position: 'absolute',
    top: scaleHeight(344),
    left: scaleWidth(30),
    right: scaleWidth(30),
    alignItems: 'center',
  },
  amountInputContainer: {
    position: 'absolute',
    top: scaleHeight(395),
    left: scaleWidth(30),
    right: scaleWidth(30),
  },
  buttonContainer: {
    position: 'absolute',
    top: scaleHeight(480),
    left: scaleWidth(30),
    right: scaleWidth(30),
    alignItems: 'center',
    zIndex: 1,
  },
  buttonContainerKeyboard: {
    top: scaleHeight(450), // Move button up when keyboard is visible
  },
}); 