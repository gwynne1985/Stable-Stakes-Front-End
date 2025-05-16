import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

const YourClubStep: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Club</Text>
      <Text style={styles.placeholder}>This is the Your Club step. Update this content as needed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaleWidth(20),
  },
  title: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '900',
    marginBottom: scaleHeight(20),
  },
  placeholder: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    textAlign: 'center',
  },
});

export default YourClubStep; 