import React, { useRef, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Platform, Animated, Dimensions } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ConfirmationPopupProps {
  isVisible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  retailerName?: string;
  amount?: number;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isVisible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Back",
  retailerName,
  amount
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);
  
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.popup,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <View style={styles.infoBoxesContainer}>
            <View style={styles.retailerBox}>
              <Text style={styles.retailerLabel}>Retailer</Text>
              <Text style={styles.retailerName}>{retailerName}</Text>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.retailerLabel}>Amount</Text>
              <Text style={styles.retailerName}>£{amount?.toFixed(2)}</Text>
            </View>
          </View>
          <Text style={styles.termsText}>
            By confirming your redemption you agree to our{' '}
            <Text style={styles.underlinedText}>terms and conditions</Text>
            {' '}and that of the selected retailer.
          </Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.confirmButton]} 
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: scaleWidth(330),
    height: scaleHeight(376),
    backgroundColor: '#E3E3E3',
    borderRadius: 20,
    padding: scaleWidth(20),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: scaleWidth(22),
    fontWeight: '900',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: -0.22,
    textTransform: 'uppercase',
    marginTop: scaleHeight(23),
    marginBottom: scaleHeight(15),
    lineHeight: undefined,
  },
  infoBoxesContainer: {
    marginTop: scaleHeight(25),
    marginBottom: scaleHeight(20),
  },
  retailerBox: {
    width: scaleWidth(300),
    height: scaleHeight(52),
    backgroundColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
  },
  amountBox: {
    width: scaleWidth(300),
    height: scaleHeight(52),
    backgroundColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#18302A',
  },
  retailerLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scaleHeight(19.236),
    textAlign: 'center',
  },
  retailerName: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(22.442),
    textAlign: 'center',
  },
  message: {
    fontSize: scaleWidth(16),
    marginBottom: scaleHeight(20),
    textAlign: 'center',
    color: '#18302A',
    fontFamily: 'Poppins',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scaleHeight(-30),
    gap: scaleWidth(10),
  },
  button: {
    width: scaleWidth(140),
    height: scaleHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  cancelButton: {
    backgroundColor: '#E3E3E3',
    borderWidth: 1,
    borderColor: '#4EDD69',
  },
  confirmButton: {
    backgroundColor: '#4EDD69',
  },
  buttonText: {
    color: '#18302A',
    fontSize: scaleWidth(14),
    fontWeight: '600',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    letterSpacing: -0.42,
    textAlign: 'center',
  },
  termsText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(8),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(12.8),
    textAlign: 'center',
    marginTop: scaleHeight(0),
    marginBottom: scaleHeight(20),
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
}); 