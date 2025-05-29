import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SlidingPanel } from '../../components/SlidingPanel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { useRegistrationStore } from '../../state/useRegistrationStore';
import { completeRegistration } from '../../services/registration';

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>;

export const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const registrationData = useRegistrationStore();

  const handleClose = () => {
    setIsPanelVisible(false);
    // Wait for slide down animation to complete before navigating back
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const handleCompleteRegistration = async () => {
    try {
      setIsLoading(true);
      // Debug log for password
      console.log('[REGISTRATION DEBUG] Password value before registration:', registrationData.password);
      await completeRegistration();
      // Reset registration state
      registrationData.reset();
      // Navigate to main app
      navigation.replace('MainApp', { screen: 'GamesScreen' });
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SlidingPanel
        isVisible={isPanelVisible}
        title="New Account"
        onClose={handleClose}
        onComplete={handleCompleteRegistration}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 