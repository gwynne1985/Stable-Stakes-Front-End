import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import { Portal } from '@gorhom/portal';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { SmallBackButton } from '../SmallBackButton';
import { SmallConfirmButton } from '../SmallConfirmButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = scaleHeight(737);
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 50;

interface VoucherPanelProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}

export const VoucherPanel: React.FC<VoucherPanelProps> = ({
  isVisible,
  onClose,
  onConfirm,
  children
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panY = useRef(new Animated.Value(0)).current as Animated.Value;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        panY.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        if (gestureState.dy > SWIPE_THRESHOLD) {
          Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(SCREEN_HEIGHT);
      panY.setValue(0);
      
      Animated.spring(slideAnim, {
        toValue: TOP_GAP,
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

  if (!isVisible) return null;

  return (
    <Portal>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [
                    { translateY: slideAnim },
                    { translateY: panY },
                  ],
                },
              ]}
              {...panResponder.panHandlers}
            >
              <View style={styles.dragIndicator} />
              <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Image
                    source={require('../../../assets/icons/navigation/close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
                {onConfirm && <SmallConfirmButton onPress={onConfirm} />}
              </View>
              <View style={styles.content}>
                {children}
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PANEL_HEIGHT,
    width: scaleWidth(360),
    alignSelf: 'center',
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    flex: 1,
    width: '100%',
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: '#18302A',
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.3,
  },
  header: {
    width: '100%',
    height: scaleHeight(60),
    paddingTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(20),
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: scaleHeight(20),
    right: scaleWidth(25),
    width: scaleWidth(29),
    height: scaleWidth(29),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
    resizeMode: 'contain',
  },
}); 