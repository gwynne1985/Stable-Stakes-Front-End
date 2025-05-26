import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform, TextInput, Image, ImageBackground, Alert } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation';
import * as ImagePicker from 'expo-image-picker';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ScoreSubmissionPanelProps {
  isVisible: boolean;
  compDate: string;
  onBack: () => void;
  onSubmit: (score: number) => void;
  onClose: () => void;
  clubName: string;
  requiredScore: number;
  stake: number;
  potentialReturn: number;
  onStatusChange?: (status: string, score: number) => void;
}

const ScoreSubmissionPanel: React.FC<ScoreSubmissionPanelProps> = ({
  isVisible,
  compDate,
  onBack,
  onSubmit,
  onClose,
  clubName,
  requiredScore,
  stake,
  potentialReturn,
  onStatusChange,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const contentSlideAnim = useRef(new Animated.Value(0)).current;
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [score, setScore] = useState<string>('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [showResult, setShowResult] = useState(false);
  const [showScorecardUpload, setShowScorecardUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setComplete(false);
      fadeAnim.setValue(1);
      Animated.spring(slideAnim, {
        toValue: 0,
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
      setProcessing(false);
      setComplete(false);
      setScore('');
    }
  }, [isVisible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (showThankYou && onStatusChange && score) {
        onStatusChange('In Review', parseInt(score));
      } else if (showResult && !hasWon && onStatusChange && score) {
        onStatusChange('Complete', parseInt(score));
      }
      onClose();
    });
  };

  const handleSubmit = () => {
    if (!score) return;
    
    setProcessing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setProcessing(false);
      setComplete(true);
      
      // Call onSubmit but prevent panel from closing
      if (onSubmit) {
        onSubmit(parseInt(score));
      }
      
      // Fade in new content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleScoreChange = (text: string) => {
    // Only allow 2 digits
    if (text.length <= 2 && /^\d*$/.test(text)) {
      setScore(text);
    }
  };

  // Parse the compDate string into a Date object
  const parseDate = (dateStr: string) => {
    const months: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const [day, month] = dateStr.split(' ');
    const currentYear = new Date().getFullYear();
    const monthIndex = months[month];
    
    if (monthIndex === undefined) {
      console.error('Invalid month:', month);
      return new Date();
    }

    return new Date(currentYear, monthIndex, parseInt(day));
  };

  const deadlineDate = parseDate(compDate);
  // Add 7 days to the deadline
  deadlineDate.setDate(deadlineDate.getDate() + 7);

  console.log('Score state:', score);
  console.log('Complete state:', complete);
  console.log('Processing state:', processing);

  // Add effect to monitor state changes
  useEffect(() => {
    console.log('State changed - processing:', processing, 'complete:', complete);
  }, [processing, complete]);

  // Add effect to monitor animation value
  useEffect(() => {
    const listener = slideAnim.addListener(({ value }) => {
      console.log('Animation value:', value);
    });
    return () => slideAnim.removeListener(listener);
  }, [slideAnim]);

  const handleConfirmScore = () => {
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(true);
      // Fade in new content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleUploadScorecard = () => {
    console.log('Upload scorecard clicked');
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(false);
      setShowScorecardUpload(true);
      // Fade in new content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSubmitScorecard = () => {
    // TODO: Implement scorecard submission
    console.log('Submit scorecard');
    // Show thank you stage
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowScorecardUpload(false);
      setShowThankYou(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleEnterGame = () => {
    onClose();
    navigation.navigate('MainApp', { screen: 'GamesScreen' });
  };

  const hasWon = parseInt(score) >= requiredScore;

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [16, 9],
        quality: 1,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
        allowsMultipleSelection: false,
        exif: false,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={showResult || showScorecardUpload ? onBack : undefined}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.popup,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('../../../../assets/icons/navigation/close.png')}
              style={styles.closeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Animated.View
            style={[
              showThankYou ? styles.thankYouContentContainer : styles.contentContainer,
              {
                opacity: fadeAnim
              }
            ]}
          >
            {!complete ? (
              <>
                <Text style={styles.title}>SUBMIT YOUR SCORE</Text>
                <Text style={styles.subtitle}>
                  Enter your final stableford score for your competition on:
                </Text>
                <Text style={styles.dateText}>{compDate}</Text>
                
                <View style={styles.scoreInputContainer}>
                  <TextInput
                    style={[
                      styles.scoreInput,
                      !score && styles.scoreInputEmpty
                    ]}
                    value={score}
                    onChangeText={handleScoreChange}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="Enter Score"
                    placeholderTextColor="#60857B"
                  />
                </View>

                <Text style={styles.deadlineText}>
                  You have until{' '}
                  <Text style={styles.deadlineDate}>
                    {deadlineDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Text>
                  {' '}to provide your score.
                </Text>

                <Text style={styles.termsText}>
                  By entering your score, you confirm it is accurate and in line with our Terms of Use; any detected dishonesty may result in non-payment or account suspension.
                </Text>

                <PrimaryButton
                  title={processing ? "Processing..." : "Submit Score"}
                  onPress={handleSubmit}
                  isActive={!!score && !processing}
                  isLoading={processing}
                  style={styles.submitButton}
                />
              </>
            ) : showScorecardUpload ? (
              <>
                <Text style={styles.title}>YOUR SCORECARD</Text>
                <View style={styles.scorecardUploadContainer}>
                  <TouchableOpacity 
                    style={styles.uploadBox} 
                    onPress={handleImagePick}
                    activeOpacity={0.7}
                  >
                    {selectedImage ? (
                      <>
                        <Image
                          source={{ uri: selectedImage }}
                          style={styles.selectedImage}
                          resizeMode="cover"
                        />
                        <TouchableOpacity 
                          style={styles.removeImageButton}
                          onPress={handleRemoveImage}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <Image
                            source={require('../../../../assets/icons/navigation/close-green.png')}
                            style={styles.removeImageIcon}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <Image
                          source={require('../../../../assets/icons/upload.png')}
                          style={styles.uploadIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.uploadText}>
                          Upload New{'\n'}Scorecard Screenshot
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                  <View style={styles.requirementsContainer}>
                    <Text style={styles.requirementsText}>
                      Please ensure your screenshot meets the following requirements:
                    </Text>
                    <View style={styles.bulletRowFirst}>
                      <Text style={styles.bullet}>{'\u2022'}</Text>
                      <Text style={styles.requirementsText}>
                        Obtained from the IG or HowDidiDo app.
                      </Text>
                    </View>
                    <View style={styles.bulletRow}>
                      <Text style={styles.bullet}>{'\u2022'}</Text>
                      <Text style={styles.requirementsText}>
                        Includes the full scorecard within the screenshot.
                      </Text>
                    </View>
                    <View style={styles.bulletRow}>
                      <Text style={styles.bullet}>{'\u2022'}</Text>
                      <Text style={styles.requirementsText}>
                        Has not been edited or adjusted in any way from the original.
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.verificationText}>
                  Please note that all scorecard screenshots are reviewed using advanced image analysis technology to verify that the image hasn't been altered from the original.
                </Text>
                <PrimaryButton
                  title="Submit Scorecard"
                  onPress={handleSubmitScorecard}
                  isActive={!!selectedImage}
                  style={styles.primaryButton}
                />
              </>
            ) : showThankYou ? (
              <>
                <View style={{ marginTop: scaleHeight(60) }} />
                <View style={styles.thankYouImageContainer}>
                  <ImageBackground
                    source={require('../../../../assets/images/golf-course.jpg')}
                    style={styles.resultImage}
                    resizeMode="cover"
                  >
                    <Text style={styles.resultText}>THANK YOU</Text>
                  </ImageBackground>
                </View>
                <Text style={styles.resultMessage}>
                  Thanks for submitting your scorecard!{"\n"}Our team will review it and get it approved within 48 hours.
                </Text>
                <Text style={styles.resultSubMessage}>
                  Be sure to enable notifications so we can keep you posted!
                </Text>
                <Text style={styles.enableNotifications}>
                  Enable Notifications
                </Text>
                <PrimaryButton
                  title="Close"
                  onPress={handleClose}
                  isActive={true}
                  style={styles.primaryButton}
                />
              </>
            ) : !showResult ? (
              <>
                <Text style={styles.title}>SCORE SUBMITTED</Text>
                <View style={styles.infoBoxesContainer}>
                  <View style={styles.infoBoxRow}>
                    <Text style={styles.infoLabel}>Club</Text>
                    <Text style={styles.infoValue}>{clubName}</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                    <Text style={styles.infoLabel}>Required Score</Text>
                    <Text style={styles.infoValue}>{requiredScore}+</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                    <Text style={styles.infoLabel}>Your Score</Text>
                    <Text style={styles.infoValue}>{score}</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder]}>
                    <Text style={styles.infoLabel}>Stake</Text>
                    <Text style={styles.infoValue}>£{stake}</Text>
                  </View>
                  <View style={[styles.infoBoxRow, styles.infoBoxBorder, { borderBottomWidth: 1, borderColor: '#18302A' }]}>
                    <Text style={styles.infoLabel}>Potential Return</Text>
                    <Text style={styles.infoValue}>£{potentialReturn}</Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={() => {
                      setComplete(false);
                      setScore('');
                    }}
                  >
                    <Text style={styles.buttonText}>Amend Score</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, styles.confirmButton]} 
                    onPress={handleConfirmScore}
                  >
                    <Text style={styles.buttonText}>Confirm Score</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>GAME RESULT</Text>
                <View style={styles.resultImageContainer}>
                  <ImageBackground
                    source={require('../../../../assets/images/golf-course.jpg')}
                    style={styles.resultImage}
                    resizeMode="cover"
                  >
                    <Text style={styles.resultText}>{hasWon ? 'WIN' : 'LOSS'}</Text>
                  </ImageBackground>
                </View>
                {hasWon ? (
                  <>
                    <Text style={styles.resultMessage}>
                      Congratulations on hitting a winning score!
                    </Text>
                    <Text style={styles.resultSubMessage}>
                      Now, simply upload a screenshot of your scorecard from either IG or HowDidiDo to claim your rewards.
                    </Text>
                    <TouchableOpacity onPress={() => console.log('Show me how')}>
                      <Text style={styles.showMeHow}>Show me how:</Text>
                    </TouchableOpacity>
                    <PrimaryButton
                      title="Upload Scorecard"
                      onPress={handleUploadScorecard}
                      isActive={true}
                      style={styles.primaryButton}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.resultMessage}>
                      You didn't hit your target score this time, but every round is a chance to improve. Keep playing, and we're sure you'll be on target in no time!
                    </Text>
                    <Text style={styles.resultSubMessage}>
                      Ready for another shot at winning. Your next game could be the one!
                    </Text>
                    <PrimaryButton
                      title="Enter a Game"
                      onPress={handleEnterGame}
                      isActive={true}
                      style={styles.primaryButton}
                    />
                  </>
                )}
              </>
            )}
          </Animated.View>
        </Animated.View>
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
  closeButton: {
    position: 'absolute',
    top: scaleHeight(16),
    right: scaleWidth(16),
    zIndex: 10,
  },
  closeIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
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
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(5),
  },
  subtitle: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    lineHeight: scaleHeight(20.8),
    marginTop: scaleHeight(5),
  },
  dateText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '700',
    lineHeight: scaleHeight(20.8),
    marginTop: scaleHeight(8),
    marginBottom: scaleHeight(20),
    textAlign: 'center',
  },
  scoreInputContainer: {
    width: scaleWidth(141),
    height: scaleHeight(79),
    padding: scaleWidth(19),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: scaleHeight(20),
    alignSelf: 'center',
  },
  scoreInput: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(64),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: -0.64,
    textAlign: 'center',
    width: '100%',
    height: scaleHeight(64),
  },
  scoreInputEmpty: {
    fontSize: scaleWidth(13),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.13,
  },
  deadlineText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    lineHeight: scaleHeight(16),
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(20),
  },
  deadlineDate: {
    fontWeight: '700',
  },
  termsText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(8),
    fontWeight: '500',
    lineHeight: scaleHeight(12.8),
    marginBottom: scaleHeight(20),
  },
  submitButton: {
    marginTop: 'auto',
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontWeight: '500',
    lineHeight: scaleHeight(24),
  },
  primaryButton: {
    marginTop: 'auto',
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
    fontSize: scaleWidth(13),
    fontWeight: '500',
  },
  infoValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: scaleHeight(22.442),
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scaleHeight(30),
    gap: scaleWidth(10),
  },
  button: {
    width: scaleWidth(140),
    height: scaleHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  cancelButton: {
    backgroundColor: '#E3E3E3',
    borderWidth: 1,
    borderColor: '#4EDD69',
  },
  confirmButton: {
    backgroundColor: '#4EDD69',
  },
  buttonText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.14),
    textAlign: 'center',
  },
  resultImageContainer: {
    width: scaleWidth(287),
    height: scaleHeight(93),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(20),
  },
  resultText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: scaleWidth(-0.32),
    textTransform: 'uppercase',
  },
  resultMessage: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.8),
    marginBottom: scaleHeight(10),
  },
  resultSubMessage: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.8),
    marginBottom: scaleHeight(20),
  },
  showMeHow: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.8),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    marginBottom: scaleHeight(20),
  },
  scorecardUploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(20),
    paddingHorizontal: scaleWidth(20),
  },
  uploadBox: {
    width: scaleWidth(100),
    height: scaleHeight(216.667),
    borderWidth: 1,
    borderColor: '#4EDD69',
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  removeImageButton: {
    position: 'absolute',
    bottom: scaleHeight(-10),
    right: scaleWidth(-10),
    width: scaleWidth(24),
    height: scaleWidth(24),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeImageIcon: {
    width: scaleWidth(16),
    height: scaleWidth(16),
  },
  uploadIcon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    marginBottom: scaleHeight(10),
  },
  uploadText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: undefined,
  },
  requirementsContainer: {
    flex: 1,
    marginLeft: scaleWidth(20),
  },
  requirementsText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(16),
  },
  verificationText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(16),
    marginBottom: scaleHeight(20),
    paddingHorizontal: 0,
  },
  bulletRowFirst: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scaleHeight(15),
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scaleHeight(2),
  },
  bullet: {
    width: scaleWidth(16),
    fontSize: scaleWidth(10),
    color: '#18302A',
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: scaleHeight(1),
  },
  enableNotifications: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(16),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  thankYouImageContainer: {
    width: scaleWidth(287),
    height: scaleHeight(93),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  thankYouContentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
});

export default ScoreSubmissionPanel; 