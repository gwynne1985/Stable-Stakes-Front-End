import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Platform, Animated, Dimensions, Image } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation';
import * as Haptics from 'expo-haptics';

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
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const bigCircleScale = useRef(new Animated.Value(0)).current;
  const smallCircles = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  useEffect(() => {
    if (isVisible) {
      setComplete(false);
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
      setProcessing(false);
      setComplete(false);
    }
  }, [isVisible]);

  // Animate circles when complete
  useEffect(() => {
    if (complete) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Animated.spring(bigCircleScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 80,
      }).start();
      [0, 1, 2, 3, 4].forEach((i) => {
        setTimeout(() => {
          Animated.spring(smallCircles[i], {
            toValue: 1,
            useNativeDriver: true,
            friction: 4,
            tension: 60,
          }).start();
        }, 100 + 90 * i + Math.floor(Math.random() * 60));
      });
    } else {
      bigCircleScale.setValue(0);
      smallCircles.forEach(circle => circle.setValue(0));
    }
  }, [complete]);

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 1200);
    onConfirm(); // If you want to call the parent confirm logic as well
  };

  const handleClose = () => {
    setComplete(false);
    setProcessing(false);
    onCancel();
    navigation.navigate('ProShopScreen');
  };

  // For random sizes and positions (all unique)
  const smallCircleStyles = [
    { width: scaleWidth(18), height: scaleWidth(18), borderRadius: scaleWidth(9), top: -scaleWidth(28), left: scaleWidth(22) },
    { width: scaleWidth(10), height: scaleWidth(10), borderRadius: scaleWidth(5), top: scaleWidth(8), left: -scaleWidth(8) },
    { width: scaleWidth(14), height: scaleWidth(14), borderRadius: scaleWidth(7), top: scaleWidth(30), right: -scaleWidth(24) },
    { width: scaleWidth(7), height: scaleWidth(7), borderRadius: scaleWidth(3.5), bottom: -scaleWidth(8), left: scaleWidth(8) },
    { width: scaleWidth(13), height: scaleWidth(13), borderRadius: scaleWidth(6.5), bottom: -scaleWidth(18), right: scaleWidth(20) },
  ];

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
          {!complete ? (
            <>
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
                  disabled={processing}
                >
                  <Text style={styles.buttonText}>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton, processing && { opacity: 0.7 }]} 
                  onPress={handleConfirm}
                  disabled={processing}
                >
                  <Text style={styles.buttonText}>{processing ? 'Processing...' : confirmText}</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>REDEMPTION COMPLETE</Text>
              <View style={styles.completeContainer}>
                {/* Animated big green circle */}
                <Animated.View style={[styles.bigCircle, { transform: [{ scale: bigCircleScale }] }]}> 
                  <Image source={require('../../../assets/icons/deposit-tick.png')} style={styles.tickIcon} />
                  {/* Animated small circles */}
                  {smallCircles.map((circle, i) => (
                    <Animated.View
                      key={i}
                      style={[
                        styles.smallCircle,
                        smallCircleStyles[i],
                        { transform: [{ scale: circle }] }
                      ]}
                    />
                  ))}
                </Animated.View>
              </View>
              <Text style={styles.completeText}>
                Your voucher code will arrive in your inbox within the next 24 hours. Don't forget to check your spam folder, just in case!
              </Text>
              <PrimaryButton
                title="Close"
                onPress={handleClose}
                isActive={true}
                style={styles.primaryButton}
              />
            </>
          )}
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
  completeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaleHeight(20),
  },
  bigCircle: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(35),
    backgroundColor: '#4EDD69',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tickIcon: {
    width: scaleWidth(32),
    height: scaleWidth(32),
    resizeMode: 'contain',
    position: 'absolute',
    top: scaleWidth(19),
    left: scaleWidth(19),
  },
  smallCircle: {
    position: 'absolute',
    width: scaleWidth(12),
    height: scaleWidth(12),
    borderRadius: scaleWidth(6),
    backgroundColor: '#4EDD69',
  },
  completeText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(19.2),
    textAlign: 'center',
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
    paddingHorizontal: scaleWidth(10),
  },
  primaryButton: {
    width: scaleWidth(300),
    height: scaleHeight(40),
    alignSelf: 'center',
  },
}); 