import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, PanResponder, Dimensions } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { ScoreSubmissionPanel } from '../games/scoresubmission';
import { PrimaryButton } from '../PrimaryButton';

const STATUS_COLORS: Record<string, string> = {
  'Enter Score': 'rgba(54, 141, 241, 0.80)',
  'In Review': 'rgba(252, 146, 24, 0.80)',
  'Complete': 'rgba(52, 165, 71, 0.80)',
  'Rejected': 'rgba(230, 55, 70, 0.80)',
};

interface CompletedGameCardProps {
  targetScore: number;
  plusColor: string;
  status: 'Enter Score' | 'In Review' | 'Complete' | 'Rejected';
  statusText?: string;
  date?: string;
  club?: string;
  stake?: string;
  score?: number;
  return?: string;
  onStatusChange?: (status: string, score: number) => void;
}

export const CompletedGameCard: React.FC<CompletedGameCardProps> = ({
  targetScore,
  plusColor,
  status,
  statusText,
  date = '23 May',
  club = 'Saunton',
  stake = '£20',
  score = 37,
  return: returnAmount = '£0',
  onStatusChange,
}) => {
  const [showScorePanel, setShowScorePanel] = React.useState(false);
  const [showRejectedSheet, setShowRejectedSheet] = React.useState(false);
  
  // Animation values
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;

  // PanResponder for swipe-to-dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0; // Only respond to downward swipes
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) { // Only allow downward movement
          sheetTranslateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > screenHeight * 0.2) { // If dragged down more than 20% of screen height
          closeSheet();
        } else {
          // Reset position
          Animated.spring(sheetTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openSheet = () => {
    setShowRejectedSheet(true);
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(sheetTranslateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: screenHeight,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRejectedSheet(false);
      sheetTranslateY.setValue(0);
    });
  };

  const calculatePotentialReturn = (score: number) => {
    const stakeAmount = parseInt(stake.replace('£', ''));
    let multiplier = 0;

    if (score >= targetScore) {
      switch (targetScore) {
        case 40:
          multiplier = 7;
          break;
        case 37:
          multiplier = 5;
          break;
        case 34:
          multiplier = 2;
          break;
      }
    }

    return stakeAmount * multiplier;
  };

  // Calculate resubmission deadline (7 days after comp date)
  let resubmitDate = '';
  if (date) {
    const [day, monthStr] = date.split(' ');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    let month = months.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());
    if (month > 11) month -= 12; // handle uppercase
    if (month !== -1) {
      const year = new Date().getFullYear();
      const compDate = new Date(year, month, parseInt(day, 10));
      compDate.setDate(compDate.getDate() + 7);
      resubmitDate = compDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }

  return (
    <View style={styles.card}>
      {/* Target Score */}
      <View style={styles.targetScoreContainer}>
        <Text style={styles.targetScore}>{targetScore}</Text>
        <Text style={[styles.plus, { color: plusColor }]}>+</Text>
      </View>
      {/* Status Lozenge */}
      {status === 'Enter Score' ? (
        <TouchableOpacity
          onPress={() => setShowScorePanel(true)}
          style={[styles.statusLozenge, { backgroundColor: STATUS_COLORS[status] }]}
        >
          <Text style={styles.statusText}>{statusText || status}</Text>
        </TouchableOpacity>
      ) : status === 'Rejected' ? (
        <TouchableOpacity
          onPress={openSheet}
          style={[styles.statusLozenge, { backgroundColor: STATUS_COLORS[status] }]}
        >
          <Text style={styles.statusText}>{statusText || status}</Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.statusLozenge, { backgroundColor: STATUS_COLORS[status] }]}>
          <Text style={styles.statusText}>{statusText || status}</Text>
        </View>
      )}
      {showScorePanel && (
        <ScoreSubmissionPanel
          isVisible={showScorePanel}
          compDate={date || ''}
          onBack={() => setShowScorePanel(false)}
          onSubmit={() => {}}
          onClose={() => setShowScorePanel(false)}
          clubName={club}
          requiredScore={targetScore}
          stake={parseInt(stake.replace('£', ''))}
          potentialReturn={score ? calculatePotentialReturn(score) : 0}
          onStatusChange={onStatusChange}
        />
      )}
      {/* Game Details */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailsColumn}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date: </Text>
            <Text style={styles.detailValue}>{date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Club: </Text>
            <Text style={styles.detailValue}>{club}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Stake: </Text>
            <Text style={styles.detailValue}>{stake}</Text>
          </View>
        </View>
        <View style={styles.detailsColumn}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Score: </Text>
            <Text style={styles.detailValue}>{score}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Return: </Text>
            <Text style={styles.detailValue}>{returnAmount}</Text>
          </View>
        </View>
      </View>
      {/* Rejected Score Bottom Sheet */}
      <Modal
        visible={showRejectedSheet}
        transparent
        animationType="none"
        onRequestClose={closeSheet}
      >
        <>
          <Animated.View 
            style={[
              rejectedStyles.overlay,
              { opacity: overlayOpacity }
            ]} 
          />
          <Animated.View 
            style={[
              rejectedStyles.sheet,
              {
                transform: [{ translateY: sheetTranslateY }]
              }
            ]}
            {...panResponder.panHandlers}
          >
            <View style={rejectedStyles.dragIndicator} />
            <Text style={rejectedStyles.title}>SCORE REJECTED</Text>
            <Text style={rejectedStyles.subtitle}>
              Your scorecard was rejected due to the following issue.
            </Text>
            <Text style={rejectedStyles.reason}>
              {/* BACKEND: Insert rejection reason from admin panel here */}
              Lorum ipsum: The uploaded scorecard was not legible.
            </Text>
            <Text style={rejectedStyles.subtitle}>
              Please resubmit your scorecard or contact us via the contact form if you are experiencing any issues.
            </Text>
            <Text style={rejectedStyles.subtitle}>
              You have until <Text style={rejectedStyles.resubmitDate}>{resubmitDate}</Text> to resubmit your scorecard.
            </Text>
            <PrimaryButton
              title="Close"
              onPress={closeSheet}
              isActive={true}
              style={{ width: scaleWidth(260), marginTop: scaleHeight(24) }}
            />
          </Animated.View>
        </>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scaleWidth(300),
    height: scaleHeight(136),
    borderRadius: scaleWidth(20),
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(24),
    position: 'relative',
  },
  targetScoreContainer: {
    position: 'absolute',
    left: scaleWidth(26),
    top: scaleHeight(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetScore: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(35),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: scaleWidth(-0.9),
    textTransform: 'uppercase',
  },
  plus: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: scaleWidth(-2.16),
    marginLeft: scaleWidth(2.5),
    textTransform: 'uppercase',
  },
  statusLozenge: {
    position: 'absolute',
    left: scaleWidth(197),
    top: scaleHeight(23),
    width: scaleWidth(80),
    height: scaleHeight(20),
    borderRadius: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '500',
    letterSpacing: scaleWidth(-0.28),
    textAlign: 'center',
  },
  detailsGrid: {
    position: 'absolute',
    left: scaleWidth(23),
    top: scaleHeight(69),
    flexDirection: 'row',
    width: scaleWidth(254),
    justifyContent: 'space-between',
    paddingRight: scaleWidth(10),
  },
  detailsColumn: {
    flexDirection: 'column',
    gap: scaleHeight(6),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#8CA09A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '400',
    letterSpacing: scaleWidth(-0.24),
  },
  detailValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.28),
  },
});

const rejectedStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: scaleWidth(24),
    alignItems: 'center',
    paddingBottom: scaleHeight(32),
  },
  dragIndicator: {
    width: scaleWidth(40),
    height: scaleHeight(4),
    backgroundColor: '#8CA09A',
    borderRadius: scaleWidth(2),
    marginBottom: scaleHeight(12),
  },
  title: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(25.648),
    marginTop: scaleHeight(12),
    marginBottom: scaleHeight(8),
  },
  subtitle: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(19.2),
    marginBottom: scaleHeight(8),
  },
  reason: {
    color: '#E63746',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(19.2),
    marginBottom: scaleHeight(8),
  },
  resubmitDate: {
    color: '#18302A',
    fontFamily: 'Poppins-SemiBold',
    fontSize: scaleWidth(12),
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: scaleHeight(19.2),
  },
}); 