import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { GameEntryCard } from './GameEntryCard';
import { RulesExplainerPanel } from '../panels/RulesExplainerPanel';

interface GameEntrySectionProps {
  onGameCardPress?: (score: 34 | 37 | 40) => void;
}

export const GameEntrySection: React.FC<GameEntrySectionProps> = ({ onGameCardPress }) => {
  const [isRulesPanelVisible, setIsRulesPanelVisible] = useState(false);

  const handleCardPress = (score: 34 | 37 | 40) => {
    if (onGameCardPress) {
      onGameCardPress(score);
    } else {
      // Default behavior (for legacy use):
    console.log(`Selected game: ${score}+`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ENTER A GAME</Text>
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
        score={40}
        label="On Fire"
        subtitle="Throwing Darts"
        winnings="350"
        highlightColor="#93DD4E"
        onPress={() => handleCardPress(40)}
      />

      <GameEntryCard
        score={37}
        label="Sweet Spot"
        subtitle="Flushin' It"
        winnings="250"
        highlightColor="#4EDD69"
        onPress={() => handleCardPress(37)}
        isPopular={true}
      />

      <GameEntryCard
        score={34}
        label="Steady Eddie"
        subtitle="Up & Down"
        winnings="100"
        highlightColor="#4EDDA9"
        onPress={() => handleCardPress(34)}
      />

      <RulesExplainerPanel
        isVisible={isRulesPanelVisible}
        onClose={() => setIsRulesPanelVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(20),
    paddingRight: scaleWidth(4),
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(22),
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  infoButton: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    resizeMode: 'contain',
  },
}); 