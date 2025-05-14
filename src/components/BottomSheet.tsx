import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface BottomSheetProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  message,
  onDismiss,
  duration = 2000,
}) => {
  const translateY = useRef(new Animated.Value(scaleHeight(71))).current;

  useEffect(() => {
    // Slide up
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto dismiss after duration
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, translateY]);

  const handleDismiss = () => {
    Animated.timing(translateY, {
      toValue: scaleHeight(71),
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scaleHeight(71),
    overflow: 'hidden',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: scaleWidth(360),
    height: scaleHeight(71),
    backgroundColor: '#4EDD69',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(25.648),
  },
});

export default BottomSheet; 