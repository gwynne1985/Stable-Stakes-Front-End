import React, { useRef, useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { StakeEntryStep } from '../games/GameEntryPanel/StakeEntryStep';
import { CompDateCalendarSheet } from './CompDateCalendarSheet';
import { GameSummaryStep, GameType } from '../games/GameEntryPanel/GameSummaryStep';
import { PrimaryButton } from '../../components/PrimaryButton';
import { GameEntryConfirmationPopup } from './GameEntryConfirmationPopup';
import { doc, getDoc, setDoc, serverTimestamp, addDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { USERS, CLUBS, GAMES } from '../../constants/firestore';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_HEIGHT = scaleHeight(737);
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 50;
const totalSteps = 3;

interface GameEntrySlidingPanelProps {
  isVisible: boolean;
  onClose: () => void;
  targetScore: number;
  walletBalance: number;
  initialStake?: number;
  initialDate?: string;
  onConfirm?: () => void;
  isEditMode?: boolean;
  gameType: GameType;
}

const CompDateEntryStep: React.FC<{ onBack: () => void; onNext: (dateStr: string) => void; initialDate?: string }> = ({ onBack, onNext, initialDate }) => {
  const [selected, setSelected] = React.useState<number | 'other' | null>(null);
  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const [otherDate, setOtherDate] = React.useState<Date | null>(null);

  // Calculate tomorrow and next 6 days
  const today = new Date();
  const chips = Array.from({ length: 8 }, (_, i) => {
    if (i === 0) return { label: 'TOMORROW', value: 0 };
    if (i === 7) return { label: 'Other date', value: 'other' };
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1); // i+1: day after tomorrow for i=1, etc.
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

  // Pre-select chip or other date if initialDate is provided
  React.useEffect(() => {
    if (!initialDate) return;
    const parsedInitial = new Date(initialDate);
    console.log('[CompDateEntryStep] initialDate:', initialDate, 'parsedInitial:', parsedInitial, 'parsedInitial.toDateString():', parsedInitial.toDateString());
    chips.forEach((chip, i) => {
      if (chip.date) {
        console.log(`[CompDateEntryStep] chip[${i}].date:`, chip.date, 'chip[${i}].date.toDateString():', chip.date.toDateString(), 'chip.value:', chip.value);
      }
    });
    if (isNaN(parsedInitial.getTime())) return; // Invalid date, do nothing
    let found = false;
    for (let i = 1; i <= 6; i++) { // Only check chips 1-6 for date match
      if (typeof chips[i].value === 'number' && chips[i].date!.toDateString() === parsedInitial.toDateString()) {
        setSelected(chips[i].value as number);
        found = true;
        break;
      }
    }
    if (!found) {
      setSelected('other' as 'other');
      setOtherDate(parsedInitial);
    }
  }, [initialDate]);

  // DEBUG: Log chips array
  React.useEffect(() => {
    console.log('[CompDateEntryStep] Chips array:', chips);
  }, [chips]);

  // Get selected date string
  let selectedDateStr = '';
  if (selected === 0) {
    const date = new Date(today);
    date.setDate(today.getDate() + 1);
    selectedDateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
  } else if (typeof selected === 'number' && selected > 0 && selected < 7) {
    const date = new Date(today);
    date.setDate(today.getDate() + selected + 1);
    selectedDateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
  } else if (selected === 'other' && otherDate) {
    selectedDateStr = otherDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
  } else if (selected === 'other') {
    selectedDateStr = 'OTHER DATE';
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#E3E3E3', position: 'relative', width: '100%' }}>
      {/* Chips grid */}
      <View style={{ marginTop: scaleHeight(-25), width: scaleWidth(300) }}>
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
                    borderColor: isSelected ? '#4EDD69' : '#4EDD69',
                    backgroundColor: isSelected ? '#4EDD69' : '#FFF',
                  }}
                  onPress={() => {
                    if (isSelected) {
                      setSelected(null);
                      if (chip.value === 'other') setOtherDate(null);
                    } else if (chip.value === 'other') {
                      setCalendarVisible(true);
                    } else {
                      setSelected(chip.value as number | 'other');
                      setOtherDate(null);
                    }
                  }}
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: scaleWidth(300), marginTop: scaleHeight(18) }}>
        <Text
          style={{
            color: '#18302A',
            textAlign: 'left',
            fontFamily: 'Poppins',
            fontSize: scaleWidth(16),
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
              fontFamily: 'Poppins-SemiBold',
              fontSize: scaleWidth(16),
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
      <PrimaryButton
        title="Next"
        onPress={() => {
          if (selected !== null && selectedDateStr) {
            onNext(selectedDateStr);
          }
        }}
        isActive={selected !== null}
        style={{ width: scaleWidth(300), marginTop: scaleHeight(88) }}
      />
      <CompDateCalendarSheet
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onDateSelected={(date: Date) => {
          setOtherDate(date);
          setSelected('other' as 'other');
          setCalendarVisible(false);
        }}
        initialDate={otherDate || undefined}
      />
    </View>
  );
};

export const GameEntrySlidingPanel: React.FC<GameEntrySlidingPanelProps> = ({
  isVisible,
  onClose,
  targetScore,
  walletBalance,
  initialStake,
  initialDate,
  onConfirm,
  isEditMode = false,
  gameType,
}) => {
  const [step, setStep] = useState(initialStake ? 2 : 1);
  const [selectedStake, setSelectedStake] = useState<number | null>(initialStake || null);
  const [selectedCompDate, setSelectedCompDate] = useState<string>(initialDate || '');
  const [showGameEntryConfirmation, setShowGameEntryConfirmation] = useState(false);
  const [complete, setComplete] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const slideX = useRef(new Animated.Value(initialStake ? 1 : 0)).current;
  const contentSlideX = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current as Animated.Value;
  const hasCrossedThresholdRef = useRef(false);
  const backFadeAnim = React.useRef(new Animated.Value(0)).current;
  const [userClubId, setUserClubId] = useState<string | null>(null);
  const [clubDisplayName, setClubDisplayName] = useState('Your Club');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize panel position and state when visible changes
  React.useEffect(() => {
    if (isVisible) {
      if (initialStake) {
        // If we have an initial stake, start at step 2 and set the slide position
        setStep(2);
        setSelectedStake(initialStake);
        slideX.setValue(1);
      } else {
        // Reset to initial state if no initial stake
        setStep(1);
        setSelectedStake(null);
        slideX.setValue(0);
      }
    }
  }, [isVisible, initialStake]);

  // Reset state when panel becomes invisible
  React.useEffect(() => {
    if (!isVisible) {
      setStep(initialStake ? 2 : 1);
      setSelectedStake(initialStake || null);
      setSelectedCompDate(initialDate || '');
      setShowGameEntryConfirmation(false);
      slideX.setValue(initialStake ? 1 : 0);
      contentSlideX.setValue(0);
    }
  }, [isVisible, initialStake, initialDate]);

  // Animate back button in when on comp date step
  React.useEffect(() => {
    if (step === 3) {
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
    if (step === 1) {
      // Game Summary to Stake Entry - full screen slide
      Animated.timing(slideX, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setStep(2);
      });
    } else if (step === 2) {
      // Stake Entry to Comp Date - only content slides
      Animated.timing(contentSlideX, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setStep(3);
      });
    }
  };

  const handleBack = () => {
    if (step === 3) {
      // Comp Date to Stake Entry - only content slides
      Animated.timing(contentSlideX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setStep(2);
      });
    } else if (step === 2) {
      // Stake Entry to Game Summary - full screen slide
      Animated.timing(slideX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setStep(1);
      });
    }
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

  // New: handle Next on Comp Date page
  const handleCompDateNext = (compDateStr: string) => {
    console.log("[GameEntrySlidingPanel] handleCompDateNext called with:", compDateStr); // LOG A
    setSelectedCompDate(compDateStr);
    setShowGameEntryConfirmation(true);
  };

  // Handle confirm in confirmation popup
  const handleConfirm = async () => {
    setShowGameEntryConfirmation(false);
    // if (onConfirm) onConfirm(); // Call this after DB ops too.

    const user = auth.currentUser;
    if (user && selectedStake && selectedCompDate && userClubId) {
      console.log("[GAME BOOKING] Starting Firestore operations..."); // LOG 1
      setIsLoading(true);
      try {
        const gameData = {
          user_id: user.uid,
          club_id: userClubId,
          game_type: gameType,
          target_score: targetScore,
          stake_amount: selectedStake,
          competition_date: selectedCompDate, 
          potential_return: selectedStake * (targetScore === 34 ? 2 : targetScore === 37 || targetScore === 38 ? 5 : 7),
          status: "upcoming",
          result: "pending",
          created_at: serverTimestamp(),
        };
        console.log("[GAME BOOKING] Game data prepared:", gameData); // LOG 2
        
        await addDoc(collection(db, GAMES), gameData);
        console.log("[GAME BOOKING] Game document CREATED successfully."); // LOG 3

        const userDocRef = doc(db, USERS, user.uid);
        const userDoc = await getDoc(userDocRef);
        console.log("[GAME BOOKING] User document fetched for wallet update."); // LOG 4

        if (userDoc.exists()) {
          const currentBalance = userDoc.data().wallet_balance || 0;
          console.log("[GAME BOOKING] Current wallet balance:", currentBalance); // LOG 5
          await updateDoc(userDocRef, { wallet_balance: currentBalance - selectedStake });
          console.log("[GAME BOOKING] Wallet balance UPDATED successfully."); // LOG 6
        } else {
          console.error("[GAME BOOKING] User document not found for wallet update."); // LOG 7
        }
        
        console.log("Game created and wallet updated successfully");
        setComplete(true); 
        if (onConfirm) onConfirm(); 

      } catch (error) {
        console.error("[GAME BOOKING] Error during Firestore operations:", error); // LOG 8
        Alert.alert("Error", "Failed to book game. Please try again.");
        setComplete(false); 
      } finally {
        setIsLoading(false); 
      }
    } else {
      console.warn("[GAME BOOKING] Missing data for Firestore write:", { user, selectedStake, selectedCompDate, userClubId }); // LOG 9
      Alert.alert("Error", "Could not book game. Please try again.");
    }
  };

  // Handle close of GAME UPDATE message
  const handleCompleteClose = () => {
    setComplete(false);
    onClose();
  };

  // DEBUG: Log targetScore, initialStake, and selectedStake before rendering StakeEntryStep
  React.useEffect(() => {
    if (isVisible) {
      console.log('[GameEntrySlidingPanel] targetScore:', targetScore, 'initialStake:', initialStake, 'selectedStake:', selectedStake);
    }
  }, [isVisible, targetScore, initialStake, selectedStake]);

  // DEBUG: Log current step
  React.useEffect(() => {
    console.log('[GameEntrySlidingPanel] Current step:', step);
  }, [step]);

  // DEBUG: Log isVisible and step at the top of render
  console.log('[GameEntrySlidingPanel] isVisible:', isVisible, 'step:', step);

  useEffect(() => {
    const fetchUserDataAndClubName = async () => {
      if (!isVisible) {
        // Reset when panel is not visible to ensure fresh data on next open
        setUserClubId(null);
        setClubDisplayName('Your Club');
        return;
      }

      // Only fetch if clubId not already fetched for this visibility cycle
      if (userClubId) return;

      const user = auth.currentUser;
      if (user) {
        try {
          console.log("[GameEntrySlidingPanel] Fetching user and club data...");
          const userDocRef = doc(db, USERS, user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const fetchedUserClubId = userDoc.data().clubId;
            setUserClubId(fetchedUserClubId || null);

            if (fetchedUserClubId) {
              console.log("[GameEntrySlidingPanel] User clubId:", fetchedUserClubId);
              const clubsQuery = query(collection(db, CLUBS), where('club_id', '==', fetchedUserClubId));
              const clubsSnapshot = await getDocs(clubsQuery);
              const clubDoc = clubsSnapshot.docs[0];

              if (clubDoc && clubDoc.exists()) {
                const clubData = clubDoc.data();
                const displayName = clubData.club_name_short || clubData.club_name || 'Your Club';
                setClubDisplayName(displayName);
                console.log("[GameEntrySlidingPanel] Club display name set to:", displayName);
              } else {
                console.log("[GameEntrySlidingPanel] Club document not found for club_id:", fetchedUserClubId);
                setClubDisplayName('Your Club'); // Fallback
              }
            } else {
              console.log("[GameEntrySlidingPanel] User has no clubId.");
              setClubDisplayName('Your Club'); // Fallback
            }
          } else {
            console.log("[GameEntrySlidingPanel] User document not found.");
            setClubDisplayName('Your Club'); // Fallback
          }
        } catch (error) {
          console.error("[GameEntrySlidingPanel] Error fetching user/club data:", error);
          setClubDisplayName('Your Club'); // Fallback
        }
      }
    };
    fetchUserDataAndClubName();
  }, [isVisible, userClubId]); // Rerun if isVisible changes, or if userClubId was initially null and gets set

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
            {/* Animated Content Area */}
            <View style={{ width: SCREEN_WIDTH, overflow: 'hidden', flex: 1 }}>
              <Animated.View
                style={[
                  styles.animatedContent,
                  {
                    flexDirection: 'row',
                    width: SCREEN_WIDTH * 2,
                    transform: [{ translateX: slideX.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -SCREEN_WIDTH],
                      extrapolate: 'clamp',
                    }) }],
                  },
                ]}
              >
                {/* Game Summary Step */}
                <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
                  <GameSummaryStep
                    targetScore={targetScore}
                    gameType={gameType}
                    onNext={handleNext}
                    onClose={onClose}
                    handlePanelClose={handlePanelClose}
                  />
                </View>

                {/* Stake Entry Step */}
                <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
                  {/* Fixed Header Elements */}
                  {!(step === 2 && !!initialStake) && (
                  <TouchableOpacity
                    style={[styles.closeButton, { left: scaleWidth(20), right: undefined, position: 'absolute', top: scaleHeight(24), zIndex: 11 }]}
                    onPress={handleBack}
                    hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                  >
                    <Image
                      source={require('../../../assets/icons/navigation/back.png')}
                      style={styles.closeIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.closeButton, { right: scaleWidth(20), left: undefined, position: 'absolute', top: scaleHeight(24), zIndex: 11 }]}
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
                    {step === 2 ? 'SELECT A STAKE' : 'ENTER COMP DATE'}
                  </Text>

                  {/* Sliding Content Area for Stake Entry and Comp Date */}
                  <View style={{ flex: 1, marginTop: scaleHeight(40) }}>
                    <Animated.View
                      style={{
                        flexDirection: 'row',
                        width: SCREEN_WIDTH * 2,
                        height: '100%',
                        transform: [{ translateX: contentSlideX.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -SCREEN_WIDTH],
                          extrapolate: 'clamp',
                        }) }],
                      }}
                    >
                      {/* Stake Entry Content */}
                      <View style={{ width: SCREEN_WIDTH, height: '100%' }}>
                        <StakeEntryStep
                          key={selectedStake}
                          targetScore={targetScore as 34 | 37 | 40}
                          walletBalance={walletBalance}
                          selectedStake={selectedStake}
                          setSelectedStake={setSelectedStake}
                          onBack={onClose}
                          onNext={handleNext}
                          game={null}
                          potentialReturn={selectedStake ? selectedStake * (targetScore === 34 ? 2 : targetScore === 37 ? 5 : 7) : 0}
                          isEditMode={!!initialStake}
                        />
                      </View>
                      {/* Comp Date Content */}
                      <View style={{ width: SCREEN_WIDTH, height: '100%' }}>
                        <CompDateEntryStep
                          onBack={handleBack}
                          onNext={(dateStr: string) => handleCompDateNext(dateStr)}
                          initialDate={initialDate}
                        />
                      </View>
                    </Animated.View>
                  </View>
                </View>
              </Animated.View>
            </View>

            {/* Fixed Progress Indicator */}
            <View style={styles.progressContainer}>
              {[...Array(isEditMode ? 2 : 3)].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressIndicator,
                    (isEditMode ? index + 2 === step : index + 1 === step) ? styles.currentStep : styles.otherStep,
                    step === 1 && !isEditMode && { backgroundColor: '#E3E3E3' },
                  ]}
                />
              ))}
            </View>

            {/* Game Entry Confirmation Popup (Normal Flow) */}
            <GameEntryConfirmationPopup
              isVisible={showGameEntryConfirmation}
              clubName={clubDisplayName}
              requiredScore={targetScore as 34 | 37 | 40}
              stake={selectedStake || 0}
              compDate={selectedCompDate}
              potentialReturn={selectedStake ? selectedStake * (targetScore === 34 ? 2 : targetScore === 37 || targetScore === 38 ? 5 : 7) : 0}
              onBack={() => setShowGameEntryConfirmation(false)}
              onConfirm={handleConfirm}
              onClose={() => {
                setShowGameEntryConfirmation(false);
              }}
              isEditMode={isEditMode}
            />
            {/* GAME UPDATE message after successful Firestore writes */}
            <GameEntryConfirmationPopup
              isVisible={complete}
              clubName={clubDisplayName}
              requiredScore={targetScore as 34 | 37 | 40}
              stake={selectedStake || 0}
              compDate={selectedCompDate}
              potentialReturn={selectedStake ? selectedStake * (targetScore === 34 ? 2 : targetScore === 37 || targetScore === 38 ? 5 : 7) : 0}
              onBack={handleCompleteClose}
              onConfirm={handleCompleteClose}
              onClose={handleCompleteClose}
              isEditMode={isEditMode}
              showOnlyGameUpdate={true}
            />
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
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
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