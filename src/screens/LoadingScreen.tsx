import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    // Here we'll add logic to check initial app state
    // For now, we'll just navigate to Login after a short delay
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 