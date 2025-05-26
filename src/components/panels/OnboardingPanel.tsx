import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image as RNImage,
  Platform,
  Alert,
  PanResponder,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL_STEPS = 8;

interface OnboardingPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

interface OnboardingStep {
  title: string;
  description: string;
  image?: any;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Welcome to Stable Stakes',
    description: 'Your journey to better golf starts here',
  },
  {
    title: 'Track Your Progress',
    description: 'Monitor your handicap and see your improvement over time',
  },
  {
    title: 'Join Competitions',
    description: 'Enter tournaments and compete with golfers at your level',
  },
  {
    title: 'Earn Rewards',
    description: 'Win vouchers and prizes as you improve your game',
  },
  {
    title: 'Connect with Clubs',
    description: 'Find and join golf clubs in your area',
  },
  {
    title: 'Stay Updated',
    description: 'Get notifications about competitions and your handicap changes',
  },
  {
    title: 'Ready to Play',
    description: 'Your account is set up and ready to go',
  },
  {
    title: "Let's Get Started",
    description: 'Begin your journey with Stable Stakes today',
  },
];

const RULES_CONTENT = [
  {
    title: "CHOOSE A GAME",
    description: "Pick from three different games, each with its own target Stableford score and reward level. The higher the target score, the higher the potential reward.",
    image: require('../../../assets/images/rules/game-rules-1.png'),
  },
  {
    title: "PLACE YOUR STAKE",
    description: "Decide how much to stake: £10, £20, or £50. Higher stakes mean bigger potential winnings.",
    image: require('../../../assets/images/rules/game-rules-2.png'),
  },
  {
    title: "TELL US WHEN YOU'LL PLAY",
    description: "Enter the date of your competition round. Stakes must be placed by 11:59pm the day before your comp. You can enter multiple games for extra chances to win.",
    image: require('../../../assets/images/rules/game-rules-3.png'),
  },
  {
    title: "SUBMIT YOUR SCORE",
    description: "The day after your round, we'll prompt you to enter your Stableford score. If you hit or exceed your target, upload a screenshot of your official scorecard from IG app or How Did I Do.",
    image: require('../../../assets/images/rules/game-rules-4.png'),
  },
  {
    title: "WAIT FOR APPROVAL",
    description: "Scores are verified against your handicap and competition records. Once approved, winnings appear in your Stable Stakes wallet within 48 hours.",
    image: require('../../../assets/images/rules/game-rules-5.png'),
  },
  {
    title: "SPEND YOUR REWARDS",
    description: "Redeem your winnings for vouchers at your club's pro shop or partner golf retailers. Treat yourself to new gear, lessons, or equipment—because good golf pays off!",
    image: require('../../../assets/images/rules/game-rules-6.png'),
  },
];

