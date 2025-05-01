import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PageContainer } from '../../components/PageContainer';
import { GameEntrySection } from '../../components/games/GameEntrySection';

export const GamesScreen = () => {
  return (
    <PageContainer title="Games" variant="dark" notificationCount={2}>
      <View style={styles.container}>
        <GameEntrySection />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 