import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProShopScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pro Shop Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 