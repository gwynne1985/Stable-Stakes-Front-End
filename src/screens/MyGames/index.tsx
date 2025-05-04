import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PageContainer } from '../../components/PageContainer';
import { StatsRow } from '../../components/StatsRow';
import { TabHeader } from '../../components/TabHeader';
import { UpcomingGamesSection } from './UpcomingGamesSection';

export const MyGamesScreen = () => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Complete'>('Upcoming');
  return (
    <PageContainer title="Your Games" variant="light" notificationCount={2}>
      <View style={styles.container}>
        <StatsRow />
        <TabHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <UpcomingGamesSection activeTab={activeTab} />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 