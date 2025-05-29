import React, { useState, useEffect } from 'react';
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
import { db, auth } from '../../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { CLUBS, USERS } from '../../constants/firestore';
// @ts-ignore
import { RootStackParamList } from '../../navigation';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/stack';
import { GameType } from '../../components/games/GameEntryPanel/GameSummaryStep';

export const GamesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [entryPanelVisible, setEntryPanelVisible] = useState(false);
  const [selectedTargetScore, setSelectedTargetScore] = useState<34 | 37 | 40 | null>(null);
  const [referPanelVisible, setReferPanelVisible] = useState(false);
  const [targetScores, setTargetScores] = useState({
    upAndDown: 34,
    flushingIt: 37,
    throwingDarts: 40,
  });
  const [loading, setLoading] = useState(true);
  const [selectedGameType, setSelectedGameType] = useState<GameType | null>(null);

  useEffect(() => {
    const fetchTargetScores = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not logged in');

        const userDoc = await getDoc(doc(db, USERS, user.uid));
        const clubId = userDoc.data()?.clubId;
        if (!clubId) throw new Error('Club ID not found');

        console.log('Looking up club by club_id:', clubId);
        const clubsQuery = query(collection(db, CLUBS), where('club_id', '==', clubId));
        const clubsSnapshot = await getDocs(clubsQuery);
        const clubDoc = clubsSnapshot.docs[0];
        if (!clubDoc) throw new Error('Club not found for club_id: ' + clubId);

        const clubData = clubDoc.data();
        let scores = clubData?.targetScores;
        if (!scores) {
          // Fallback to flat fields if targetScores is missing
          scores = {
            upAndDown: clubData?.up_and_down_target ?? 34,
            flushingIt: clubData?.flushin_it_target ?? 37,
            throwingDarts: clubData?.throwing_darts_target ?? 40,
          };
          console.log('Using flat fields for target scores:', scores);
        } else {
          console.log('Using targetScores object:', scores);
        }
        setTargetScores(scores);
      } catch (error) {
        console.error('Error fetching target scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTargetScores();
  }, []);

  // Debug log when targetScores changes
  useEffect(() => {
    console.log('Current targetScores state:', targetScores);
  }, [targetScores]);

  // Placeholder wallet balance
  const walletBalance = 120.0;

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Handler to open the entry panel with a specific score and game type
  const handleGameCardPress = (score: number, gameType: GameType) => {
    setSelectedTargetScore(score as 34 | 37 | 40);
    setSelectedGameType(gameType);
    setEntryPanelVisible(true);
  };

  // Handler to close the entry panel
  const handleClosePanel = () => {
    setEntryPanelVisible(false);
    setSelectedTargetScore(null);
    setSelectedGameType(null);
  };

  return (
    <PageContainer title="Games" variant="dark" notificationCount={2}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <GameEntrySection
          onGameCardPress={(score, gameType) => handleGameCardPress(score, gameType as GameType)}
          targetScores={targetScores}
        />
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
          game={"Flushin' It"}
          date={"21st July"}
          stake={"£20"}
          potentialReturn={"£100"}
          onViewAll={() => navigation.navigate('MainApp', { screen: 'MyGamesScreen' })}
        />
        <ReferAFriendPanel onPress={() => setReferPanelVisible(true)} />
        <ReferAFriendSlidingPanel isVisible={referPanelVisible} onClose={() => setReferPanelVisible(false)} />
        <View style={{ height: scaleHeight(100) }} />
        {entryPanelVisible && selectedTargetScore && selectedGameType && (
          <View style={StyleSheet.absoluteFill}>
            <GameEntrySlidingPanel
              isVisible={entryPanelVisible}
              onClose={handleClosePanel}
              targetScore={selectedTargetScore}
              walletBalance={walletBalance}
              gameType={selectedGameType}
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