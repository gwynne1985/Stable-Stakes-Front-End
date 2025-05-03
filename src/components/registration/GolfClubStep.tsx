import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface GolfClubStepProps {
  onNext: () => void;
}

export const GolfClubStep: React.FC<GolfClubStepProps> = ({
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>YOUR GOLF CLUB</Text>
      <Text style={styles.verificationText}>
        Select your home golf club from the list. This will be used to verify your handicap.
      </Text>
      {/* Golf club selector will be added later */}
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={false} // Will be updated when club selector is implemented
        style={styles.nextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(24),
  },
  header: {
    position: 'absolute',
    top: scaleHeight(53),
    left: scaleWidth(30),
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    color: '#18302A',
  },
  verificationText: {
    position: 'absolute',
    top: scaleHeight(110),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
  nextButton: {
    marginTop: scaleHeight(130),
    alignSelf: 'center',
  },
}); 