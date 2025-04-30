import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface Props {
  title: string;
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  notificationCount?: number;
}

const PULL_THRESHOLD = 100;
const CONTAINER_START = scaleHeight(100);

export const PageContainer: React.FC<Props> = ({
  title,
  children,
  variant = 'light',
  notificationCount = 0,
}) => {
  const containerPosition = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          containerPosition.setValue(gestureState.dy * 0.5);
        }
      },
      onPanResponderRelease: () => {
        Animated.spring(containerPosition, {
          toValue: 0,
          useNativeDriver: true,
          tension: 40,
          friction: 5,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/golf-course.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Image
            source={require('../../assets/icons/navigation/account.png')}
            style={styles.accountIcon}
          />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.notificationContainer}>
            <Image
              source={require('../../assets/icons/navigation/notifications.png')}
              style={styles.notificationIcon}
            />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Animated.View
          style={[
            styles.contentContainer,
            variant === 'dark' ? styles.darkContent : styles.lightContent,
            {
              transform: [{ translateY: containerPosition }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: scaleHeight(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(24),
    marginTop: Platform.OS === 'ios' ? scaleHeight(29) : scaleHeight(19),
  },
  accountIcon: {
    width: scaleWidth(32),
    height: scaleWidth(32),
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: -0.2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  notificationContainer: {
    position: 'relative',
    width: scaleWidth(32),
    height: scaleWidth(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: scaleWidth(27),
    height: scaleWidth(30),
  },
  notificationBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FE606E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
  },
  notificationText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    height: 12,
    lineHeight: 12,
    letterSpacing: -0.1,
    color: '#FFFFFF',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  contentContainer: {
    flex: 1,
    position: 'absolute',
    top: scaleHeight(100),
    left: 0,
    right: 0,
    bottom: -100,
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
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
  darkContent: {
    backgroundColor: '#18302A',
  },
  lightContent: {
    backgroundColor: '#E3E3E3',
  },
}); 