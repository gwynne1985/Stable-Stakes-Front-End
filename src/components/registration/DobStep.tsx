import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface DobStepProps {
  onNext: () => void;
}

export const DobStep: React.FC<DobStepProps> = ({
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DATE OF BIRTH</Text>
      <Text style={styles.verificationText}>
        Please enter your date of birth. You must be at least 18 years old to use Stable Stakes.
      </Text>
      {/* Date picker will be added later */}
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    top: scaleHeight(90),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
  nextButton: {
    marginTop: scaleHeight(130),
    height: scaleHeight(48),
    backgroundColor: '#18302A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 