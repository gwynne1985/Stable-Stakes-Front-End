import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackgroundLayout, PrimaryButton } from '../../components';
import { colors } from '../../theme/colors';
import { scaleHeight, scaleWidth } from '../../utils/scale';

export const HomeScreen: React.FC = () => {
  return (
    <BackgroundLayout
      isScrollable={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Stable Stakes</Text>
        <Text style={styles.subtitle}>Your Premier Golf Gaming Platform</Text>
        
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Start Playing"
            onPress={() => {}}
            style={styles.button}
          />
          <PrimaryButton
            title="View Tutorial"
            onPress={() => {}}
            style={styles.button}
          />
        </View>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: scaleWidth(32),
    fontFamily: 'Poppins-Bold',
    color: colors.background,
    marginBottom: scaleHeight(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaleWidth(18),
    fontFamily: 'Poppins-Regular',
    color: colors.background,
    marginBottom: scaleHeight(32),
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: scaleHeight(16),
  },
  button: {
    marginHorizontal: scaleWidth(16),
  },
}); 