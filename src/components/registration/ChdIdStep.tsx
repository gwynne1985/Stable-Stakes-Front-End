import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface ChdIdStepProps {
  chdId: string;
  onChdIdChange: (chdId: string) => void;
  onNext: () => void;
}

export const ChdIdStep: React.FC<ChdIdStepProps> = ({
  chdId,
  onChdIdChange,
  onNext,
}) => {
  const isValidChdId = useMemo(() => {
    return chdId.trim().length > 0;
  }, [chdId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>YOUR CHD ID</Text>
      <Text style={styles.verificationText}>
        Enter your Central Handicap Database ID to verify your handicap status.
      </Text>
      <TextInput
        style={styles.input}
        value={chdId}
        onChangeText={onChdIdChange}
        placeholder="CHD ID"
        placeholderTextColor="#18302A80"
        autoCapitalize="characters"
      />
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValidChdId}
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
    top: scaleHeight(90),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
  input: {
    marginTop: scaleHeight(130),
    height: scaleHeight(48),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: scaleWidth(16),
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    color: '#18302A',
    marginBottom: scaleHeight(24),
  },
  nextButton: {
    alignSelf: 'center',
  },
}); 