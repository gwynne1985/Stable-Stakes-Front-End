import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Games'>;

export const GamesScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
}); 