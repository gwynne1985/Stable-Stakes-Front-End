import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
import { Portal } from '@gorhom/portal';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = scaleHeight(737);
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 50;

interface Props {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const BasePanel: React.FC<Props> = ({
  isVisible,
  title,
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
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill}>
            <TouchableWithoutFeedback>
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
                      source={require('../../../assets/icons/navigation/close.png')}
                      style={styles.closeIcon}
                    />
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
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PANEL_HEIGHT,
    width: '100%',
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1001,
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
    alignSelf: 'center',
    opacity: 0.3,
  },
  header: {
    width: '100%',
    height: scaleHeight(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleWidth(20),
    position: 'relative',
  },
  title: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  closeButton: {
    position: 'absolute',
    right: scaleWidth(20),
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 29,
    height: 29,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
  },
}); 