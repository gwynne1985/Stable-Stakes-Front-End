import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';
import { GameInfoPanel } from '../../games/GameInfoPanel';

export type GameType = "upAndDown" | "flushingIt" | "throwingDarts";

interface GameSummaryStepProps {
  targetScore: number; // This will be the dynamic score, e.g., 38
  gameType: GameType; // e.g., "flushingIt"
  onNext: () => void;
  onClose?: () => void;
  handlePanelClose?: () => void;
}

const GAME_INFO = {
  upAndDown: {
    label: 'Steady Eddie',
    winnings: '100',
    subtitle: 'Up & Down',
    highlightColor: '#4EDDA9',
    backgroundImage: require('../../../../assets/images/games/34-big.png'),
  },
  flushingIt: {
    label: 'Sweet Spot',
    winnings: '250',
    subtitle: "Flushin' It",
    highlightColor: '#4EDD69',
    backgroundImage: require('../../../../assets/images/games/37-big.png'),
  },
  throwingDarts: {
    label: 'On Fire',
    winnings: '350',
    subtitle: 'Throwing Darts',
    highlightColor: '#93DD4E',
    backgroundImage: require('../../../../assets/images/games/40-big.png'),
  },
  default: { // Fallback for unknown game types
    label: 'Selected Game',
    winnings: 'N/A',
    subtitle: 'Review Details',
    highlightColor: '#CCC',
    backgroundImage: require('../../../../assets/images/games/37-big.png'),
  },
};

export const GameSummaryStep: React.FC<GameSummaryStepProps> = ({ targetScore, gameType, onNext, onClose, handlePanelClose }) => {
  console.log('[GameSummaryStep] Rendering with gameType:', gameType, 'targetScore:', targetScore);
  const info = GAME_INFO[gameType] || GAME_INFO.default;

  // Example values for avg and previous score
  const avgScore = 34; // These could also be dynamic if needed
  const previousScore = 28;
  return (
    <ImageBackground
      source={info.backgroundImage}
      style={styles.background}
      imageStyle={styles.imageBg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.dragIndicator} />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handlePanelClose || onClose}
        hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
      >
        <Image
          source={require('../../../../assets/icons/navigation/close-white.png')}
          style={styles.closeIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.centeredPanel}>
          <GameInfoPanel
            score={targetScore} // Display the dynamic target score
            label={info.label}
            winnings={info.winnings}
            subtitle={info.subtitle}
            highlightColor={info.highlightColor}
            variant="bordered"
          />
        </View>
        {/* Stats Row Panel */}
        <View style={styles.statsRow}>
          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>Required Score</Text>
            <Text style={styles.statsValue}>{targetScore}+</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>Your Avg Score</Text>
            <Text style={styles.statsValue}>{avgScore}</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>Previous Score</Text>
            <Text style={styles.statsValue}>{previousScore}</Text>
          </View>
        </View>
        <PrimaryButton
          title="Enter Game"
          onPress={onNext}
          isActive={true}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    overflow: 'hidden',
  },
  imageBg: {
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(24, 48, 42, 0.45)', // Optional: darken for contrast
    zIndex: 1,
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  closeButton: {
    position: 'absolute',
    top: scaleHeight(24),
    right: scaleWidth(20),
    zIndex: 10,
    width: scaleWidth(29),
    height: scaleWidth(29),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  centeredPanel: {
    marginTop: scaleHeight(320),
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: scaleWidth(300),
    marginTop: scaleHeight(10),
  },
  dragIndicator: {
    position: 'absolute',
    top: scaleHeight(8),
    alignSelf: 'center',
    width: scaleWidth(36),
    height: scaleHeight(4),
    backgroundColor: '#E3E3E3',
    borderRadius: scaleWidth(2),
    opacity: 0.3,
    zIndex: 20,
  },
  statsRow: {
    flexDirection: 'row',
    width: scaleWidth(300),
    paddingVertical: scaleHeight(11),
    paddingHorizontal: scaleWidth(3),
    alignItems: 'center',
    gap: scaleWidth(5),
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(20),
    marginTop: scaleHeight(24),
    marginBottom: scaleHeight(24),
    alignSelf: 'center',
  },
  statsSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsLabel: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: -0.3,
    marginBottom: scaleHeight(2),
  },
  statsValue: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(18),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: undefined,
    letterSpacing: -1.08,
    textTransform: 'uppercase',
  },
  statsDivider: {
    width: scaleWidth(2.5),
    height: scaleHeight(36),
    backgroundColor: '#081512',
    marginHorizontal: scaleWidth(5),
    borderRadius: scaleWidth(2),
    transform: [{ rotate: '-7deg' }],
    flexShrink: 0,
  },
}); 