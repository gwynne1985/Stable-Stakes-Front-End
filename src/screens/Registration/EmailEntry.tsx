import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputField } from '../../components/InputField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface Props {
  onNext: (email: string) => void;
}

export const EmailEntry: React.FC<Props> = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    setIsValid(emailRegex.test(text));
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Enter your email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Next"
          onPress={() => onNext(email)}
          isActive={isValid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(20),
  },
  input: {
    marginBottom: scaleHeight(20),
  },
  buttonContainer: {
    alignItems: 'center',
  },
}); 