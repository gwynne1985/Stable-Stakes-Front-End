import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Image, TextInputProps } from 'react-native';
import { InputField } from './InputField';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface PasswordFieldsProps {
  onPasswordChange: (password: string) => void;
  shouldValidate?: boolean;
  onConfirmPasswordChange: (password: string) => void;
  passwordTextContentType?: TextInputProps['textContentType'];
  confirmPasswordTextContentType?: TextInputProps['textContentType'];
  onValidityChange?: (isValidAndMatching: boolean) => void;
}

export const PasswordFields: React.FC<PasswordFieldsProps> = ({ 
  onPasswordChange, 
  shouldValidate = false,
  onConfirmPasswordChange,
  passwordTextContentType = 'newPassword',
  confirmPasswordTextContentType = 'newPassword',
  onValidityChange,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordBlurred, setIsPasswordBlurred] = useState(false);
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

  useEffect(() => {
    if (onValidityChange) {
      onValidityChange(isValidPassword && passwordsMatch);
    }
  }, [isValidPassword, passwordsMatch, onValidityChange]);

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
      width: '100%',
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
      width: '100%',
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

  // Border color logic for password field
  const passwordFieldBorderColor = () => {
    if (isValidPassword) return '#4EDD69'; // green if valid
    if (isPasswordBlurred && password.length > 0 && !isValidPassword) return '#FE606E'; // red if blurred and invalid
    return 'rgba(96, 133, 123, 0.50)'; // default
  };

  // Border color logic for confirm password field
  const confirmPasswordFieldBorderColor = () => {
    if (passwordsMatch && confirmPassword.length > 0) return '#4EDD69'; // green if matches
    if (isConfirmPasswordBlurred && confirmPassword.length > 0 && !passwordsMatch) return '#FE606E'; // red if blurred and does not match
    return 'rgba(96, 133, 123, 0.50)'; // default
  };

  return (
    <View style={styles.container}>
      <View style={[styles.passwordContainer, { marginBottom: scaleHeight(16) }]}>
        <InputField
          placeholder="Choose password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPasswords}
          style={[
            getPasswordFieldStyle(isValidPassword),
            { borderColor: passwordFieldBorderColor() },
          ] as any}
          textContentType={passwordTextContentType}
          onBlur={() => setIsPasswordBlurred(true)}
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
          style={[
            getConfirmPasswordFieldStyle(passwordsMatch),
            { borderColor: confirmPasswordFieldBorderColor() },
          ] as any}
          textContentType={confirmPasswordTextContentType}
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

      {/* Single error message area for both errors */}
      <View style={{ minHeight: scaleHeight(12), justifyContent: 'center' }}>
        {isPasswordBlurred && password.length > 0 && !isValidPassword ? (
          <Text style={styles.errorText}>Invalid password</Text>
        ) : isConfirmPasswordBlurred && password.length > 0 && isValidPassword && confirmPassword.length > 0 && !passwordsMatch ? (
          <Text style={styles.errorText}>Passwords do not match</Text>
        ) : (
          <Text style={[styles.errorText, { color: 'transparent' }]}>.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: scaleWidth(10),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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