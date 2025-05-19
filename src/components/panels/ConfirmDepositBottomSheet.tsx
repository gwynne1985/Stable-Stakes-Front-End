import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  Image,
  TextInput,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { SmallConfirmButton } from '../SmallConfirmButton';
import { SmallBackButton } from '../SmallBackButton';
import { PrimaryButton } from '../PrimaryButton';
import depositTick from '../../../assets/icons/deposit-tick.png';
import { Animated as RNAnimated } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ConfirmDepositBottomSheetProps {
  isVisible: boolean;
  amount: string | number;
  paymentMethod?: string;
  cardImage?: any;
  cardNumber?: string;
  onClose: () => void;
  onConfirm: (securityCode: string) => void;
  keyboardOffset?: number | RNAnimated.Value;
  isRefund?: boolean;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY_THRESHOLD = 0.5;
const BUTTON_HEIGHT = scaleHeight(40);

export const ConfirmDepositBottomSheet: React.FC<ConfirmDepositBottomSheetProps> = ({
  isVisible,
  amount,
  paymentMethod,
  cardImage,
  cardNumber,
  onClose,
  onConfirm,
  keyboardOffset = 0,
  isRefund = false,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const [securityCode, setSecurityCode] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const bigCircleScale = useRef(new Animated.Value(0)).current;
  const smallCircles = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const shouldClose =
          gestureState.dy > SWIPE_THRESHOLD ||
          (gestureState.dy > 0 && gestureState.vy > SWIPE_VELOCITY_THRESHOLD);
        if (shouldClose) {
          handleClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleClose = () => {
    setSecurityCode('');
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (isVisible) {
      panY.setValue(0);
      Animated.timing(overlayAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
      setProcessing(false);
      setComplete(false);
    }
  }, [isVisible]);

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

  useEffect(() => {
    if (!isVisible) {
      slideAnim.setValue(SCREEN_HEIGHT);
    }
  }, [isVisible, slideAnim]);

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 1200);
    onConfirm(securityCode);
  };

  if (!isVisible) return null;

  const containerStyle = [
    styles.container,
    {
      transform: [
        { translateY: Animated.add(slideAnim, panY) },
        typeof keyboardOffset === 'number'
          ? { translateY: -keyboardOffset }
          : { translateY: keyboardOffset ? RNAnimated.multiply(keyboardOffset, -1) : 0 },
      ],
    },
  ];

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
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} />
        </TouchableWithoutFeedback>
        <RNAnimated.View
          style={containerStyle}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragIndicator} />
          {!complete ? (
            <>
              <Text style={styles.header}>{isRefund ? 'CONFIRM REFUND' : 'CONFIRM DEPOSIT'}</Text>
              <View style={styles.amountContainer}>
                <View style={styles.row}>
                  <Text style={styles.label}>Amount:</Text>
                  <Text style={styles.amountValue}>£{amount}</Text>
                </View>
              </View>
              {isRefund && (
                <Text style={styles.processingText}>
                  Please allow up to 3 days for funds to be returned to your bank account.
                </Text>
              )}
              {!isRefund && (
                <>
                  <Text style={styles.paymentLabel}>Payment Method</Text>
                  <View style={styles.paymentBox}>
                    <Image source={cardImage} style={styles.cardImage} resizeMode="contain" />
                    <Text style={styles.cardNumber}>{paymentMethod} {cardNumber}</Text>
                    <TextInput
                      style={styles.securityInput}
                      placeholder="CVV"
                      placeholderTextColor="#8CA09A"
                      maxLength={3}
                      keyboardType="number-pad"
                      value={securityCode}
                      onChangeText={setSecurityCode}
                      editable={!processing}
                    />
                  </View>
                </>
              )}
              <View style={styles.buttonRow}>
                <SmallBackButton onPress={handleClose} />
                <SmallConfirmButton 
                  onPress={handleConfirm} 
                  disabled={processing}
                  title={processing ? 'Processing...' : undefined} 
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.header}>{isRefund ? 'REFUND COMPLETE' : 'DEPOSIT COMPLETE'}</Text>
              <View style={styles.completeContainer}>
                <Animated.View style={[styles.bigCircle, { transform: [{ scale: bigCircleScale }] }]}> 
                  <Image source={depositTick} style={styles.tickIcon} />
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
                {isRefund 
                  ? 'Your refund was successful!'
                  : 'Your deposit was successful!'}
              </Text>
              <PrimaryButton
                title="Close"
                onPress={handleClose}
                isActive={true}
                style={styles.primaryButton}
              />
            </>
          )}
        </RNAnimated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: scaleWidth(360),
    height: scaleHeight(379),
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    alignItems: 'center',
  },
  dragIndicator: {
    width: scaleWidth(36),
    height: scaleHeight(4),
    backgroundColor: '#18302A',
    borderRadius: scaleWidth(2),
    marginTop: scaleHeight(8),
    opacity: 0.3,
  },
  header: {
    marginTop: scaleHeight(20),
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: scaleHeight(25.648),
  },
  amountContainer: {
    width: scaleWidth(317),
    borderBottomWidth: 1,
    borderBottomColor: '#18302A',
    marginTop: scaleHeight(35),
    paddingBottom: scaleHeight(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '500',
    lineHeight: scaleHeight(22.442),
  },
  amountValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '900',
    marginLeft: 'auto',
    marginRight: scaleWidth(20),
    lineHeight: scaleHeight(22.442),
    textAlign: 'center',
  },
  paymentLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '500',
    marginTop: scaleHeight(25),
    lineHeight: scaleHeight(22.442),
    textAlign: 'left',
    width: scaleWidth(317),
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(10),
    width: scaleWidth(317),
    height: scaleHeight(50),
    borderRadius: scaleWidth(5),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    paddingHorizontal: scaleWidth(10),
  },
  cardImage: {
    width: scaleWidth(63),
    height: scaleHeight(38),
    marginRight: scaleWidth(10),
  },
  cardNumber: {
    flex: 1,
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontWeight: '500',
    letterSpacing: scaleWidth(-0.28),
    marginLeft: scaleWidth(5),
  },
  securityInput: {
    width: scaleWidth(78),
    height: scaleHeight(35),
    paddingHorizontal: scaleWidth(8),
    borderRadius: scaleWidth(6),
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    letterSpacing: scaleWidth(-0.13),
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scaleWidth(317),
    marginTop: scaleHeight(45),
  },
  buttonText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scaleHeight(22),
    letterSpacing: scaleWidth(-0.14),
  },
  completeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(60),
    marginBottom: scaleHeight(10),
  },
  bigCircle: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    borderRadius: scaleWidth(40),
    backgroundColor: '#4EDD69',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tickIcon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    resizeMode: 'contain',
  },
  smallCircle: {
    position: 'absolute',
    backgroundColor: '#4EDD69',
  },
  completeText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(20),
  },
  primaryButton: {
    width: scaleWidth(300),
    alignSelf: 'center',
    height: BUTTON_HEIGHT,
  },
  processingText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: scaleHeight(20),
    width: scaleWidth(300),
  },
}); 