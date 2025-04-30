import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SlidingPanel } from '../../components/SlidingPanel';
import { EmailEntry } from './EmailEntry';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>;

export const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const handleClose = () => {
    setIsPanelVisible(false);
    // Wait for slide down animation to complete before navigating back
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:', email);
  };

  return (
    <View style={styles.container}>
      <SlidingPanel
        isVisible={isPanelVisible}
        title="New Account"
        onClose={handleClose}
        currentStep={1}
        totalSteps={4}
      >
        <EmailEntry onNext={handleEmailSubmit} />
      </SlidingPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 