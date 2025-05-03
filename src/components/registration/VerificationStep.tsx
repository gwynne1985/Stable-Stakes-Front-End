import React, { useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';

interface VerificationStepProps {
  code: string;
  onCodeChange: (code: string) => void;
  onNext: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  code,
  onCodeChange,
  onNext,
}) => {
  const isValidCode = useMemo(() => {
    return code.length === 5 && /^\d+$/.test(code);
  }, [code]);

  const inputRefs = useRef<Array<React.RefObject<TextInput | null>>>([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const handleCodeChange = (text: string, idx: number) => {
    let newCode = code.split('');
    if (text.length > 0) {
      newCode[idx] = text[text.length - 1];
      if (idx < 4) inputRefs.current[idx + 1]?.current?.focus();
    } else {
      newCode[idx] = '';
      if (idx > 0) inputRefs.current[idx - 1]?.current?.focus();
    }
    onCodeChange(newCode.join(''));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ENTER CODE</Text>
      <Text style={styles.verificationText}>
        Please enter the 5-digit verification code we sent to your email address.
      </Text>
      <View style={styles.codeInputRow}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.codeBoxWrapper}>
            <TextInput
              ref={inputRefs.current[i]}
              style={[
                styles.codeBox,
                code[i] ? styles.codeBoxFilled : null,
                code.length === 5 ? styles.codeBoxAllFilled : null,
              ]}
              value={code[i] || ''}
              onChangeText={text => handleCodeChange(text, i)}
              keyboardType="number-pad"
              maxLength={1}
              returnKeyType="next"
              textAlign="center"
              textAlignVertical="center"
              placeholder=""
              selectionColor="#18302A"
              autoFocus={i === 0}
            />
          </View>
        ))}
      </View>
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValidCode}
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
  codeInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(10),
    marginTop: scaleHeight(196),
    marginBottom: scaleHeight(24),
  },
  codeBox: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(8),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(96, 133, 123, 0.50)',
    color: '#18302A',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '900',
    flexShrink: 0,
  },
  codeBoxFilled: {
    backgroundColor: '#9BA19C',
  },
  codeBoxAllFilled: {
    borderColor: '#4EDD69',
  },
  codeBoxWrapper: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: scaleHeight(40),
  },
}); 