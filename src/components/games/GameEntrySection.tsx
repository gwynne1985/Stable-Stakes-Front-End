import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { GameEntryCard } from './GameEntryCard';
import { RulesExplainerPanel } from '../panels/RulesExplainerPanel';
import { GameType } from './GameEntryPanel/GameSummaryStep';

interface GameEntrySectionProps {
  onGameCardPress?: (score: number, gameType: GameType) => void;
  targetScores: {
    upAndDown: number;
    flushingIt: number;
    throwingDarts: number;
  };
}

export const GameEntrySection: React.FC<GameEntrySectionProps> = ({ onGameCardPress, targetScores }) => {
  const [isRulesPanelVisible, setIsRulesPanelVisible] = useState(false);

  const handleCardPress = (score: number, gameType: GameType) => {
    if (onGameCardPress) {
      onGameCardPress(score, gameType);
    } else {
      console.log(`Selected game: ${gameType} with score: ${score}+`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          ENTER A GAME
        </Text>
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => setIsRulesPanelVisible(true)}
        >
          <Image
            source={require('../../../assets/icons/info.png')}
            style={styles.infoIcon}
          />
        </TouchableOpacity>
      </View>

      <GameEntryCard
        score={targetScores.throwingDarts}
        label="On Fire"
        subtitle="Throwing Darts"
        winnings="350"
        highlightColor="#93DD4E"
        onPress={() => handleCardPress(targetScores.throwingDarts, "throwingDarts")}
        status="Enter Score"
      />

      <GameEntryCard
        score={targetScores.flushingIt}
        label="Sweet Spot"
        subtitle="Flushin' It"
        winnings="250"
        highlightColor="#4EDD69"
        onPress={() => handleCardPress(targetScores.flushingIt, "flushingIt")}
        isPopular={true}
        status="Enter Score"
      />

      <GameEntryCard
        score={targetScores.upAndDown}
        label="Steady Eddie"
        subtitle="Up & Down"
        winnings="100"
        highlightColor="#4EDDA9"
        onPress={() => handleCardPress(targetScores.upAndDown, "upAndDown")}
        status="Enter Score"
      />

      <View style={{ marginBottom: -scaleHeight(20) }} />

      <RulesExplainerPanel
        isVisible={isRulesPanelVisible}
        onClose={() => setIsRulesPanelVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scaleWidth(300),
    marginBottom: scaleHeight(20),
  },
  title: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(22),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(28),
    letterSpacing: scaleWidth(-0.22),
    textTransform: 'uppercase',
  },
  infoButton: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
}); 