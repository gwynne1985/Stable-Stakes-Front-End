import React, { useRef, useState } from 'react';
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
  Modal,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { StakeEntryStep } from './GameEntryPanel/StakeEntryStep';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_HEIGHT = scaleHeight(737);
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 50;
const totalSteps = 2;

interface GameEntrySlidingPanelProps {
  isVisible: boolean;
  onClose: () => void;
  targetScore: 34 | 37 | 40;
  walletBalance: number;
}

const CompDateEntryStep: React.FC<{ onBack: () => void; onNext: () => void }> = ({ onBack, onNext }) => {
  const [selected, setSelected] = React.useState<number | 'other' | null>(null);

  // Calculate tomorrow and next 6 days
  const today = new Date();
  const chips = Array.from({ length: 8 }, (_, i) => {
    if (i === 0) return { label: 'TOMORROW', value: 0 };
    if (i === 7) return { label: 'Other date', value: 'other' };
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    const dayShort = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNum = date.getDate();
    const suffix =
      dayNum % 10 === 1 && dayNum !== 11 ? 'ST' :
      dayNum % 10 === 2 && dayNum !== 12 ? 'ND' :
      dayNum % 10 === 3 && dayNum !== 13 ? 'RD' : 'TH';
    return {
      label: `${dayShort}\n${dayNum}${suffix}`,
      value: i,
      date,
      dayShort,
      dayNum,
      suffix,
    };
  });

  // Get selected date string
  let selectedDateStr = '';
  if (selected === 0) {
    const date = new Date(today);
    date.setDate(today.getDate() + 1);
    selectedDateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
  } else if (typeof selected === 'number' && selected > 0 && selected < 7) {
    const date = new Date(today);
    date.setDate(today.getDate() + selected);
    selectedDateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
  } else if (selected === 'other') {
    selectedDateStr = 'OTHER DATE';
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#E3E3E3', position: 'relative', width: '100%' }}>
      {/* Chips grid */}
      <View style={{ marginTop: scaleHeight(24), width: scaleWidth(300) }}>
        {[0, 1, 2, 3].map(row => (
          <View key={row} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(12) }}>
            {[0, 1].map(col => {
              const idx = row * 2 + col;
              const chip = chips[idx];
              const isSelected = selected === chip.value;
              const isSpecial = chip.value === 0 || chip.value === 'other';
              return (
                <TouchableOpacity
                  key={chip.label}
                  style={{
                    width: scaleWidth(138),
                    height: scaleHeight(46),
                    paddingTop: scaleHeight(14),
                    paddingBottom: scaleHeight(14),
                    paddingLeft: scaleWidth(28),
                    paddingRight: scaleWidth(29),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: scaleWidth(100),
                    borderWidth: 1.5,
                    borderColor: isSelected ? '#18302A' : '#4EDD69',
                    backgroundColor: isSelected ? '#4EDD69' : '#FFF',
                  }}
                  onPress={() => setSelected(chip.value as number | 'other')}
                  activeOpacity={0.85}
                >
                  {isSpecial ? (
                    <Text
                      style={{
                        color: '#18302A',
                        textAlign: 'center',
                        fontFamily: 'Poppins',
                        fontSize: scaleWidth(12),
                        fontStyle: 'italic',
                        fontWeight: '700',
                        letterSpacing: -0.36,
                        textTransform: 'uppercase',
                      }}
                    >
                      {chip.label}
                    </Text>
                  ) : (
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Text
                        style={{
                          color: '#18302A',
                          textAlign: 'center',
                          fontFamily: 'Poppins',
                          fontSize: scaleWidth(12),
                          fontStyle: 'italic',
                          fontWeight: '700',
                          letterSpacing: -0.36,
                          textTransform: 'uppercase',
                        }}
                      >
                        {chip.dayShort}
                      </Text>
                      <Text
                        style={{
                          color: '#18302A',
                          textAlign: 'center',
                          fontFamily: 'Poppins',
                          fontSize: scaleWidth(12),
                          fontStyle: 'italic',
                          fontWeight: '700',
                          letterSpacing: -0.36,
                          textTransform: 'uppercase',
                        }}
                      >
                        {chip.dayNum}{chip.suffix}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
      {/* Competition Date label and selected date */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: scaleHeight(18) }}>
        <Text
          style={{
            color: '#18302A',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: scaleWidth(12),
            fontStyle: 'italic',
            fontWeight: '700',
            letterSpacing: -0.36,
          }}
        >
          COMPETITION DATE:
        </Text>
        {selected !== null && (
          <Text
            style={{
              color: '#18302A',
              fontFamily: 'Poppins',
              fontSize: scaleWidth(13),
              fontStyle: 'italic',
              fontWeight: '600',
              letterSpacing: -0.13,
              textTransform: 'uppercase',
              marginLeft: scaleWidth(8),
            }}
          >
            {selectedDateStr}
          </Text>
        )}
      </View>
    </View>
  );
};

export const GameEntrySlidingPanel: React.FC<GameEntrySlidingPanelProps> = ({
  isVisible,
  onClose,
  targetScore,
  walletBalance,
}) => {
  const [step, setStep] = useState(1);
  const [selectedStake, setSelectedStake] = useState<number | null>(null);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const slideX = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current as Animated.Value;
  const hasCrossedThresholdRef = useRef(false);
  const backFadeAnim = React.useRef(new Animated.Value(0)).current;

  // Animate back button in when on step 2
  React.useEffect(() => {
    if (step === 2) {
      Animated.timing(backFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      backFadeAnim.setValue(0);
    }
  }, [step]);

  // Panel slide up/down
  React.useEffect(() => {
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

  // Pan to dismiss
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
          if (!hasCrossedThresholdRef.current && gestureState.dy > SWIPE_THRESHOLD) {
            hasCrossedThresholdRef.current = true;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } else if (hasCrossedThresholdRef.current && gestureState.dy <= SWIPE_THRESHOLD) {
            hasCrossedThresholdRef.current = false;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        hasCrossedThresholdRef.current = false;
        if (gestureState.dy > SWIPE_THRESHOLD) {
          Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            panY.setValue(0);
            slideAnim.setValue(SCREEN_HEIGHT);
            onClose();
          });
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

  // Step transition logic (horizontal slide)
  const handleNext = () => {
    Animated.timing(slideX, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep(2);
    });
  };
  const handleBack = () => {
    Animated.timing(slideX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep(1);
    });
  };

  // Panel slide up/down
  const handlePanelClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
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
            {/* Back button (panel-level, only on step 2) */}
            {step === 2 && (
              <Animated.View
                style={{
                  position: 'absolute',
                  top: scaleHeight(24),
                  left: scaleWidth(20),
                  width: scaleWidth(32),
                  height: scaleWidth(32),
                  opacity: backFadeAnim,
                  zIndex: 10,
                }}
              >
                <TouchableOpacity onPress={handleBack} hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}>
                  <Image
                    source={require('../../../assets/icons/navigation/back.png')}
                    style={{ width: scaleWidth(29), height: scaleWidth(29) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
            {/* Panel Header (fixed) */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handlePanelClose}
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            >
              <Image
                source={require('../../../assets/icons/navigation/close.png')}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.targetScoreRow}>
              <Text style={styles.targetScoreNumber}>{targetScore}</Text>
              <Text style={[styles.targetScorePlus, { color: '#4EDD69' }]}>+</Text>
            </View>
            <Text style={styles.panelTitle}>
              {step === 1 ? 'SELECT A STAKE' : 'ENTER COMP DATE'}
            </Text>
            {/* Animated Content Area */}
            <View style={{ width: SCREEN_WIDTH, overflow: 'hidden', flex: 1 }}>
              <Animated.View
                style={[
                  styles.animatedContent,
                  {
                    flexDirection: 'row',
                    width: SCREEN_WIDTH * 2,
                    transform: [{ translateX: slideX }],
                  },
                ]}
              >
                <View style={{ width: SCREEN_WIDTH }}>
                  <StakeEntryStep
                    targetScore={targetScore}
                    walletBalance={walletBalance}
                    selectedStake={selectedStake}
                    setSelectedStake={setSelectedStake}
                    onBack={onClose}
                    onNext={handleNext}
                    game={null}
                    potentialReturn={0}
                  />
                </View>
                <View style={{ width: SCREEN_WIDTH }}>
                  <CompDateEntryStep
                    onBack={handleBack}
                    onNext={() => {}}
                  />
                </View>
              </Animated.View>
            </View>
            {/* Enter Game button and progress indicator (fixed) */}
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
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
  closeButton: {
    position: 'absolute',
    top: scaleHeight(24),
    right: scaleWidth(20),
    width: scaleWidth(32),
    height: scaleWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
  },
  targetScoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: scaleHeight(73),
    marginBottom: scaleHeight(5),
  },
  targetScoreNumber: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(80),
    color: '#18302A',
    textAlign: 'center',
    lineHeight: scaleHeight(90),
    letterSpacing: 1,
  },
  targetScorePlus: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(80),
    marginLeft: scaleWidth(2),
    textAlign: 'center',
    lineHeight: scaleHeight(90),
    letterSpacing: -2,
  },
  panelTitle: {
    marginTop: scaleHeight(0),
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(22),
    color: '#18302A',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: scaleHeight(40),
  },
  animatedContent: {
    width: '100%',
    flex: 1,
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
}); 