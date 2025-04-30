import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SlidingPanel } from '../../components/SlidingPanel';
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

  return (
    <View style={styles.container}>
      <SlidingPanel
        isVisible={isPanelVisible}
        title="New Account"
        onClose={handleClose}
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