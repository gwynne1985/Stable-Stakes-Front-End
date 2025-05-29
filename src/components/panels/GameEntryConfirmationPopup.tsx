import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, Platform } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import * as Haptics from 'expo-haptics';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { USERS, CLUBS } from '../../constants/firestore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GameEntryConfirmationPopupProps {
  isVisible: boolean;
  clubName: string;
  requiredScore: number;
  stake: number;
  compDate: string;
  potentialReturn: number;
  onBack: () => void;
  onConfirm: () => void;
  onClose: () => void;
  isEditMode?: boolean;
  onCancel?: () => void;
  showOnlyGameUpdate?: boolean;
  disableInternalAnimation?: boolean;
}

export const GameEntryConfirmationPopup: React.FC<GameEntryConfirmationPopupProps> = ({
  isVisible,
  clubName,
  requiredScore,
  stake,
  compDate,
  potentialReturn,
  onBack,
  onConfirm,
  onClose,
  isEditMode = false,
  onCancel,
  showOnlyGameUpdate = false,
  disableInternalAnimation = false,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const bottomSheetAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [gameCancelled, setGameCancelled] = useState(false);
  const [internalVisible, setInternalVisible] = useState(isVisible);
  const bigCircleScale = useRef(new Animated.Value(0)).current;
  const smallCircles = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    if (disableInternalAnimation) return;
    if (isVisible) {
      setInternalVisible(true);
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setInternalVisible(false);
      });
    }
  }, [isVisible, disableInternalAnimation]);

  useEffect(() => {
    if (disableInternalAnimation) return;
    if (internalVisible && isVisible) {
      setComplete(false);
      setGameCancelled(false);
      setShowCancelConfirm(false);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    }
  }, [internalVisible, isVisible, disableInternalAnimation]);

  useEffect(() => {
    if (showCancelConfirm) {
      Animated.spring(bottomSheetAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    } else {
      Animated.timing(bottomSheetAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showCancelConfirm]);

  useEffect(() => {
    if (complete) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
  }, [complete]);

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setGameCancelled(true);
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCancelReject = () => {
    setShowCancelConfirm(false);
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setInternalVisible(false);
      onClose();
    });
  };

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 1200);
  };

  const smallCircleStyles = [
    { width: scaleWidth(18), height: scaleWidth(18), borderRadius: scaleWidth(9), top: -scaleWidth(28), left: scaleWidth(22) },
    { width: scaleWidth(10), height: scaleWidth(10), borderRadius: scaleWidth(5), top: scaleWidth(8), left: -scaleWidth(8) },
    { width: scaleWidth(14), height: scaleWidth(14), borderRadius: scaleWidth(7), top: scaleWidth(30), right: -scaleWidth(24) },
    { width: scaleWidth(7), height: scaleWidth(7), borderRadius: scaleWidth(3.5), bottom: -scaleWidth(8), left: scaleWidth(8) },
    { width: scaleWidth(13), height: scaleWidth(13), borderRadius: scaleWidth(6.5), bottom: -scaleWidth(18), right: scaleWidth(20) },
  ];

  // Determine which button row to show
  const showEditButtons = isEditMode && !complete && !!onCancel;

  // If showOnlyGameUpdate, only show the GAME UPDATE message
  if (showOnlyGameUpdate) {
    return (
      <Modal
        visible={disableInternalAnimation ? isVisible : internalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
      >
        <View style={styles.overlay}>
          {disableInternalAnimation ? (
            <View style={styles.popup}>
              <Text style={styles.title}>GAME UPDATE</Text>
              <View style={styles.completeContainer}>
                <Animated.View style={[styles.bigCircle, { transform: [{ scale: bigCircleScale }] }]}> 
                  <Image source={require('../../../assets/icons/deposit-tick.png')} style={styles.tickIcon} />
                  {smallCircles.map((circle, i) => (
                    <Animated.View
                      key={i}
                      style={[
                        styles.smallCircle,
                        smallCircleStyles[i],
                        { transform: [{ scale: circle }] }
                      ]}
                    />
                  ))}
                </Animated.View>
              </View>
              <Text style={styles.completeText}>
                Your game has been updated. Play your stableford competition on the date you selected and enter your score in the Stable Stakes app when prompted.
              </Text>
              <PrimaryButton
                title="Close"
                onPress={handleClose}
                isActive={true}
                style={styles.primaryButton}
              />
            </View>
          ) : (
            <Animated.View style={[styles.popup, { transform: [{ translateY: slideAnim }] }] }>
              <Text style={styles.title}>GAME UPDATE</Text>
              <View style={styles.completeContainer}>
                <Animated.View style={[styles.bigCircle, { transform: [{ scale: bigCircleScale }] }]}> 
                  <Image source={require('../../../assets/icons/deposit-tick.png')} style={styles.tickIcon} />
                  {smallCircles.map((circle, i) => (
                    <Animated.View
                      key={i}
                      style={[
                        styles.smallCircle,
                        smallCircleStyles[i],
                        { transform: [{ scale: circle }] }
                      ]}
                    />
                  ))}
                </Animated.View>
              </View>
              <Text style={styles.completeText}>
                Your game has been updated. Play your stableford competition on the date you selected and enter your score in the Stable Stakes app when prompted.
              </Text>
              <PrimaryButton
                title="Close"
                onPress={handleClose}
                isActive={true}
                style={styles.primaryButton}
              />
            </Animated.View>
          )}
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={disableInternalAnimation ? isVisible : internalVisible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        {disableInternalAnimation ? (
          <View style={styles.popup}>
            {/* Close button for edit mode */}
            {isEditMode && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              >
                <Image
                  source={require('../../../assets/icons/navigation/close.png')}
                  style={styles.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {!complete ? (
              <>
                <Text style={styles.title}>GAME SUMMARY</Text>
                <View style={[styles.infoBoxesContainer, { marginTop: isEditMode ? scaleHeight(25) : scaleHeight(5) }]}> 
                  <View style={styles.infoBoxRow}>
                    <Text style={styles.infoLabel}>Club</Text>
                    <Text style={styles.infoValue}>{clubName}</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                    <Text style={styles.infoLabel}>Required Score</Text>
                    <Text style={styles.infoValue}>{requiredScore}+</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                    <Text style={styles.infoLabel}>Stake</Text>
                    <Text style={styles.infoValue}>£{stake}</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                    <Text style={styles.infoLabel}>Comp Date</Text>
                    <Text style={styles.infoValue}>{compDate}</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder, { borderBottomWidth: 1, borderColor: '#18302A' }]}> 
                    <Text style={styles.infoLabel}>Potential Return</Text>
                    <Text style={styles.infoValue}>£{potentialReturn}</Text>
                  </View>
                </View>
                {!isEditMode && (
                  <Text style={styles.termsText}>
                    By confirming you agree to abide by the rules and regulations set out in our Terms of Use.
                  </Text>
                )}
                <View style={styles.buttonContainer}>
                  {showEditButtons ? (
                    <>
                      <TouchableOpacity 
                        style={[styles.button, styles.cancelButton]} 
                        onPress={handleCancel}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.button, styles.editButton]} 
                        onPress={onConfirm}
                      >
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity 
                        style={[styles.button, styles.backButton]} 
                        onPress={onBack}
                        disabled={processing}
                      >
                        <Text style={styles.buttonText}>Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.button, styles.confirmButton, processing && { opacity: 0.7 }]} 
                        onPress={handleConfirm}
                        disabled={processing}
                      >
                        <Text style={styles.buttonText}>{processing ? 'Processing...' : 'Confirm'}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </>
            ) : complete ? (
              <>
                <Text style={styles.title}>{isEditMode ? 'GAME UPDATE' : 'YOU ARE IN'}</Text>
                <View style={styles.completeContainer}>
                  <Animated.View style={[styles.bigCircle, { transform: [{ scale: bigCircleScale }] }]}> 
                    <Image source={require('../../../assets/icons/deposit-tick.png')} style={styles.tickIcon} />
                    {smallCircles.map((circle, i) => (
                      <Animated.View
                        key={i}
                        style={[
                          styles.smallCircle,
                          smallCircleStyles[i],
                          { transform: [{ scale: circle }] }
                        ]}
                      />
                    ))}
                  </Animated.View>
                </View>
                <Text style={styles.completeText}>
                  Play your stableford competition on the date you selected and enter your score in the Stable Stakes app when prompted.
                </Text>
                <PrimaryButton
                  title="Close"
                  onPress={handleClose}
                  isActive={true}
                  style={styles.primaryButton}
                />
              </>
            ) : null}
          </View>
        ) : (
        <Animated.View 
          style={[
            styles.popup,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
            {/* Close button for edit mode */}
            {isEditMode && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              >
                <Image
                  source={require('../../../assets/icons/navigation/close.png')}
                  style={styles.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          {!complete ? (
            <>
              <Text style={styles.title}>GAME SUMMARY</Text>
                <View style={[styles.infoBoxesContainer, { marginTop: isEditMode ? scaleHeight(25) : scaleHeight(5) }]}> 
                <View style={styles.infoBoxRow}>
                  <Text style={styles.infoLabel}>Club</Text>
                  <Text style={styles.infoValue}>{clubName}</Text>
                </View>
                <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                  <Text style={styles.infoLabel}>Required Score</Text>
                  <Text style={styles.infoValue}>{requiredScore}+</Text>
                </View>
                <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                  <Text style={styles.infoLabel}>Stake</Text>
                  <Text style={styles.infoValue}>£{stake}</Text>
                </View>
                <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                  <Text style={styles.infoLabel}>Comp Date</Text>
                  <Text style={styles.infoValue}>{compDate}</Text>
                </View>
                <View style={[styles.infoBoxRow, styles.infoBoxBorder, { borderBottomWidth: 1, borderColor: '#18302A' }]}> 
                  <Text style={styles.infoLabel}>Potential Return</Text>
                  <Text style={styles.infoValue}>£{potentialReturn}</Text>
                </View>
              </View>
                {!isEditMode && (
              <Text style={styles.termsText}>
                By confirming you agree to abide by the rules and regulations set out in our Terms of Use.
              </Text>
                )}
              <View style={styles.buttonContainer}>
                  {showEditButtons ? (
                    <>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                        onPress={handleCancel}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.button, styles.editButton]} 
                        onPress={onConfirm}
                      >
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity 
                        style={[styles.button, styles.backButton]} 
                  onPress={onBack}
                  disabled={processing}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton, processing && { opacity: 0.7 }]} 
                  onPress={handleConfirm}
                  disabled={processing}
                >
                  <Text style={styles.buttonText}>{processing ? 'Processing...' : 'Confirm'}</Text>
                </TouchableOpacity>
                    </>
                  )}
              </View>
            </>
            ) : complete ? (
            <>
                <Text style={styles.title}>{isEditMode ? 'GAME UPDATE' : 'YOU ARE IN'}</Text>
              <View style={styles.completeContainer}>
                <Animated.View style={[styles.bigCircle, { transform: [{ scale: bigCircleScale }] }]}> 
                  <Image source={require('../../../assets/icons/deposit-tick.png')} style={styles.tickIcon} />
                  {smallCircles.map((circle, i) => (
                    <Animated.View
                      key={i}
                      style={[
                        styles.smallCircle,
                        smallCircleStyles[i],
                        { transform: [{ scale: circle }] }
                      ]}
                    />
                  ))}
                </Animated.View>
              </View>
              <Text style={styles.completeText}>
                Play your stableford competition on the date you selected and enter your score in the Stable Stakes app when prompted.
              </Text>
              <PrimaryButton
                title="Close"
                  onPress={handleClose}
                isActive={true}
                style={styles.primaryButton}
              />
            </>
            ) : null}
          </Animated.View>
        )}

        {showCancelConfirm && (
          <Animated.View 
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: bottomSheetAnim }]
              }
            ]}
          >
            <View style={styles.bottomSheetContent}>
              <Text style={styles.bottomSheetHeader}>
                {gameCancelled ? 'GAME CANCELLED' : 'CANCEL GAME?'}
              </Text>
              <Text style={styles.bottomSheetBody}>
                {gameCancelled ? 'Your game has been cancelled.' : 'Are you sure you want to cancel this game?'}
              </Text>
              {!gameCancelled && (
                <View style={styles.bottomSheetButtons}>
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton, { marginRight: scaleWidth(10) }]} 
                    onPress={handleCancelConfirm}
                  >
                    <Text style={styles.buttonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, styles.confirmButton]} 
                    onPress={handleCancelReject}
                  >
                    <Text style={styles.buttonText}>No</Text>
                  </TouchableOpacity>
                </View>
              )}
              {gameCancelled && (
                <PrimaryButton
                  title="Close"
                  onPress={handleClose}
                  isActive={true}
                  style={styles.primaryButton}
                />
              )}
            </View>
        </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: scaleWidth(330),
    height: scaleHeight(460),
    backgroundColor: '#E3E3E3',
    borderRadius: 20,
    padding: scaleWidth(20),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: scaleWidth(20),
    minHeight: scaleHeight(200),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  bottomSheetContent: {
    alignItems: 'center',
    paddingBottom: scaleHeight(20),
  },
  bottomSheetHeader: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(25.648),
    marginBottom: scaleHeight(8),
  },
  bottomSheetBody: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(19.2),
    marginBottom: scaleHeight(20),
  },
  bottomSheetButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: scaleWidth(22),
    fontWeight: '900',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: -0.22,
    textTransform: 'uppercase',
    marginTop: scaleHeight(43),
    marginBottom: scaleHeight(5),
    lineHeight: undefined,
  },
  infoBoxesContainer: {
    marginTop: scaleHeight(25),
    marginBottom: scaleHeight(20),
  },
  infoBoxRow: {
    width: scaleWidth(290),
    height: scaleHeight(44),
    backgroundColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
  },
  infoBoxBorder: {
    borderTopWidth: 1,
    borderColor: '#18302A',
  },
  infoLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scaleHeight(19.236),
    textAlign: 'center',
  },
  infoValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(22.442),
    textAlign: 'center',
  },
  termsText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(8),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(12.8),
    textAlign: 'center',
    marginTop: scaleHeight(0),
    marginBottom: scaleHeight(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scaleHeight(5),
    gap: scaleWidth(10),
  },
  button: {
    display: 'flex',
    width: scaleWidth(140),
    height: scaleHeight(40),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(15),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(10),
    flexShrink: 0,
    borderRadius: scaleWidth(100),
  },
  backButton: {
    backgroundColor: '#E3E3E3',
    borderWidth: 1,
    borderColor: '#4EDD69',
    borderRadius: scaleWidth(100),
  },
  confirmButton: {
    backgroundColor: '#4EDD69',
  },
  cancelButton: {
    backgroundColor: '#E3E3E3',
    borderWidth: 1,
    borderColor: '#4EDD69',
  },
  editButton: {
    backgroundColor: '#4EDD69',
  },
  buttonText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scaleHeight(20),
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  completeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaleHeight(20),
    marginTop: scaleHeight(80),
  },
  bigCircle: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(35),
    backgroundColor: '#4EDD69',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tickIcon: {
    width: scaleWidth(32),
    height: scaleWidth(32),
    resizeMode: 'contain',
    position: 'absolute',
    top: scaleWidth(19),
    left: scaleWidth(19),
  },
  smallCircle: {
    position: 'absolute',
    width: scaleWidth(12),
    height: scaleWidth(12),
    borderRadius: scaleWidth(6),
    backgroundColor: '#4EDD69',
  },
  completeText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(19.2),
    textAlign: 'center',
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(40),
    paddingHorizontal: scaleWidth(10),
  },
  primaryButton: {
    width: scaleWidth(300),
    height: scaleHeight(40),
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: scaleHeight(16),
    right: scaleWidth(16),
    zIndex: 10,
    width: scaleWidth(32),
    height: scaleWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
  },
}); 