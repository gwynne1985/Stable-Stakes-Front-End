import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PageContainer } from '../../components/PageContainer';

export const ProShopScreen = () => {
  return (
    <PageContainer title="Pro Shop" notificationCount={2}>
      <View style={styles.container}>
        <Text>Pro Shop Content</Text>
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