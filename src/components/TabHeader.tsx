import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface TabHeaderProps {
  activeTab: 'Upcoming' | 'Complete';
  onTabChange: (tab: 'Upcoming' | 'Complete') => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabRow}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Upcoming' ? styles.activeTab : styles.inactiveTab]}
        onPress={() => onTabChange('Upcoming')}
        activeOpacity={0.8}
      >
        <Text style={styles.tabText}>Upcoming</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Complete' ? styles.activeTab : styles.inactiveTab]}
        onPress={() => onTabChange('Complete')}
        activeOpacity={0.8}
      >
        <Text style={styles.tabText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleWidth(300),
    alignSelf: 'center',
    marginBottom: scaleHeight(24),
  },
  tab: {
    width: scaleWidth(150),
    paddingVertical: scaleHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#317143',
  },
  inactiveTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#C6C6C6',
  },
  tabText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: scaleHeight(22),
    letterSpacing: scaleWidth(-0.408),
  },
}); 