import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PageContainer } from '../../components/PageContainer';

export const MyGamesScreen = () => {
  return (
    <PageContainer title="Your Games" variant="light" notificationCount={2}>
      <View style={styles.container}>
        <Text>My Games Content</Text>
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