import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { ScoreSubmissionPanel } from '../games/scoresubmission';

interface GameEntryCardProps {
  score: number;
  label: string;
  winnings: string;
  subtitle: string;
  highlightColor: string;
  onPress: () => void;
  isPopular?: boolean;
  status: string;
}

export const GameEntryCard: React.FC<GameEntryCardProps> = ({
  score,
  label,
  winnings,
  subtitle,
  highlightColor,
  onPress,
  isPopular,
  status,
}) => {
  const [showScorePanel, setShowScorePanel] = React.useState(false);

  // Calculate potential return based on score
  const calculatePotentialReturn = (score: number) => {
    // Default multipliers based on game type
    const multipliers = {
      upAndDown: 2,    // 34+ score
      flushingIt: 5,   // 37+ score
      throwingDarts: 7 // 40+ score
    };

    // Determine which multiplier to use based on score
    let multiplier = multipliers.upAndDown;
    if (score >= 40) {
      multiplier = multipliers.throwingDarts;
    } else if (score >= 37) {
      multiplier = multipliers.flushingIt;
    }

    return multiplier * 10; // Assuming £10 stake
  };

  return (
    <TouchableOpacity
      style={[styles.outerContainer, { 
        backgroundColor: highlightColor,
        borderColor: highlightColor 
      }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.innerContainer}>
        {isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Most Popular</Text>
          </View>
        )}
        <View style={styles.contentContainer}>
          <View style={styles.leftContent}>
            <View style={styles.scoreContainer}>
              <View style={styles.scoreWrapper}>
                <Text style={styles.scoreNumber}>{score}</Text>
              </View>
              <View style={styles.plusContainer}>
                <Text style={[styles.scorePlus, { color: highlightColor }]}>+</Text>
              </View>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={[styles.winUpTo, { color: highlightColor }]}>WIN UP TO</Text>
            <Text style={styles.winnings}>£{calculatePotentialReturn(score)}</Text>
          </View>
          <Image
            source={require('../../../assets/icons/chevron-right.png')}
            style={styles.arrowIcon}
          />
        </View>
      </View>
      {status === 'Enter Score' ? (
        null
      ) : (
        <View>
          <Text>{status}</Text>
        </View>
      )}
      {showScorePanel && (
        <ScoreSubmissionPanel
          isVisible={showScorePanel}
          compDate={'your date here'}
          onBack={() => setShowScorePanel(false)}
          onSubmit={() => setShowScorePanel(false)}
          onClose={() => setShowScorePanel(false)}
          clubName={"Placeholder Club"}
          requiredScore={score}
          stake={10}
          potentialReturn={calculatePotentialReturn(score)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: scaleWidth(300),
    height: scaleHeight(130),
    borderRadius: scaleWidth(20),
    marginBottom: scaleHeight(22),
    borderWidth: 2,
    alignSelf: 'center',
  },
  innerContainer: {
    width: scaleWidth(264),
    height: scaleHeight(126),
    backgroundColor: '#18302A',
    borderRadius: scaleWidth(20),
    position: 'relative',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: scaleWidth(24),
    paddingRight: scaleWidth(24),
  },
  leftContent: {
    flex: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: scaleWidth(160),
  },
  scoreWrapper: {
    minWidth: scaleWidth(80),
    marginRight: scaleWidth(-2),
  },
  plusContainer: {
    marginLeft: scaleWidth(1),
  },
  subtitleContainer: {
    width: scaleWidth(160),
  },
  scoreNumber: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(67),
    color: '#FFFFFF',
    lineHeight: scaleHeight(86),
    letterSpacing: -2,
    includeFontPadding: false,
    textAlign: 'left',
  },
  scorePlus: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: scaleWidth(67),
    lineHeight: scaleHeight(86),
    letterSpacing: -2,
    includeFontPadding: false,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: scaleWidth(19),
    color: '#FFFFFF',
    marginTop: scaleHeight(-12),
  },
  rightContent: {
    alignItems: 'flex-end',
    minWidth: scaleWidth(100),
  },
  winUpTo: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: scaleWidth(14),
    opacity: 0.8,
    marginBottom: scaleHeight(2),
  },
  winnings: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: scaleWidth(32),
    color: '#FFFFFF',
    lineHeight: scaleHeight(38),
    letterSpacing: -1,
  },
  arrowIcon: {
    position: 'absolute',
    right: scaleWidth(-28),
    alignSelf: 'center',
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
  popularBadge: {
    position: 'absolute',
    top: -scaleHeight(12),
    right: scaleWidth(131),
    backgroundColor: '#FF4D4D',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(12),
  },
  popularText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: scaleWidth(12),
    color: '#FFFFFF',
  },
  card: {
    width: scaleWidth(300),
    height: scaleHeight(225),
    borderRadius: scaleWidth(20),
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(24),
    overflow: 'hidden',
    alignSelf: 'center',
  },
}); 