import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PageContainer } from '../../components/PageContainer';

export const WalletScreen = () => {
  return (
    <PageContainer title="Wallet" variant="light" notificationCount={2}>
      <View style={styles.container}>
        <Text>Wallet Content</Text>
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
}); 