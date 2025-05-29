import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  ImageBackground,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  BackHandler,
  TouchableOpacity,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { InputField, PrimaryButton } from '../../components';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const logoPosition = useRef(new Animated.Value(scaleHeight(131))).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  // Fade in content smoothly after mount
  useEffect(() => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle Android back button to dismiss keyboard
  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
          return true; // Prevent default back action
        }
        return false; // Allow default back action
      });

      return () => backHandler.remove();
    }
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      setShowError(true);
      return;
    }

    setIsSigningIn(true);
    setShowError(false);
    Keyboard.dismiss();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Animation: Fade out content and transition
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.sequence([
          Animated.delay(200),
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
          Animated.delay(300),
        Animated.timing(logoPosition, {
          toValue: scaleHeight(274),
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('MainApp', { screen: 'GamesScreen' });
      }, 500);
    });
    } catch (error) {
      console.error('Login failed:', error);
      setShowError(true);
      setIsSigningIn(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password flow
    Keyboard.dismiss();
  };

  const handleCreateAccount = () => {
    // TODO: Implement create account navigation
    Keyboard.dismiss();
  };

  const handleEmailSupport = () => {
    Keyboard.dismiss();
    Linking.openURL('mailto:info@stablestakes.co.uk');
  };

  const handleRegister = () => {
    console.log('Register button pressed - attempting navigation');
    Keyboard.dismiss();
    try {
      navigation.navigate('Registration');
      console.log('Navigation to Registration completed');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const isFormFilled = email.length > 0 && password.length > 0;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../../../assets/images/golf-course.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [{ translateY: logoPosition }],
                },
              ]}
            >
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View style={[styles.contentContainer, { opacity: contentOpacity }]}>
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.emailInput}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />

              <View style={styles.passwordContainer}>
                <InputField
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image 
                    source={showPassword ? require('../../../assets/icons/eye-off.png') : require('../../../assets/icons/eye.png')} 
                    style={styles.eyeIconImage}
                  />
                </TouchableOpacity>
              </View>

              {showError && <Text style={styles.errorText}>Invalid email or password</Text>}
              
              <Pressable onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
              </Pressable>

              <PrimaryButton
                title="Sign In"
                onPress={handleSignIn}
                style={styles.signInButton}
                isActive={isFormFilled}
                isLoading={isSigningIn}
              />

              <View style={styles.createAccountContainer}>
                <View style={styles.leftLine} />
                <Text style={styles.createAccountText}>Create an account</Text>
                <View style={styles.rightLine} />
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>

              <Pressable onPress={handleEmailSupport} style={styles.supportContainer}>
                <Text style={styles.supportText}>Can't Sign In? Email Support</Text>
              </Pressable>
            </Animated.View>

            <Animated.View style={[styles.taglineContainer, { opacity: taglineOpacity }]}>
              <View style={styles.taglineRow}>
                <Text style={styles.taglineLight}>GOOD GOLF </Text>
                <Text style={styles.taglineBold}>PAYS OFF</Text>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
  scrollContainer: {
    flexGrow: 1,
    minHeight: '100%',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    left: '50%',
    width: scaleWidth(209.25),
    height: scaleHeight(132.75),
    marginLeft: -scaleWidth(209.25 / 2),
    zIndex: 2,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    position: 'relative',
  },
  emailInput: {
    position: 'absolute',
    left: scaleWidth(30),
    top: scaleHeight(334),
    width: scaleWidth(300),
  },
  passwordContainer: {
    position: 'absolute',
    left: scaleWidth(30),
    top: scaleHeight(406),
    width: scaleWidth(300),
  },
  passwordInput: {
    width: '100%',
    paddingRight: scaleWidth(40),
  },
  errorText: {
    position: 'absolute',
    left: scaleWidth(29),
    top: scaleHeight(460),
    width: scaleWidth(126),
    height: scaleHeight(14),
    color: '#FE606E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    lineHeight: scaleHeight(21),
  },
  forgotPassword: {
    position: 'absolute',
    left: scaleWidth(183),
    top: scaleHeight(460),
    color: '#F0F2F2',
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    letterSpacing: scaleWidth(-0.13),
  },
  signInButton: {
    position: 'absolute',
    left: scaleWidth(30),
    top: scaleHeight(495),
    width: scaleWidth(300),
  },
  createAccountContainer: {
    position: 'absolute',
    width: '100%',
    top: scaleHeight(580),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: '#F0F2F2',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontWeight: '500',
    letterSpacing: scaleWidth(-0.12),
  },
  leftLine: {
    position: 'absolute',
    left: scaleWidth(30),
    width: scaleWidth(80),
    height: scaleHeight(1),
    backgroundColor: '#FFFFFF',
    top: '50%',
  },
  rightLine: {
    position: 'absolute',
    right: scaleWidth(30),
    width: scaleWidth(80),
    height: scaleHeight(1),
    backgroundColor: '#FFFFFF',
    top: '50%',
  },
  supportContainer: {
    position: 'absolute',
    width: '100%',
    top: scaleHeight(725),
    alignItems: 'center',
  },
  supportText: {
    color: '#F0F2F2',
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(12),
    letterSpacing: scaleWidth(-0.12),
    textDecorationLine: 'underline',
  },
  registerButton: {
    position: 'absolute',
    left: scaleWidth(30),
    top: scaleHeight(618),
    width: scaleWidth(300),
    height: scaleHeight(40),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  registerButtonText: {
    color: '#4EDD69',
    fontFamily: 'Poppins-SemiBold',
    fontSize: scaleWidth(14),
    letterSpacing: scaleWidth(-0.14),
  },
  taglineContainer: {
    position: 'absolute',
    left: scaleWidth(72),
    top: scaleHeight(458),
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taglineLight: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-LightItalic',
    fontSize: scaleWidth(20),
    letterSpacing: scaleWidth(-0.2),
    textTransform: 'uppercase',
  },
  taglineBold: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-ExtraBoldItalic',
    fontSize: scaleWidth(20),
    letterSpacing: scaleWidth(-0.2),
    textTransform: 'uppercase',
  },
  eyeIcon: {
    position: 'absolute',
    right: scaleWidth(10),
    top: '50%',
    transform: [{ translateY: -scaleHeight(14.5) }],
    padding: scaleWidth(5),
  },
  eyeIconImage: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
}); 