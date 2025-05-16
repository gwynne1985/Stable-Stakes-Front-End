import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  PanResponder,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_HEIGHT = SCREEN_HEIGHT;
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 100; // Make swipe less sensitive
const EXIT_DURATION = 500; // Increased from 300ms to 500ms

interface Props {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

export interface SimpleSlidingPanelRef {
  handleClose: () => void;
}

export const SimpleSlidingPanel = forwardRef<SimpleSlidingPanelRef, Props>(({
  isVisible,
  title,
  onClose,
  children,
  headerRight
}, ref) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panY = useRef(new Animated.Value(0)).current as Animated.Value;
  const [isRendered, setIsRendered] = useState(false);
  const hasCrossedThresholdRef = useRef(false);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: EXIT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setIsRendered(false);
      onClose();
    });
  };

  useImperativeHandle(ref, () => ({
    handleClose
  }));

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
          if (!hasCrossedThresholdRef.current && gestureState.dy > SWIPE_THRESHOLD) {
            hasCrossedThresholdRef.current = true;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } else if (hasCrossedThresholdRef.current && gestureState.dy <= SWIPE_THRESHOLD) {
            hasCrossedThresholdRef.current = false;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        hasCrossedThresholdRef.current = false;
        if (gestureState.dy > SWIPE_THRESHOLD) {
          handleClose();
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
      setIsRendered(true);
      slideAnim.setValue(SCREEN_HEIGHT);
      panY.setValue(0);
      
      Animated.spring(slideAnim, {
        toValue: TOP_GAP,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    }

    return () => {
      panY.setValue(0);
      panY.flattenOffset();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      panY.setValue(0);
      panY.flattenOffset();
    }
  }, [isVisible]);

  if (!isRendered && !isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={StyleSheet.absoluteFill}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={[StyleSheet.absoluteFill, styles.overlay]} />
          </TouchableWithoutFeedback>
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
          >
            <View {...panResponder.panHandlers} style={styles.swipeableArea}>
              <View style={styles.dragIndicator} />
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRight && (
                  <View style={styles.backButtonContainer}>
                    {headerRight}
                  </View>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Image
                    source={require('../../../assets/icons/navigation/close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.contentContainer}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT - TOP_GAP,
    width: '100%',
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
  swipeableArea: {
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: '#18302A',
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.3,
    alignSelf: 'center',
  },
  header: {
    width: '100%',
    height: scaleHeight(60),
    paddingTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(20),
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: scaleHeight(20),
    left: 0,
    right: 0,
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  closeButton: {
    position: 'absolute',
    top: scaleHeight(13),
    right: scaleWidth(25),
    width: scaleWidth(40),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
    resizeMode: 'contain',
  },
  backButtonContainer: {
    position: 'absolute',
    top: scaleHeight(13),
    left: scaleWidth(25),
    width: scaleWidth(40),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
}); 