export const OnboardingPanel: React.FC<OnboardingPanelProps> = ({
  isVisible,
  onClose,
}) => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentStep, setCurrentStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'back' | null>(null);
  const [targetStep, setTargetStep] = useState<number | null>(null);
  const [keepPanels, setKeepPanels] = useState(false);
  const [postAnimationCleanup, setPostAnimationCleanup] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const slideX = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;

  // Animation refs for first panel (must be top-level)
  const titleAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const logoAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const descAnim = useRef(new Animated.Value(0)).current;

  // Add at the top, after other hooks
  const bigCircleScale = useRef(new Animated.Value(0)).current;
  const smallCircles = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  // Add an array for the different dot sizes
  const smallCircleSizes = [scaleWidth(28), scaleWidth(20), scaleWidth(24), scaleWidth(16), scaleWidth(22)];

  // --- Add PanResponder for horizontal swipe navigation ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes, with a lower threshold
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (animating) return;
        // Move the content with the gesture
        slideX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (animating) return;
        
        // Lower threshold for more responsive swipes
        const SWIPE_THRESHOLD = 30;
        
        // Swipe left (next)
        if (gestureState.dx < -SWIPE_THRESHOLD && currentStep < TOTAL_STEPS) {
          handleNext();
        }
        // Swipe right (back)
        else if (gestureState.dx > SWIPE_THRESHOLD && currentStep > 1) {
          handleBack();
        } else {
          // Reset position if swipe wasn't strong enough
          Animated.spring(slideX, {
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
    if (currentStep === 1) {
      // Reset values for re-entry
      titleAnim.setValue(-SCREEN_WIDTH);
      logoAnim.setValue(SCREEN_WIDTH);
      descAnim.setValue(0);
      buttonsOpacity.setValue(0);
      setShowButtons(false);

      // First animate the title
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Once title is in place, animate the logo
        Animated.timing(logoAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Add a 300ms delay before fading in the description
          setTimeout(() => {
            Animated.timing(descAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }).start(() => {
              // After description fades in, show and fade in the buttons
              setShowButtons(true);
              Animated.timing(buttonsOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }).start();
            });
          }, 300);
        });
      });
    }
  }, [currentStep, titleAnim, logoAnim, descAnim, buttonsOpacity]);

  // Animate green tick and dots when panel 8 is shown
  useEffect(() => {
    if (currentStep === 8) {
      bigCircleScale.setValue(0);
      smallCircles.forEach(circle => circle.setValue(0));
      Animated.spring(bigCircleScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 80,
      }).start();
      [0, 1, 2, 3, 4].forEach((i) => {
        setTimeout(() => {
          Animated.spring(smallCircles[i], {
            toValue: 1,
            useNativeDriver: true,
            friction: 4,
            tension: 60,
          }).start();
        }, 100 + 90 * i + Math.floor(Math.random() * 60));
      });
    } else {
      bigCircleScale.setValue(0);
      smallCircles.forEach(circle => circle.setValue(0));
    }
  }, [currentStep]);

  // Update smallCircleStyles to move dots further out
  const smallCircleOffset = scaleWidth(140) / 2 + scaleWidth(18); // radius of big circle + gap
  const smallCircleStyles = [
    { top: scaleWidth(70) - smallCircleOffset, left: scaleWidth(70) + smallCircleOffset },   // right
    { top: scaleWidth(70) + smallCircleOffset * 0.7, left: scaleWidth(70) + smallCircleOffset * 0.7 },   // bottom right
    { top: scaleWidth(70) + smallCircleOffset, left: scaleWidth(70) },   // bottom
    { top: scaleWidth(70) + smallCircleOffset * 0.7, left: scaleWidth(70) - smallCircleOffset * 0.7 },  // bottom left
    { top: scaleWidth(70) - smallCircleOffset, left: scaleWidth(70) - smallCircleOffset }, // top left
  ];

  // Helper to render a single step panel
  const renderStepPanel = (stepIdx: number, panelRole: string = '') => {
    // Panel 1: onboarding welcome
    if (stepIdx === 1) {
      return (
        <View style={styles.animatedContent} key={`${panelRole}-${stepIdx}`}>
          <Animated.View style={{
            transform: [{ translateX: titleAnim }],
            marginTop: scaleHeight(110),
            alignItems: 'center',
            width: '100%',
          }}>
            <Text style={styles.welcomeTitle}>WELCOME TO</Text>
          </Animated.View>
          <Animated.View style={{
            transform: [{ translateX: logoAnim }],
            marginTop: scaleHeight(24),
            alignItems: 'center',
            width: '100%',
          }}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View style={{
            opacity: descAnim,
            marginTop: scaleHeight(70),
            width: scaleWidth(300),
            alignSelf: 'center',
          }}>
            <Text style={styles.welcomeDesc}>
              We'll review your account within 24 hours and notify you once it's approved.
            </Text>
            <Text style={[styles.welcomeDesc, { marginTop: scaleHeight(16) }]}>
              In the meantime, explore Stable Stakes so you're ready to go as soon as your account is active.
            </Text>
          </Animated.View>
          {showButtons && (
            <Animated.View style={{
              opacity: buttonsOpacity,
              marginTop: scaleHeight(40),
              width: '100%',
              alignItems: 'center',
            }}>
              <TouchableOpacity 
                style={styles.tourButton}
                onPress={handleNext}
              >
                <Text style={styles.tourButtonText}>Take a tour</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.homeButton}
                onPress={() => rootNavigation.navigate('MainApp', { screen: 'GamesScreen' })}
              >
                <Text style={styles.homeButtonText}>Go to Home Screen</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      );
    }
    // Panels 2-7: rules
    if (stepIdx >= 2 && stepIdx <= 7) {
      const rule = RULES_CONTENT[stepIdx - 2];
      return (
        <View style={styles.animatedContent} key={`${panelRole}-${stepIdx}`}>
          {/* Full-width, top-half image */}
          <Image
            source={rule.image}
            style={styles.onboardingFullImage}
            resizeMode="cover"
          />
          {/* Overlayed white content card */}
          <View style={styles.onboardingContentCard}>
            <Text style={styles.onboardingTitle}>{rule.title}</Text>
            <Text style={styles.onboardingDescription}>{rule.description}</Text>
            {/* Button inside card */}
            <View style={styles.buttonBoxOnboarding}>
              <PrimaryButton
                title={
                  stepIdx === 2 
                    ? "Take a tour" 
                    : stepIdx === 7 
                      ? "Enable Notifications" 
                      : "Next"
                }
                onPress={handleNext}
                isActive={true}
                style={styles.button}
              />
            </View>
            {/* Progress bar below button */}
            <View style={styles.progressContainerOnboarding}>
              {[...Array(6)].map((_, index) => (
                <View
                  key={`progress-${stepIdx}-${index}`}
                  style={[
                    styles.progressIndicatorOnboarding,
                    index + 1 === stepIdx - 1 ? styles.currentStepOnboarding : styles.otherStepOnboarding,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      );
    }
    // Panel 8: onboarding end
    if (stepIdx === 8) {
      return (
        <View style={styles.animatedContent} key={`${panelRole}-${stepIdx}`}>
          <View style={[styles.contentBox, { marginTop: scaleHeight(100) }]}>
            <View style={styles.completeContainer}>
              <Animated.View style={[styles.bigCircle, { transform: [{ scale: bigCircleScale }] }]}> 
                <Image source={require('../../../assets/icons/deposit-tick.png')} style={styles.tickIcon} />
                {smallCircles.map((circle, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.smallCircle,
                      smallCircleStyles[i],
                      {
                        width: smallCircleSizes[i],
                        height: smallCircleSizes[i],
                        borderRadius: smallCircleSizes[i] / 2,
                        transform: [{ scale: circle }],
                      }
                    ]}
                  />
                ))}
              </Animated.View>
            </View>
            <Text style={styles.completionTitle}>YOU'RE ALL SET</Text>
            <Text style={styles.completionDescription}>
              We'll review your account within 24 hours and notify you once it's approved.
            </Text>
            <Text style={[styles.completionDescription, { marginTop: scaleHeight(16) }]}> 
              Enable notifications to stay updated on your account status and upcoming competitions.
            </Text>
          </View>
        </View>
      );
    }
    return <View style={styles.animatedContent} key={stepIdx} />;
  };

  const requestNotificationPermissions = async () => {
    try {
      // Check if running in Expo Go
      const isExpoGo = Constants.appOwnership === 'expo';
      
      if (isExpoGo) {
        Alert.alert(
          "Development Mode",
          "Push notifications are limited in Expo Go. In the production app, you'll be able to receive notifications about your account status and competitions.",
          [{ 
            text: "Got it", 
            onPress: () => {
              rootNavigation.navigate('MainApp', { screen: 'GamesScreen' });
            }
          }]
        );
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        Alert.alert(
          "Notifications Disabled",
          "You can enable notifications later in your device settings.",
          [{ 
            text: "Got it", 
            onPress: () => {
              rootNavigation.navigate('MainApp', { screen: 'GamesScreen' });
            }
          }]
        );
        return;
      }
      
      // Permissions granted, close the panel and navigate
      rootNavigation.navigate('MainApp', { screen: 'GamesScreen' });
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      Alert.alert(
        "Error",
        "There was an error setting up notifications. You can try again later in your device settings.",
        [{ 
          text: "Got it", 
          onPress: () => {
            rootNavigation.navigate('MainApp', { screen: 'GamesScreen' });
          }
        }]
      );
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && !animating) {
      setAnimating(true);
      setDirection('next');
      setTargetStep(currentStep + 1);
      slideX.setValue(0);
      Animated.timing(slideX, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setPendingStep(currentStep + 1);
      });
    } else if (currentStep === TOTAL_STEPS) {
      requestNotificationPermissions();
    }
  };

  // Back: render prev in left, current in right, start row at -SCREEN_WIDTH, animate to 0
  const handleBack = () => {
    if (currentStep > 1 && !animating) {
      setAnimating(true);
      setDirection('back');
      setTargetStep(currentStep - 1);
      slideX.setValue(0); // Start from current position
      Animated.timing(slideX, {
        toValue: SCREEN_WIDTH, // Animate to the right
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setPendingStep(currentStep - 1);
      });
    }
  };

  // After animation, update currentStep and reset row in a useEffect
  useEffect(() => {
    if (pendingStep !== null) {
      // Wait for one render, then update currentStep and reset row
      setTimeout(() => {
        setCurrentStep(pendingStep);
        setAnimating(false);
        setDirection(null);
        setTargetStep(null);
        slideX.setValue(0);
        setPendingStep(null);
      }, 0);
    }
  }, [pendingStep, slideX]);

  // Determine which panels to render and row position
  let panels = [];
  let rowTranslateX: Animated.AnimatedValue | Animated.AnimatedInterpolation<number> = slideX;
  if (animating && direction === 'next' && targetStep) {
    panels = [
      renderStepPanel(currentStep, 'current'),
      renderStepPanel(targetStep, 'target'),
    ];
    rowTranslateX = slideX;
  } else if (animating && direction === 'back' && targetStep) {
    panels = [
      renderStepPanel(targetStep, 'target'),
      renderStepPanel(currentStep, 'current'),
    ];
    rowTranslateX = slideX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [0, -SCREEN_WIDTH],
    });
  } else {
    panels = [
      renderStepPanel(currentStep, 'current'),
      <View style={styles.animatedContent} key="empty" />,
    ];
    rowTranslateX = slideX;
  }

  return (
    <View style={[styles.container, { display: isVisible ? 'flex' : 'none' }]}> 
      <Image 
        source={require('C:/Users/rhysg/Stable Stakes Front End/assets/images/golf-course.jpg')} 
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} {...panResponder.panHandlers}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <RNImage
              source={require('C:/Users/rhysg/Stable Stakes Front End/assets/icons/navigation/back-white.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <Animated.View
          style={{
            flexDirection: 'row',
            width: SCREEN_WIDTH * 2,
            transform: [{ translateX: rowTranslateX as any }],
            flex: 1,
          }}
        >
          {panels}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18302A',
  },
  contentBox: {
    width: scaleWidth(300),
    alignSelf: 'center',
    alignItems: 'center',
  },
  animatedContent: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 0,
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(24),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.24),
    textTransform: 'uppercase',
    marginTop: scaleHeight(110),
  },
  description: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(24),
    marginTop: scaleHeight(16),
    paddingHorizontal: scaleWidth(24),
  },
  buttonContainer: {
    position: 'absolute',
    top: scaleHeight(650),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonBox: {
    width: scaleWidth(300),
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    width: scaleWidth(300),
  },
  progressContainer: {
    position: 'absolute',
    top: scaleHeight(720),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(8),
  },
  progressIndicator: {
    height: scaleHeight(5.364),
    borderRadius: scaleWidth(10),
  },
  currentStep: {
    width: scaleWidth(24.136),
    backgroundColor: '#FFF',
  },
  otherStep: {
    width: scaleWidth(5.364),
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  backButton: {
    position: 'absolute',
    top: scaleHeight(47),
    left: scaleWidth(24),
    width: scaleWidth(29),
    height: scaleWidth(29),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
    resizeMode: 'contain',
  },
  ruleCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleCard: {
    width: scaleWidth(300),
    height: scaleHeight(400),
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(20),
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: -scaleHeight(40) + 30,
  },
  ruleImageContainer: {
    position: 'relative',
    width: scaleWidth(360),
    height: scaleHeight(500),
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  ruleImage: {
    width: scaleWidth(360),
    height: scaleHeight(500),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignSelf: 'flex-start',
  },
  ruleTextContainer: {
    padding: scaleWidth(20),
  },
  ruleDescription: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    color: '#18302A',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
  },
  titleAbsolute: {
    position: 'absolute',
    top: scaleHeight(110),
    left: 0,
    right: 0,
    zIndex: 2,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(24),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.24),
    textTransform: 'uppercase',
  },
  welcomeTitle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: scaleWidth(-0.24),
    textTransform: 'uppercase',
  },
  logo: {
    width: scaleWidth(180),
    height: scaleHeight(114),
    alignSelf: 'center',
  },
  welcomeDesc: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
  },
  completionIcon: {
    width: scaleWidth(140),
    height: scaleWidth(140),
    marginTop: scaleHeight(110),
    alignSelf: 'center',
  },
  completionTitle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: scaleWidth(-0.24),
    textTransform: 'uppercase',
    marginTop: scaleHeight(90),
  },
  completionDescription: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20),
    marginTop: scaleHeight(16),
    paddingHorizontal: scaleWidth(24),
  },
  bigCircle: {
    width: scaleWidth(140),
    height: scaleWidth(140),
    borderRadius: scaleWidth(70),
    backgroundColor: '#4EDD69',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tickIcon: {
    width: scaleWidth(64),
    height: scaleWidth(64),
    resizeMode: 'contain',
    position: 'absolute',
    top: scaleWidth(38),
    left: scaleWidth(38),
  },
  smallCircle: {
    position: 'absolute',
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    backgroundColor: '#4EDD69',
  },
  completeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaleHeight(20),
  },
  onboardingFullImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: scaleWidth(360),
    height: scaleHeight(389 + 150), // 150px taller
    zIndex: 1,
  },
  onboardingContentCard: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: scaleWidth(360),
    minHeight: scaleHeight(300),
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: scaleWidth(32),
    borderTopRightRadius: scaleWidth(32),
    paddingTop: scaleHeight(36),
    paddingHorizontal: scaleWidth(24),
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  onboardingTitle: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(22),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(34),
    textTransform: 'uppercase',
    marginBottom: scaleHeight(12),
  },
  onboardingDescription: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
    marginBottom: scaleHeight(24),
  },
  progressContainerOnboarding: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(8),
    marginTop: scaleHeight(12),
    marginBottom: scaleHeight(16),
    width: '100%',
  },
  progressIndicatorOnboarding: {
    height: scaleHeight(5.364),
    borderRadius: scaleWidth(10),
    backgroundColor: '#18302A',
  },
  currentStepOnboarding: {
    width: scaleWidth(24.136),
    backgroundColor: '#18302A',
  },
  otherStepOnboarding: {
    width: scaleWidth(5.364),
    backgroundColor: '#18302A',
    opacity: 0.3,
  },
  buttonBoxOnboarding: {
    width: scaleWidth(300),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(8),
  },
  tourButton: {
    display: 'flex',
    width: scaleWidth(300),
    height: scaleHeight(40),
    padding: scaleHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(25),
    flexShrink: 0,
    borderRadius: scaleWidth(100),
    backgroundColor: '#4EDD69',
    marginBottom: scaleHeight(12),
  },
  tourButtonText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.42),
  },
  homeButton: {
    display: 'flex',
    width: scaleWidth(300),
    height: scaleHeight(40),
    padding: scaleHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(25),
    flexShrink: 0,
    borderRadius: scaleWidth(100),
    borderWidth: 1,
    borderColor: '#4EDD69',
    backgroundColor: '#E3E3E3',
  },
  homeButtonText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.42),
  },
}); 