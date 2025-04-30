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
  Keyboard,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';
import { EmailStep } from './registration/EmailStep';
import { VerificationStep } from './registration/VerificationStep';
import { PasswordStep } from './registration/PasswordStep';
import { NameStep } from './registration/NameStep';
import { DobStep } from './registration/DobStep';
import { GolfClubStep } from './registration/GolfClubStep';
import { ChdIdStep } from './registration/ChdIdStep';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_HEIGHT = scaleHeight(737);
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 50;
const totalSteps = 7;

interface Props {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

export const SlidingPanel: React.FC<Props> = ({
  isVisible,
  title,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [golfClub, setGolfClub] = useState('');
  const [chdId, setChdId] = useState('');
  
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const slideX = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current as Animated.Value;
  const backButtonOpacity = useRef(new Animated.Value(0)).current;

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

  const handleNext = () => {
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setStep(prev => prev + 1);
      slideX.setValue(0);
    });
  };

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonOpacity, {
        toValue: step <= 2 ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setStep(prev => prev - 1);
      slideX.setValue(0);
    });
  };

  const renderProgressIndicators = () => {
    return (
      <View style={styles.progressContainer}>
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressIndicator,
              index + 1 === step ? styles.currentStep : styles.otherStep,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderContent = () => {
    return (
      <Animated.View style={[styles.contentContainer, { transform: [{ translateX: slideX }] }]}>
        {step === 1 && (
          <EmailStep
            email={email}
            onEmailChange={setEmail}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <VerificationStep
            code={verificationCode}
            onCodeChange={setVerificationCode}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <PasswordStep
            password={password}
            onPasswordChange={setPassword}
            onNext={handleNext}
          />
        )}
        {step === 4 && (
          <NameStep
            name={name}
            onNameChange={setName}
            onNext={handleNext}
          />
        )}
        {step === 5 && (
          <DobStep
            onNext={handleNext}
          />
        )}
        {step === 6 && (
          <GolfClubStep
            onNext={handleNext}
          />
        )}
        {step === 7 && (
          <ChdIdStep
            chdId={chdId}
            onChdIdChange={setChdId}
            onNext={handleNext}
          />
        )}
      </Animated.View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Animated.View style={[styles.backButton, { opacity: backButtonOpacity }]}>
              {step > 1 && (
                <TouchableOpacity onPress={handleBack}>
                  <Image
                    source={require('../../assets/icons/navigation/back.png')}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
              )}
            </Animated.View>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image
                source={require('../../assets/icons/navigation/close.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          {renderProgressIndicators()}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {renderContent()}
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
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
  contentContainer: {
    flex: 1,
    width: '100%',
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
  backButton: {
    position: 'absolute',
    top: scaleHeight(20),
    left: scaleWidth(25),
    width: scaleWidth(29),
    height: scaleWidth(29),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
    resizeMode: 'contain',
  },
}); 