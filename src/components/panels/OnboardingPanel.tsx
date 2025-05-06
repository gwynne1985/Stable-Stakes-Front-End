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
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

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
    title: "1. CHOOSE A GAME",
    description: "Pick from three different games, each with its own target Stableford score and reward level. The higher the target score, the higher the potential reward.",
    image: require('../../../assets/images/rules/game-rules-1.png'),
  },
  {
    title: "2. PLACE YOUR STAKE",
    description: "Decide how much to stake: £10, £20, or £50. Higher stakes mean bigger potential winnings.",
    image: require('../../../assets/images/rules/game-rules-2.png'),
  },
  {
    title: "3. TELL US WHEN YOU'LL PLAY",
    description: "Enter the date of your competition round. Stakes must be placed by 11:59pm the day before your comp. You can enter multiple games for extra chances to win.",
    image: require('../../../assets/images/rules/game-rules-3.png'),
  },
  {
    title: "4. SUBMIT YOUR SCORE",
    description: "The day after your round, we'll prompt you to enter your Stableford score. If you hit or exceed your target, upload a screenshot of your official scorecard from IG app or How Did I Do.",
    image: require('../../../assets/images/rules/game-rules-4.png'),
  },
  {
    title: "5. WAIT FOR APPROVAL",
    description: "Scores are verified against your handicap and competition records. Once approved, winnings appear in your Stable Stakes wallet within 48 hours.",
    image: require('../../../assets/images/rules/game-rules-5.png'),
  },
  {
    title: "6. SPEND YOUR REWARDS",
    description: "Redeem your winnings for vouchers at your club's pro shop or partner golf retailers. Treat yourself to new gear, lessons, or equipment—because good golf pays off!",
    image: require('../../../assets/images/rules/game-rules-6.png'),
  },
];

export const OnboardingPanel: React.FC<OnboardingPanelProps> = ({
  isVisible,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'back' | null>(null);
  const [targetStep, setTargetStep] = useState<number | null>(null);
  const [keepPanels, setKeepPanels] = useState(false);
  const [postAnimationCleanup, setPostAnimationCleanup] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const slideX = useRef(new Animated.Value(0)).current;

  // Helper to render a single step panel
  const renderStepPanel = (stepIdx: number) => {
    // Panel 1: onboarding welcome
    if (stepIdx === 1) {
      const step = ONBOARDING_STEPS[0];
      return (
        <View style={styles.animatedContent} key={stepIdx}>
          <View style={styles.contentBox}>
            <Text style={styles.title}>{step.title}</Text>
          </View>
        </View>
      );
    }
    // Panels 2-7: rules
    if (stepIdx >= 2 && stepIdx <= 7) {
      const rule = RULES_CONTENT[stepIdx - 2];
      const onboardingTitle = ONBOARDING_STEPS[stepIdx - 1].title;
      return (
        <View style={styles.animatedContent} key={stepIdx}>
          <Text style={styles.titleAbsolute}>{onboardingTitle}</Text>
          <View style={styles.ruleCardContainer}>
            <View style={styles.ruleCard}>
              <View style={styles.ruleImageContainer}>
                <Image
                  source={rule.image}
                  style={styles.ruleImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.ruleTextContainer}>
                <Text style={styles.ruleDescription}>{rule.description}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
    // Panel 8: onboarding end
    if (stepIdx === 8) {
      const step = ONBOARDING_STEPS[7];
      return (
        <View style={styles.animatedContent} key={stepIdx}>
          <View style={styles.contentBox}>
            <Text style={styles.title}>{step.title}</Text>
          </View>
        </View>
      );
    }
    return <View style={styles.animatedContent} key={stepIdx} />;
  };

  // Next: animate from 0 to -SCREEN_WIDTH, then set current to next and reset
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
      onClose();
    }
  };

  // Back: render prev in left, current in right, start row at -SCREEN_WIDTH, animate to 0
  const handleBack = () => {
    if (currentStep > 1 && !animating) {
      setAnimating(true);
      setDirection('back');
      setTargetStep(currentStep - 1);
      slideX.setValue(-SCREEN_WIDTH);
      Animated.timing(slideX, {
        toValue: 0,
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
      renderStepPanel(currentStep),
      renderStepPanel(targetStep),
    ];
    rowTranslateX = slideX;
  } else if (animating && direction === 'back' && targetStep) {
    panels = [
      renderStepPanel(targetStep),
      renderStepPanel(currentStep),
    ];
    rowTranslateX = slideX;
  } else {
    panels = [
      renderStepPanel(currentStep),
      <View style={styles.animatedContent} key="empty" />,
    ];
    rowTranslateX = new Animated.Value(0);
  }

  const renderProgressBar = () => {
    if (currentStep === 1 || currentStep === TOTAL_STEPS) return null;
    return (
      <View style={styles.progressContainer}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressIndicator,
              index + 1 === currentStep - 1 ? styles.currentStep : styles.otherStep,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { display: isVisible ? 'flex' : 'none' }]}> 
      <Image 
        source={require('C:/Users/rhysg/Stable Stakes Front End/assets/images/golf-course.jpg')} 
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
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
        <View style={styles.buttonContainer}>
          <View style={styles.buttonBox}>
            <PrimaryButton
              title={currentStep === TOTAL_STEPS ? "Let's Go" : "Next"}
              onPress={handleNext}
              isActive={true}
              style={styles.button}
            />
          </View>
        </View>
        {renderProgressBar()}
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
    width: '100%',
    height: scaleHeight(225), // scale up from 180
  },
  ruleImage: {
    width: '100%',
    height: scaleHeight(225),
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
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
}); 