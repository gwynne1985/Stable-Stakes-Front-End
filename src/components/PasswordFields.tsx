import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Image } from 'react-native';
import { InputField } from './InputField';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface PasswordFieldsProps {
  onPasswordChange: (password: string) => void;
  shouldValidate?: boolean;
  onConfirmPasswordChange: (password: string) => void;
}

export const PasswordFields: React.FC<PasswordFieldsProps> = ({ 
  onPasswordChange, 
  shouldValidate = false,
  onConfirmPasswordChange 
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordBlurred, setIsConfirmPasswordBlurred] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const isValidPassword = useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar && hasNoSpaces;
  }, [password]);

  const passwordsMatch = useMemo(() => {
    return password === confirmPassword && password.length > 0;
  }, [password, confirmPassword]);

  const shouldShowValidation = shouldValidate || isConfirmPasswordBlurred;

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (isValidPassword && passwordsMatch) {
      onPasswordChange(text);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    onConfirmPasswordChange(text);
    if (isValidPassword && passwordsMatch) {
      onPasswordChange(password);
    }
  };

  const getPasswordFieldStyle = (isValid: boolean): ViewStyle & TextStyle => {
    const baseStyle: ViewStyle & TextStyle = {
      width: scaleWidth(300),
      paddingVertical: scaleWidth(16),
      paddingLeft: scaleWidth(16),
      paddingRight: scaleWidth(40),
      textAlign: 'left',
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: undefined,
      borderRadius: scaleWidth(5),
      fontSize: scaleWidth(14),
      backgroundColor: '#FFF',
      borderWidth: 1,
      marginBottom: scaleHeight(16),
    };
    
    if (password.length > 0) {
      return {
        ...baseStyle,
        borderColor: shouldShowValidation ? (isValid ? '#4EDD69' : '#FE606E') : 'rgba(96, 133, 123, 0.50)',
        color: '#18302A',
        letterSpacing: scaleWidth(-0.28),
      };
    }
    
    return {
      ...baseStyle,
      color: 'rgba(96, 133, 123, 0.50)',
      borderColor: 'rgba(96, 133, 123, 0.50)',
      letterSpacing: 0,
    };
  };

  const getConfirmPasswordFieldStyle = (isValid: boolean): ViewStyle & TextStyle => {
    const baseStyle: ViewStyle & TextStyle = {
      width: scaleWidth(300),
      paddingVertical: scaleWidth(16),
      paddingLeft: scaleWidth(16),
      paddingRight: scaleWidth(40),
      textAlign: 'left',
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: undefined,
      borderRadius: scaleWidth(5),
      fontSize: scaleWidth(14),
      backgroundColor: '#FFF',
      borderWidth: 1,
    };
    
    if (confirmPassword.length > 0) {
      return {
        ...baseStyle,
        borderColor: shouldShowValidation ? (isValid ? '#4EDD69' : '#FE606E') : 'rgba(96, 133, 123, 0.50)',
        color: '#18302A',
        letterSpacing: scaleWidth(-0.28),
      };
    }
    
    return {
      ...baseStyle,
      color: 'rgba(96, 133, 123, 0.50)',
      borderColor: 'rgba(96, 133, 123, 0.50)',
      letterSpacing: 0,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.passwordContainer}>
        <InputField
          placeholder="Choose password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPasswords}
          style={getPasswordFieldStyle(isValidPassword)}
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => setShowPasswords(!showPasswords)}
        >
          <Image 
            source={showPasswords ? require('../../assets/icons/eye-off.png') : require('../../assets/icons/eye.png')} 
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <InputField
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          onBlur={() => setIsConfirmPasswordBlurred(true)}
          secureTextEntry={!showPasswords}
          style={getConfirmPasswordFieldStyle(passwordsMatch)}
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => setShowPasswords(!showPasswords)}
        >
          <Image 
            source={showPasswords ? require('../../assets/icons/eye-off.png') : require('../../assets/icons/eye.png')} 
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      {shouldShowValidation && ((password.length > 0 && !isValidPassword) || (confirmPassword.length > 0 && !passwordsMatch)) ? (
        <Text style={styles.errorText}>Invalid password/Password do not match</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: scaleWidth(30),
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: scaleWidth(10),
    top: '50%',
    transform: [{ translateY: -scaleHeight(14.5) }],
    padding: scaleWidth(5),
  },
  eyeIconImage: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
  errorText: {
    color: '#FE606E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    marginTop: scaleHeight(7),
    marginBottom: scaleHeight(16),
  },
}); 