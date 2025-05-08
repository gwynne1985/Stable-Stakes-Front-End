import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PageContainer } from '../../components/PageContainer';
import { GameEntrySection } from '../../components/games/GameEntrySection';
// import { GameEntryPanel } from '../../components/panels/GameEntryPanel/GameEntryPanel';
import { GameEntrySlidingPanel } from '../../components/panels/GameEntrySlidingPanel';

export const GamesScreen = () => {
  const [entryPanelVisible, setEntryPanelVisible] = useState(false);
  const [selectedTargetScore, setSelectedTargetScore] = useState<34 | 37 | 40 | null>(null);

  // Placeholder wallet balance
  const walletBalance = 120.00;

  // Handler to open the entry panel with a specific score
  const handleGameCardPress = (score: 34 | 37 | 40) => {
    setSelectedTargetScore(score);
    setEntryPanelVisible(true);
  };

  // Handler to close the entry panel
  const handleClosePanel = () => {
    setEntryPanelVisible(false);
    setSelectedTargetScore(null);
  };

  return (
    <PageContainer title="Games" variant="dark" notificationCount={2}>
      <View style={styles.container}>
        <GameEntrySection onGameCardPress={handleGameCardPress} />
        {entryPanelVisible && selectedTargetScore && (
          <View style={StyleSheet.absoluteFill}>
            <GameEntrySlidingPanel
              isVisible={entryPanelVisible}
              onClose={handleClosePanel}
              targetScore={selectedTargetScore}
              walletBalance={walletBalance}
            />
          </View>
        )}
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 