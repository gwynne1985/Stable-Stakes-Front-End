import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { PrimaryButton } from '../PrimaryButton';
import { InputField } from '../InputField';

interface DobStepProps {
  onNext: () => void;
}

export const DobStep: React.FC<DobStepProps> = ({
  onNext,
}) => {
  // State for each field
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [blurred, setBlurred] = React.useState(false);
  const [error, setError] = React.useState('');

  // Helper: check if all fields are filled and numeric
  const isFilled = day.length === 2 && month.length === 2 && year.length === 4;
  const isNumeric = /^\d+$/.test(day) && /^\d+$/.test(month) && /^\d+$/.test(year);

  // Helper: validate date
  function isValidDate(d: string, m: string, y: string) {
    const dd = parseInt(d, 10);
    const mm = parseInt(m, 10) - 1; // JS months 0-based
    const yyyy = parseInt(y, 10);
    const date = new Date(yyyy, mm, dd);
    return (
      date.getFullYear() === yyyy &&
      date.getMonth() === mm &&
      date.getDate() === dd
    );
  }

  // Helper: check age
  function isOver18(d: string, m: string, y: string) {
    const today = new Date();
    const birth = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    let age = today.getFullYear() - birth.getFullYear();
    const mDiff = today.getMonth() - birth.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  }

  // Validation logic
  React.useEffect(() => {
    if (!blurred) {
      setError('');
      return;
    }
    if (!isFilled || !isNumeric) {
      setError('Invalid date');
      return;
    }
    if (!isValidDate(day, month, year)) {
      setError('Invalid date');
      return;
    }
    if (!isOver18(day, month, year)) {
      setError("You must be over 18 to play Stable Stakes. We encourage you to come back when you're eligible, and in the meantime, keep enjoying your golf!");
      return;
    }
    setError('');
  }, [day, month, year, blurred]);

  // Border color logic
  const getBorderColor = () => {
    if (!blurred) return '#CCC';
    if (error) return '#FE606E';
    if (isFilled && isNumeric && isValidDate(day, month, year) && isOver18(day, month, year)) return '#4EDD69';
    return '#CCC';
  };

  const isValid = !error && blurred && isFilled && isNumeric && isValidDate(day, month, year) && isOver18(day, month, year);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DATE OF BIRTH</Text>
      <Text style={styles.verificationText}>
        Please enter your date of birth. You must be at least 18 years old to use Stable Stakes.
      </Text>
      <View style={styles.dobRow}>
        <InputField
          placeholder="DD"
          value={day}
          onChangeText={setDay}
          keyboardType="number-pad"
          maxLength={2}
          style={{
            ...styles.dobBox,
            borderColor: getBorderColor(),
          }}
          containerStyle={{ width: scaleWidth(73), marginRight: scaleWidth(12.5) }}
          onBlur={() => setBlurred(true)}
        />
        <InputField
          placeholder="MM"
          value={month}
          onChangeText={setMonth}
          keyboardType="number-pad"
          maxLength={2}
          style={{
            ...styles.dobBox,
            borderColor: getBorderColor(),
          }}
          containerStyle={{ width: scaleWidth(73), marginRight: scaleWidth(12.5) }}
          onBlur={() => setBlurred(true)}
        />
        <InputField
          placeholder="YYYY"
          value={year}
          onChangeText={setYear}
          keyboardType="number-pad"
          maxLength={4}
          style={{
            ...styles.dobBox,
            borderColor: getBorderColor(),
          }}
          containerStyle={{ width: scaleWidth(129) }}
          onBlur={() => setBlurred(true)}
        />
      </View>
      <View style={{ minHeight: scaleHeight(12), justifyContent: 'center' }}>
        {blurred && error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={[styles.errorText, { color: 'transparent' }]}>.</Text>
        )}
      </View>
      <PrimaryButton
        title="Next"
        onPress={onNext}
        isActive={isValid}
        style={styles.nextButton}
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
  nextButton: {
    marginTop: scaleHeight(24),
    alignSelf: 'center',
  },
  dobRow: {
    flexDirection: 'row',
    width: scaleWidth(300),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  dobBox: {
    paddingVertical: scaleHeight(16),
    paddingHorizontal: 0,
    borderRadius: scaleWidth(5),
    backgroundColor: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    textAlign: 'center',
  },
  errorText: {
    color: '#FE606E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(11),
    marginTop: scaleHeight(7),
    marginBottom: scaleHeight(8),
  },
}); 