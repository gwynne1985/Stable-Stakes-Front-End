import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface InfoBottomSheetProps {
  isVisible: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100; // Minimum distance to trigger close
const SWIPE_VELOCITY_THRESHOLD = 0.5; // Minimum velocity to trigger close

export const InfoBottomSheet: React.FC<InfoBottomSheetProps> = ({
  isVisible,
  title,
  content,
  onClose,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

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
    Animated.parallel([
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      panY.setValue(0);
    });
  };

  useEffect(() => {
    if (isVisible) {
      // Reset panY value
      panY.setValue(0);
      
      // Animate overlay
      Animated.timing(overlayAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Animate sheet
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    }
  }, [isVisible]);

  const handleOverlayPress = (e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <Animated.View 
            style={[
              styles.overlay,
              { opacity: overlayAnim }
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                { translateY: Animated.add(slideAnim, panY) }
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragIndicator} />
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.content}>{content}</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Close"
              onPress={handleClose}
              isActive={true}
              style={styles.button}
            />
          </View>
        </Animated.View>
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
    height: scaleHeight(294),
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: '#18302A',
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.3,
  },
  title: {
    marginTop: scaleHeight(30),
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  content: {
    marginTop: scaleHeight(20),
    width: scaleWidth(317),
    color: '#18302A',
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(12),
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: scaleHeight(30),
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: scaleWidth(300),
  },
}); 