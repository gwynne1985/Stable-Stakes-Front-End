import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { LoadingIndicator } from '../../components';
import { scaleWidth, scaleHeight } from '../../utils/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  const logoPosition = useRef(new Animated.Value(scaleHeight(274))).current;

  const handleLoadingComplete = () => {
    // Animate logo to new position
    Animated.timing(logoPosition, {
      toValue: scaleHeight(131),
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to Login screen
      navigation.replace('Login');
    });
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/golf-course.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                {
                  translateY: logoPosition,
                },
              ],
            },
          ]}
        >
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <LoadingIndicator onAnimationComplete={handleLoadingComplete} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    left: scaleWidth(32),
    width: scaleWidth(279),
    height: scaleHeight(177),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
}); 