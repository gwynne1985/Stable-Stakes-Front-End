import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { LoadingIndicator } from '../../components';
import { scaleWidth, scaleHeight } from '../../utils/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoPosition = useRef(new Animated.Value(scaleHeight(274))).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start with loading indicator fade in
    Animated.sequence([
      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Then fade in the logo at its initial position
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLoadingComplete = () => {
    // First slide the logo up
    Animated.sequence([
      Animated.timing(logoPosition, {
        toValue: scaleHeight(131),
        duration: 1200,
        useNativeDriver: true,
      }),
      // Then fade out loading indicator
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to Login screen after logo is in position
      navigation.replace('Login');
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer, 
          { 
            opacity: logoOpacity,
            transform: [{ translateY: logoPosition }]
          }
        ]}
      >
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View style={[styles.loadingContainer, { opacity: loadingOpacity }]}>
        <LoadingIndicator onAnimationComplete={handleLoadingComplete} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    left: scaleWidth(32),
    width: scaleWidth(279),
    height: scaleHeight(177),
    zIndex: 2,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: scaleHeight(100),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
}); 