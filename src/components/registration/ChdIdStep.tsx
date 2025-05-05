import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import { InfoBottomSheet } from '../panels/InfoBottomSheet';

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
    return /^\d{10}$/.test(chdId.trim());
  }, [chdId]);

  const [blurred, setBlurred] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

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
            : blurred && chdId.length > 0
            ? styles.inputInvalid
            : null,
        ]}
        value={chdId}
        onChangeText={onChdIdChange}
        placeholder="CHD ID"
        placeholderTextColor="rgba(96, 133, 123, 0.50)"
        autoCapitalize="characters"
        keyboardType="number-pad"
        maxLength={10}
        onBlur={() => setBlurred(true)}
      />
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValidChdId}
        style={styles.nextButton}
      />
      <TouchableOpacity onPress={() => setInfoVisible(true)} activeOpacity={0.7} style={styles.helpContainer}>
        <Text style={styles.helpText}>Help me find it</Text>
      </TouchableOpacity>
      <InfoBottomSheet
        isVisible={infoVisible}
        onClose={() => setInfoVisible(false)}
        title="CHD LIFETIME ID"
        content={"Your CHD lifetime ID, also known as your Membership number, is a unique 10-digit code used to track your golf handicap across clubs and competitions. You can find in golf apps like England Golf or IG Member."}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(53),
  },
  header: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    color: '#18302A',
    marginBottom: scaleHeight(8),
  },
  verificationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
    marginBottom: scaleHeight(24),
  },
  input: {
    width: '100%',
    padding: scaleWidth(16),
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined, // normal
    borderRadius: scaleWidth(5),
    fontSize: scaleWidth(14), // default to active size
    marginBottom: scaleHeight(24),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
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
    width: '100%',
    marginTop: scaleHeight(40),
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(16),
  },
  helpText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
}); 