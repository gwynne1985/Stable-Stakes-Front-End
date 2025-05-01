import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import { Portal } from '@gorhom/portal';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const TOP_GAP = scaleHeight(50);
const PANEL_HEIGHT = SCREEN_HEIGHT - TOP_GAP; // Panel fills from TOP_GAP to bottom of screen
const SWIPE_THRESHOLD = 50;

interface VoucherPanelProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const VoucherPanel: React.FC<VoucherPanelProps> = ({
  isVisible,
  onClose,
  children
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panY = useRef(new Animated.Value(0)).current;

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
          onClose();
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
        tension: 65,
        friction: 11
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        tension: 65,
        friction: 11
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Portal>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.panel,
                  {
                    transform: [
                      { translateY: slideAnim },
                      { translateY: panY },
                    ],
                    height: PANEL_HEIGHT
                  }
                ]}
                {...panResponder.panHandlers}
              >
                <View style={styles.dragIndicator} />
                <View style={styles.header}>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.content}>
                  {children}
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
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
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
    zIndex: 1001,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
    alignSelf: 'center',
    opacity: 0.3,
  },
  header: {
    height: scaleHeight(50),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
  },
  closeButton: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    borderRadius: scaleWidth(15),
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: scaleWidth(16),
    color: '#18302A',
    fontWeight: '600',
  },
}); 