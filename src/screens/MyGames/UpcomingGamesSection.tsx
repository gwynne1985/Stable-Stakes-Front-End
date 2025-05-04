import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { scaleHeight, scaleWidth } from '../../utils/scale';
import { GameEntryCard } from '../../components/GameEntryCard';
import { CompletedGameCard } from '../../components/CompletedGameCard';
import { PrimaryButton } from '../../components/PrimaryButton';

interface UpcomingGamesSectionProps {
  activeTab: 'Upcoming' | 'Complete';
}

export const UpcomingGamesSection: React.FC<UpcomingGamesSectionProps> = ({ activeTab }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  // Reset to 10 when component unmounts
  useEffect(() => {
    return () => {
      setVisibleCount(10);
    };
  }, []);

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
      stake: '£30',
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

  // 15 completed games, cycling through allowed statuses and scores
  const completedGames = Array.from({ length: 15 }, (_, i) => {
    const statuses = [
      { status: 'Enter Score' as const, plusColor: '#93DD4E', targetScore: 40 },
      { status: 'In Review' as const, plusColor: '#4EDD69', targetScore: 37 },
      { status: 'Complete' as const, plusColor: '#4EDDA9', targetScore: 34 },
      { status: 'Rejected' as const, plusColor: '#93DD4E', targetScore: 40 },
    ];
    const s = statuses[i % statuses.length];
    return { ...s };
  });

  const visibleGames = completedGames.slice(0, visibleCount);

  return (
    <ScrollView
      contentContainerStyle={styles.cardsContainer}
      showsVerticalScrollIndicator={false}
    >
      {activeTab === 'Upcoming' && games.map((game, idx) => (
        <GameEntryCard key={idx} {...game} />
      ))}
      {activeTab === 'Complete' && (
        <>
          {visibleGames.map((game, idx) => (
            <CompletedGameCard key={idx} {...game} />
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