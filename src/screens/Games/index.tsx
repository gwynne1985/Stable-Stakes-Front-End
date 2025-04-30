import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PageContainer } from '../../components/PageContainer';

export const GamesScreen = () => {
  return (
    <PageContainer title="Games" variant="dark" notificationCount={2}>
      <View style={styles.container}>
        <Text style={styles.text}>Games Content</Text>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
  },
}); 