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
import { ReferAFriendCarousel } from '../games/ReferAFriendCarousel';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = SCREEN_HEIGHT;
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 100;
const EXIT_DURATION = 500;

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface ReferAFriendSlidingPanelRef {
  handleClose: () => void;
}

export const ReferAFriendSlidingPanel = forwardRef<ReferAFriendSlidingPanelRef, Props>(({ isVisible, onClose, children }, ref) => {
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
                <Text style={styles.title}>REFER A FRIEND</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Image
                    source={require('../../../assets/icons/navigation/close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <ReferAFriendCarousel />
            </View>
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
    alignSelf: 'stretch',
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  swipeableArea: {
    width: '100%',
    alignItems: 'center',
    paddingTop: scaleHeight(8),
    paddingBottom: scaleHeight(8),
  },
  dragIndicator: {
    width: scaleWidth(40),
    height: scaleHeight(4),
    borderRadius: 2,
    backgroundColor: '#B0B0B0',
    marginBottom: scaleHeight(8),
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: scaleHeight(8),
  },
  title: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(18),
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -0.18,
    textTransform: 'uppercase',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: scaleWidth(16),
    top: '50%',
    transform: [{ translateY: -scaleHeight(12) }],
    zIndex: 10,
  },
  closeIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingTop: scaleHeight(8),
  },
}); 