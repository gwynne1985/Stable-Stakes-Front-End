import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import * as Haptics from 'expo-haptics';

interface NumericKeypadProps {
  onNumberPress: (number: number) => void;
  onDelete: () => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onNumberPress, onDelete }) => {
  const handlePress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onNumberPress(number);
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDelete();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(3)}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(4)}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(5)}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(6)}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(7)}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(8)}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(9)}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(0)}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(12),
  },
  button: {
    width: scaleWidth(80),
    height: scaleHeight(60),
    backgroundColor: '#2A2A2A',
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scaleWidth(24),
    fontFamily: 'Poppins-SemiBold',
  },
  deleteButton: {
    width: scaleWidth(80),
    height: scaleHeight(60),
    backgroundColor: '#2A2A2A',
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: scaleWidth(24),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default NumericKeypad; 