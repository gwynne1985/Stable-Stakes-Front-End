import React, { useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={scaleHeight(35)}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: scaleWidth(300), alignSelf: 'center' }}>
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
                  textContentType="oneTimeCode"
                  autoComplete="one-time-code"
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
          <View style={{ height: 20 }} />
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendButtonText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(53),
    paddingBottom: scaleHeight(40),
  },
  container: {
    flex: 1,
    // No paddingHorizontal here, handled by scrollContent
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
  codeInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: scaleHeight(24),
  },
  codeBox: {
    flex: 1,
    minWidth: scaleWidth(44),
    maxWidth: scaleWidth(60),
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
    marginHorizontal: scaleWidth(2),
  },
  codeBoxFilled: {
    backgroundColor: '#9BA19C',
  },
  codeBoxAllFilled: {
    borderColor: '#4EDD69',
  },
  codeBoxWrapper: {
    flex: 1,
    minWidth: scaleWidth(44),
    maxWidth: scaleWidth(60),
    height: scaleWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    marginTop: scaleHeight(24),
    width: '100%',
  },
  resendButton: {
    display: 'flex',
    width: scaleWidth(300),
    height: scaleHeight(40),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(25),
    flexShrink: 0,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#4EDD69',
    backgroundColor: '#E3E3E3',
  },
  resendButtonText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.42),
  },
}); 