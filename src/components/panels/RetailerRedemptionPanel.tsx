import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { RetailerTermsPanel } from './RetailerTermsPanel';
import { ConfirmationPopup } from './ConfirmationPopup';
import { VoucherPanel } from './VoucherPanel';

interface RetailerRedemptionPanelProps {
  isVisible?: boolean;
  retailerLogo?: any;
  clubName: string;
  descriptionText: string;
  voucherRangeText: string;
  termsContent: string;
  minAmount: number;
  maxAmount: number;
  remainingBalance: number;
  onClose: () => void;
  onVoucherConfirm: (amount: number, onConfirm: () => void) => void;
}

export const RetailerRedemptionPanel: React.FC<RetailerRedemptionPanelProps> = ({
  isVisible = true,
  retailerLogo,
  clubName,
  descriptionText,
  voucherRangeText,
  termsContent,
  minAmount,
  maxAmount,
  remainingBalance: initialRemainingBalance,
  onClose,
  onVoucherConfirm,
}) => {
  const [amount, setAmount] = useState(minAmount);
  const [showTerms, setShowTerms] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState(initialRemainingBalance);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleIncrement = () => {
    const nextAmount = amount + 10;
    if (nextAmount <= maxAmount) {
      setAmount(nextAmount);
      setRemainingBalance(initialRemainingBalance - nextAmount);
    }
  };

  const handleDecrement = () => {
    if (amount > minAmount) {
      const newAmount = amount - 10;
      setAmount(newAmount);
      setRemainingBalance(initialRemainingBalance - newAmount);
    }
  };

  const handleConfirmVoucher = async () => {
    try {
      // TODO: Implement actual voucher redemption API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      // No Alert here; let ConfirmationPopup handle the UI
    } catch (error) {
      // Optionally handle error state here
    }
  };

  const handleNextPress = () => {
    console.log('Next button pressed, showing confirmation');
    setShowConfirmation(true);
  };

  const handleConfirmationConfirm = () => {
    console.log('Confirmation confirmed, calling onVoucherConfirm');
    onVoucherConfirm(amount, handleConfirmVoucher);
  };

  const handleConfirmationCancel = () => {
    console.log('Confirmation cancelled');
    setShowConfirmation(false);
    onClose();
  };

  const isMaxedOut = amount >= maxAmount;

  return (
    <>
      <VoucherPanel
        isVisible={isVisible}
        onClose={onClose}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {retailerLogo ? (
              <Image 
                source={retailerLogo} 
                style={styles.logo}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.clubName}>{clubName}</Text>
            )}

            <Text style={styles.description}>{descriptionText}</Text>

            <Text style={styles.voucherRange}>{voucherRangeText}</Text>

            <TouchableOpacity 
              onPress={() => setShowTerms(true)}
              style={styles.infoLink}
            >
              <Text style={styles.infoLinkText}>Voucher Information</Text>
            </TouchableOpacity>

            <View style={styles.amountSelector}>
              <TouchableOpacity 
                onPress={handleDecrement}
                style={styles.button}
                disabled={amount <= minAmount}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>

              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>£{amount.toFixed(2)}</Text>
              </View>

              <TouchableOpacity 
                onPress={handleIncrement}
                style={styles.button}
                disabled={(amount + 10) > maxAmount}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            {isMaxedOut && (
              <Text style={styles.maxOutText}>Maximum voucher amount reached</Text>
            )}

            <View style={styles.balanceContainer}>
              <View style={styles.balanceTextContainer}>
                <View style={styles.balanceLabelContainer}>
                  <Text style={styles.balanceLabel}>Remaining</Text>
                  <Text style={styles.balanceLabel}>Balance:</Text>
                </View>
                <View style={styles.balanceAmountContainer}>
                  <Text style={styles.balanceAmount}>£{remainingBalance.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNextPress}
              disabled={false}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </VoucherPanel>

      {showTerms && (
        <RetailerTermsPanel
          content={termsContent}
          onClose={() => setShowTerms(false)}
        />
      )}

      <ConfirmationPopup
        isVisible={showConfirmation}
        title="CONFIRM VOUCHER"
        message=""
        onConfirm={handleConfirmationConfirm}
        onCancel={handleConfirmationCancel}
        confirmText="Confirm"
        cancelText="Back"
        retailerName={clubName}
        amount={amount}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(20),
    backgroundColor: '#E3E3E3',
  },
  logo: {
    width: scaleWidth(200),
    height: scaleHeight(40),
    marginTop: scaleHeight(20),
  },
  clubName: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(24),
    fontWeight: '700',
    color: '#18302A',
    marginTop: scaleHeight(20),
  },
  description: {
    width: scaleWidth(300),
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.8),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(30),
  },
  voucherRange: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '600',
    color: '#18302A',
    marginBottom: scaleHeight(10),
  },
  infoLink: {
    marginBottom: scaleHeight(50),
  },
  infoLinkText: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    color: '#18302A',
    textDecorationLine: 'underline',
  },
  amountSelector: {
    width: scaleWidth(300),
    height: scaleHeight(86),
    flexShrink: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4EDD69',
    backgroundColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaleWidth(20),
    marginBottom: scaleHeight(20),
  },
  button: {
    width: scaleWidth(54),
    height: scaleHeight(37),
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#4EDD69',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9BA19C',
  },
  buttonText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: scaleHeight(42),
  },
  amountContainer: {
    width: scaleWidth(125),
    height: scaleHeight(37),
    flexShrink: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaleWidth(10),
  },
  amountText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: undefined,
    letterSpacing: -1.2,
    textTransform: 'uppercase',
  },
  balanceContainer: {
    width: scaleWidth(300),
    height: scaleHeight(71),
    backgroundColor: '#E3E3E3',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    justifyContent: 'center',
    marginBottom: scaleHeight(20),
  },
  balanceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  balanceLabelContainer: {
    justifyContent: 'center',
    width: scaleWidth(100),
  },
  balanceAmountContainer: {
    flex: 1,
    paddingLeft: 10,
    width: scaleWidth(160),
  },
  balanceLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: -0.39,
  },
  balanceAmount: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(24),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: undefined,
    letterSpacing: -1,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  nextButton: {
    width: scaleWidth(300),
    height: scaleHeight(41),
    backgroundColor: '#4EDD69',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(20),
    marginBottom: 0,
  },
  nextButtonText: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#18302A',
  },
  maxOutText: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    color: '#9BA19C',
    marginTop: scaleHeight(8),
    marginBottom: scaleHeight(16),
    textAlign: 'center',
  },
}); 