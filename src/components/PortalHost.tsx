import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal } from '@gorhom/portal';

export const PortalHost = () => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <Portal hostName="confirmation-popup" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999999,
    elevation: 999999,
    pointerEvents: 'box-none',
  },
}); 