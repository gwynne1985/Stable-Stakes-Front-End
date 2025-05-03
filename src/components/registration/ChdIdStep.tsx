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
        style={[
          styles.input,
          chdId.length === 0
            ? styles.inputInactive
            : isValidChdId
            ? styles.inputValid
            : styles.inputInvalid,
        ]}
        value={chdId}
        onChangeText={onChdIdChange}
        placeholder="CHD ID"
        placeholderTextColor="rgba(96, 133, 123, 0.50)"
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
    top: scaleHeight(110),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
  input: {
    width: scaleWidth(300),
    padding: scaleWidth(16),
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined, // normal
    borderRadius: scaleWidth(5),
    fontSize: scaleWidth(14), // default to active size
    marginTop: scaleHeight(196),
    marginBottom: scaleHeight(24),
    backgroundColor: '#FFF',
    borderWidth: 1,
  },
  inputInactive: {
    color: 'rgba(96, 133, 123, 0.50)',
    borderColor: 'rgba(96, 133, 123, 0.50)',
    letterSpacing: 0,
  },
  inputValid: {
    color: '#18302A',
    borderColor: '#4EDD69',
    letterSpacing: scaleWidth(-0.28),
  },
  inputInvalid: {
    color: '#18302A',
    borderColor: '#FE606E',
    letterSpacing: 0,
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: scaleHeight(40),
  },
}); 