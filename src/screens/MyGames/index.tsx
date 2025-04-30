import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MyGamesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Games Screen</Text>
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