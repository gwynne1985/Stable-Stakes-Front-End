import React, { useEffect, useRef } from 'react';
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
} from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = scaleHeight(737);
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 50; // How many pixels to swipe before dismissing

interface Props {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

export const SlidingPanel: React.FC<Props> = ({
  isVisible,
  title,
  onClose,
  children,
  currentStep = 1,
  totalSteps = 5,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical gestures
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        panY.setOffset(panY._value);
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward swipes
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        if (gestureState.dy > SWIPE_THRESHOLD) {
          // User swiped down far enough, dismiss the panel
          onClose();
        } else {
          // Reset to original position
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
    console.log('SlidingPanel mounted, isVisible:', isVisible);
    if (isVisible) {
      console.log('Starting slide up animation');
      Animated.spring(slideAnim, {
        toValue: TOP_GAP,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start(() => console.log('Slide up animation completed'));
    } else {
      console.log('Starting slide down animation');
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => console.log('Slide down animation completed'));
    }
  }, [isVisible]);

  const renderProgressIndicators = () => {
    return (
      <View style={styles.progressContainer}>
        {[0,1,2,3,4].map((index) => (
          <View
            key={index}
            style={[
              styles.progressIndicator,
              index + 1 === currentStep ? styles.currentStep : styles.otherStep,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
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
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={require('../../assets/icons/navigation/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        {renderProgressIndicators()}
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  title: {
    position: 'absolute',
    top: scaleHeight(20),
    left: scaleWidth(97),
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
  progressContainer: {
    position: 'absolute',
    top: scaleHeight(673),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(8),
  },
  progressIndicator: {
    height: 5.364,
    borderRadius: 10,
  },
  currentStep: {
    width: 24.136,
    backgroundColor: '#18302A',
  },
  otherStep: {
    width: 5.364,
    backgroundColor: '#18302A',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(30),
  },
}); 