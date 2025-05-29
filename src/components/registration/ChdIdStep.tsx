import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import { InfoBottomSheet } from '../panels/InfoBottomSheet';
import { isChdIdAvailable } from '../../services/registration';

interface ChdIdStepProps {
  chdId: string;
  onChdIdChange: (chdId: string) => void;
  onNext: () => void;
  onFinish: () => void;
}

export const ChdIdStep: React.FC<ChdIdStepProps> = ({
  chdId,
  onChdIdChange,
  onNext,
  onFinish,
}) => {
  const [blurred, setBlurred] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidChdId = useMemo(() => {
    return /^\d{10}$/.test(chdId.trim());
  }, [chdId]);

  const handleFinish = async () => {
    if (!isValidChdId) return;

    try {
      setIsChecking(true);
      setError(null);
      
      const available = await isChdIdAvailable(chdId);
      if (!available) {
        setError('This CHD ID is already registered. Please check and try another.');
        return;
      }

      onFinish();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify CHD ID. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleChange = (text: string) => {
    setError(null);
    onChdIdChange(text);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: scaleWidth(300), alignSelf: 'center' }}>
        <Text style={styles.header}>YOUR CHD ID</Text>
        <Text style={styles.verificationText}>
          Enter your 10 digit Central Handicap Database ID to verify your handicap status.
        </Text>
        <View style={{ position: 'relative' }}>
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
            onChangeText={handleChange}
            placeholder="CHD ID"
            placeholderTextColor="rgba(96, 133, 123, 0.50)"
            autoCapitalize="characters"
            keyboardType="number-pad"
            maxLength={10}
            onBlur={() => setBlurred(true)}
            editable={!isChecking}
          />
          {isChecking && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color="#18302A" />
            </View>
          )}
        </View>
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <PrimaryButton
          title="Finish"
          onPress={handleFinish}
          isActive={isValidChdId && !isChecking}
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
    lineHeight: undefined,
    borderRadius: scaleWidth(5),
    fontSize: scaleWidth(14),
    marginBottom: scaleHeight(8),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  inputInactive: {
    color: 'rgba(96, 133, 123, 0.50)',
    borderColor: 'rgba(96, 133, 123, 0.50)',
  },
  inputValid: {
    color: '#18302A',
    borderColor: '#4EDD69',
  },
  inputInvalid: {
    color: '#18302A',
    borderColor: '#FE606E',
  },
  loadingOverlay: {
    position: 'absolute',
    right: scaleWidth(16),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  errorText: {
    color: '#FE606E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    marginBottom: scaleHeight(16),
  },
  nextButton: {
    width: '100%',
    marginTop: scaleHeight(24),
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