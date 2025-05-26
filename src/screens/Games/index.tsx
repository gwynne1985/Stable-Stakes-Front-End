import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { PageContainer } from '../../components/PageContainer';
import { GameEntrySection } from '../../components/games/GameEntrySection';
// import { GameEntryPanel } from '../../components/panels/GameEntryPanel/GameEntryPanel';
import { GameEntrySlidingPanel } from '../../components/panels/GameEntrySlidingPanel';
import NextGamePanel from '../../components/games/NextGamePanel';
import ReferAFriendPanel from '../../components/games/ReferAFriendPanel';
import { ReferAFriendSlidingPanel } from '../../components/panels/ReferAFriendSlidingPanel';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { RootStackParamList } from '../../navigation';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/stack';

export const GamesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [entryPanelVisible, setEntryPanelVisible] = useState(false);
  const [selectedTargetScore, setSelectedTargetScore] = useState<34 | 37 | 40 | null>(null);
  const [referPanelVisible, setReferPanelVisible] = useState(false);

  // Placeholder wallet balance
  const walletBalance = 120.00;

  // Demo data for upcoming games (move from UpcomingGamesSection)
  const upcomingGames = [
    {
      game: "Flushin' It",
      date: "21st July",
      stake: "£20",
      potentialReturn: "£100",
    },
    {
      game: "Sweet Spot",
      date: "10th August",
      stake: "£30",
      potentialReturn: "£70",
    },
    {
      game: "Steady Eddie",
      date: "22nd September",
      stake: "£50",
      potentialReturn: "£150",
    },
  ];

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
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <GameEntrySection onGameCardPress={handleGameCardPress} />
        <Text
          style={{
            color: '#FFF',
            fontFamily: 'Poppins',
            fontSize: scaleWidth(22),
            fontStyle: 'italic',
            fontWeight: '900',
            lineHeight: scaleHeight(28),
            letterSpacing: scaleWidth(-0.22),
            textTransform: 'uppercase',
            marginTop: scaleHeight(30),
            marginBottom: scaleHeight(15),
            width: scaleWidth(300),
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Your Games
        </Text>
        <NextGamePanel
          game={upcomingGames[0]?.game || ''}
          date={upcomingGames[0]?.date || ''}
          stake={upcomingGames[0]?.stake || ''}
          potentialReturn={upcomingGames[0]?.potentialReturn || ''}
          onViewAll={() => navigation.navigate('MainApp', { screen: 'MyGamesScreen' })}
        />
        <ReferAFriendPanel onPress={() => setReferPanelVisible(true)} />
        <ReferAFriendSlidingPanel isVisible={referPanelVisible} onClose={() => setReferPanelVisible(false)} />
        <View style={{ height: scaleHeight(100) }} />
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
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
}); 