import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollablePanel } from './ScrollablePanel';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { RetailerTermsPanel } from './RetailerTermsPanel';

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
  remainingBalance,
  onClose,
}) => {
  const [amount, setAmount] = useState(minAmount);
  const [showTerms, setShowTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIncrement = () => {
    if (amount < maxAmount && amount + 20 <= remainingBalance) {
      setAmount(prev => Math.min(prev + 20, maxAmount, remainingBalance));
    }
  };

  const handleDecrement = () => {
    if (amount > minAmount) {
      setAmount(prev => Math.max(prev - 20, minAmount));
    }
  };

  const handleNext = async () => {
    if (amount > remainingBalance) {
      Alert.alert(
        'Insufficient Balance',
        'The selected amount exceeds your available balance.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Implement actual voucher redemption API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      Alert.alert(
        'Success',
        'Your voucher has been generated and sent to your email.',
        [{ text: 'OK', onPress: onClose }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to generate voucher. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <ScrollablePanel 
        title="RETAILER VOUCHERS" 
        onClose={onClose}
        isVisible={isVisible}
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

          <Text style={styles.voucherRange}>
            Voucher Amount - {voucherRangeText}
          </Text>

          <TouchableOpacity 
            onPress={() => setShowTerms(true)}
            style={styles.infoLink}
          >
            <Text style={styles.infoLinkText}>Voucher Information</Text>
          </TouchableOpacity>

          <View style={styles.amountSelector}>
            <TouchableOpacity 
              onPress={handleDecrement}
              style={[styles.button, amount <= minAmount && styles.buttonDisabled]}
              disabled={amount <= minAmount || isProcessing}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>£{amount.toFixed(2)}</Text>
            </View>

            <TouchableOpacity 
              onPress={handleIncrement}
              style={[
                styles.button, 
                (amount >= maxAmount || amount + 20 > remainingBalance) && styles.buttonDisabled
              ]}
              disabled={amount >= maxAmount || amount + 20 > remainingBalance || isProcessing}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Remaining Balance</Text>
            <Text style={styles.balanceAmount}>£{remainingBalance.toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={[styles.nextButton, isProcessing && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={isProcessing}
          >
            <Text style={styles.nextButtonText}>
              {isProcessing ? 'Processing...' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollablePanel>

      {showTerms && (
        <RetailerTermsPanel
          content={termsContent}
          onClose={() => setShowTerms(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
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
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    color: '#18302A',
    textAlign: 'center',
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(30),
    maxWidth: scaleWidth(280),
  },
  voucherRange: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '600',
    color: '#18302A',
    marginBottom: scaleHeight(10),
  },
  infoLink: {
    marginBottom: scaleHeight(30),
  },
  infoLinkText: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    color: '#18302A',
    textDecorationLine: 'underline',
  },
  amountSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F2',
    borderRadius: 35,
    padding: scaleWidth(6),
    marginBottom: scaleHeight(20),
  },
  button: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: 20,
    backgroundColor: '#4EDD69',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: scaleWidth(24),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  amountContainer: {
    paddingHorizontal: scaleWidth(30),
  },
  amountText: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontWeight: '600',
    color: '#18302A',
  },
  balanceContainer: {
    width: '100%',
    backgroundColor: '#F0F2F2',
    borderRadius: 35,
    padding: scaleHeight(15),
    alignItems: 'center',
    marginBottom: scaleHeight(20),
  },
  balanceLabel: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
  balanceAmount: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontWeight: '600',
    color: '#18302A',
  },
  nextButton: {
    width: '100%',
    height: scaleHeight(41),
    backgroundColor: '#4EDD69',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(20),
  },
  nextButtonText: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#18302A',
    textTransform: 'uppercase',
  },
}); 