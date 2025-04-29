import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackgroundLayout, InputField, PrimaryButton } from '../../components';
import { colors } from '../../theme/colors';
import { scaleHeight, scaleWidth } from '../../utils/scale';

export const ScrollExampleScreen: React.FC = () => {
  return (
    <BackgroundLayout contentContainerStyle={styles.container}>
      <Text style={styles.title}>Scrollable Content Example</Text>
      
      {/* Form Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Player Information</Text>
        <InputField
          placeholder="Full Name"
          onChangeText={() => {}}
          style={styles.input}
        />
        <InputField
          placeholder="Email"
          onChangeText={() => {}}
          keyboardType="email-address"
          style={styles.input}
        />
        <InputField
          placeholder="Phone Number"
          onChangeText={() => {}}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Golf Statistics</Text>
        <InputField
          placeholder="Handicap"
          onChangeText={() => {}}
          keyboardType="numeric"
          style={styles.input}
        />
        <InputField
          placeholder="Average Score"
          onChangeText={() => {}}
          keyboardType="numeric"
          style={styles.input}
        />
        <InputField
          placeholder="Home Course"
          onChangeText={() => {}}
          style={styles.input}
        />
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Preferences</Text>
        <InputField
          placeholder="Preferred Tee Time"
          onChangeText={() => {}}
          style={styles.input}
        />
        <InputField
          placeholder="Usual Playing Days"
          onChangeText={() => {}}
          style={styles.input}
        />
        <InputField
          placeholder="Preferred Partners"
          onChangeText={() => {}}
          style={styles.input}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Save Profile"
          onPress={() => {}}
          style={styles.button}
        />
        <PrimaryButton
          title="Cancel"
          onPress={() => {}}
          isActive={false}
          style={styles.button}
        />
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleHeight(32),
  },
  title: {
    fontSize: scaleWidth(24),
    fontFamily: 'Poppins-Bold',
    color: colors.background,
    marginBottom: scaleHeight(24),
    textAlign: 'center',
  },
  section: {
    marginBottom: scaleHeight(32),
  },
  sectionTitle: {
    fontSize: scaleWidth(18),
    fontFamily: 'Poppins-Medium',
    color: colors.background,
    marginBottom: scaleHeight(16),
  },
  input: {
    marginBottom: scaleHeight(12),
  },
  buttonContainer: {
    gap: scaleHeight(12),
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(32),
  },
  button: {
    marginHorizontal: scaleWidth(16),
  },
}); 