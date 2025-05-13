import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

const YourClubStep: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <View style={styles.outerPanel}>
      <View style={styles.innerPanel} />
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
    backgroundColor: '#FFE6E6',
    alignSelf: 'stretch',
    marginTop: 0,
  },
});

export default YourClubStep; 