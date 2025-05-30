import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface Props {
  onAnimationComplete: () => void;
}

export const LoadingIndicator: React.FC<Props> = ({ onAnimationComplete }) => {
  const bottomLine = useRef(new Animated.Value(0)).current;
  const middleLine = useRef(new Animated.Value(0)).current;
  const topLine = useRef(new Animated.Value(0)).current;
  const ball = useRef(new Animated.Value(0)).current;
  const fadeAll = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateSequence = () => {
      return Animated.sequence([
        // First sequence
        Animated.sequence([
          Animated.timing(bottomLine, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(middleLine, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(topLine, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(ball, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAll, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        // Reset values for second sequence
        Animated.parallel([
          Animated.timing(bottomLine, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.timing(middleLine, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.timing(topLine, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.timing(ball, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.timing(fadeAll, { toValue: 1, duration: 0, useNativeDriver: true }),
        ]),
        // Second sequence
        Animated.sequence([
          Animated.timing(bottomLine, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(middleLine, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(topLine, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(ball, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAll, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onAnimationComplete();
      });
    };

    animateSequence();
  }, [bottomLine, middleLine, topLine, ball, fadeAll, onAnimationComplete]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAll }]}>
      <Animated.Image
        source={require('../../assets/images/golf-ball.png')}
        style={[
          styles.ball,
          {
            opacity: ball,
            transform: [
              {
                scale: ball.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.topLine,
          {
            opacity: topLine,
            transform: [{ scaleX: topLine }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.middleLine,
          {
            opacity: middleLine,
            transform: [{ scaleX: middleLine }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bottomLine,
          {
            opacity: bottomLine,
            transform: [{ scaleX: bottomLine }],
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleWidth(300),
    height: scaleHeight(200),
  },
  ball: {
    position: 'absolute',
    width: scaleWidth(18),
    height: scaleWidth(18),
    bottom: scaleHeight(45),
  },
  topLine: {
    position: 'absolute',
    width: scaleWidth(12),
    height: scaleHeight(2),
    backgroundColor: '#FFFFFF',
    bottom: scaleHeight(30),
  },
  middleLine: {
    position: 'absolute',
    width: scaleWidth(8),
    height: scaleHeight(2),
    backgroundColor: '#FFFFFF',
    bottom: scaleHeight(20),
  },
  bottomLine: {
    position: 'absolute',
    width: scaleWidth(4),
    height: scaleHeight(2),
    backgroundColor: '#FFFFFF',
    bottom: scaleHeight(10),
  },
}); 