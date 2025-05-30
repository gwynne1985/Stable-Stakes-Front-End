import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { scaleHeight, scaleWidth } from '../../utils/scale';
import { GameEntryCard } from '../../components/GameEntryCard';
import { CompletedGameCard } from '../../components/yourgames/CompletedGameCard';
import { PrimaryButton } from '../../components/PrimaryButton';

interface UpcomingGamesSectionProps {
  activeTab: 'Upcoming' | 'Complete';
}

export const UpcomingGamesSection: React.FC<UpcomingGamesSectionProps> = ({ activeTab }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [completedGames, setCompletedGames] = useState(() => {
    // 15 completed games, cycling through allowed statuses and scores
    return Array.from({ length: 15 }, (_, i) => {
      const statuses: { status: 'Enter Score' | 'In Review' | 'Complete' | 'Rejected'; plusColor: string; targetScore: number }[] = [
        { status: 'Enter Score', plusColor: '#93DD4E', targetScore: 40 },
        { status: 'In Review', plusColor: '#4EDD69', targetScore: 37 },
        { status: 'Complete', plusColor: '#4EDDA9', targetScore: 34 },
        { status: 'Rejected', plusColor: '#93DD4E', targetScore: 40 },
      ];
      const s = statuses[i % statuses.length];
      return { ...s, id: i, score: 37 };
    });
  });

  const handleStatusChange = (gameIndex: number, newStatus: 'Enter Score' | 'In Review' | 'Complete' | 'Rejected', newScore: number) => {
    setCompletedGames(games =>
      games.map((g, idx) =>
        idx === gameIndex
          ? { ...g, status: newStatus, score: newScore }
          : g
      )
    );
  };

  // Demo data for three games
  const games = [
    {
      image: require('../../../assets/images/games/40-small.png'),
      targetScore: 40,
      plusColor: '#93DD4E',
      date: '3 AUG',
      club: 'Golf Club',
      stake: '£50',
      potentialReturn: '£100',
    },
    {
      image: require('../../../assets/images/games/37-small.png'),
      targetScore: 37,
      plusColor: '#4EDD69',
      date: '10 SEP',
      club: 'Golf Club',
      stake: '£20',
      potentialReturn: '£70',
    },
    {
      image: require('../../../assets/images/games/34-small.png'),
      targetScore: 34,
      plusColor: '#4EDDA9',
      date: '22 OCT',
      club: 'Golf Club',
      stake: '£20',
      potentialReturn: '£50',
    },
  ];

  const visibleGames = completedGames.slice(0, visibleCount);
  console.log('visibleGames', visibleGames);

  return (
    <ScrollView
      contentContainerStyle={styles.cardsContainer}
      showsVerticalScrollIndicator={false}
    >
      {activeTab === 'Upcoming' && games.map((game, idx) => (
        <GameEntryCard
          key={`${game.targetScore}-${game.stake}`}
          {...game}
          targetScore={game.targetScore as 34 | 37 | 40}
          potentialReturn={parseFloat((game.potentialReturn || '').replace(/[^0-9.-]+/g, ''))}
        />
      ))}
      {activeTab === 'Complete' && (
        <>
          {(visibleGames || []).map((game, idx) => (
            <CompletedGameCard
              key={game.id || idx}
              {...game}
              onStatusChange={(status, score) => handleStatusChange(idx, status as 'Enter Score' | 'In Review' | 'Complete' | 'Rejected', score)}
            />
          ))}
          <View style={styles.loadMoreContainer}>
            {visibleCount < 15 && (
              <PrimaryButton
                title="Load More"
                onPress={() => setVisibleCount(15)}
                isActive={true}
                style={styles.loadMoreButton}
              />
            )}
            <Text style={styles.loadMoreText}>{visibleCount} of 15</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    alignItems: 'center',
    paddingBottom: scaleHeight(90),
    minHeight: scaleHeight(400),
  },
  loadMoreContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(12),
  },
  loadMoreButton: {
    width: scaleWidth(300),
    marginBottom: scaleHeight(8),
  },
  loadMoreText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(20.8),
  },
}); 