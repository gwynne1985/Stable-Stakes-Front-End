import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

const ContactStep: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <View style={styles.outerPanel}>
      <View style={styles.innerPanel}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerPanel: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    paddingTop: 0,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: scaleHeight(20),
    right: scaleWidth(20),
    zIndex: 2,
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(12),
    width: scaleWidth(32),
    height: scaleWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  closeText: {
    fontSize: scaleWidth(18),
    fontWeight: 'bold',
    color: '#707070',
  },
  innerPanel: {
    width: '100%',
    height: scaleHeight(309),
    paddingVertical: scaleHeight(20),
    paddingHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: scaleHeight(10),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#E6FFE6',
    alignSelf: 'stretch',
    marginTop: 0,
  },
});

export default ContactStep; 