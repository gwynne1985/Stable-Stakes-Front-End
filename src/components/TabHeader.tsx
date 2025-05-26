import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface TabHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabLabels: string[];
}

export const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange, tabLabels }) => {
  return (
    <View style={styles.tabRow}>
      {tabLabels.map(label => (
        <TouchableOpacity
          key={label}
          style={[styles.tab, activeTab === label ? styles.activeTab : styles.inactiveTab]}
          onPress={() => onTabChange(label)}
          activeOpacity={0.8}
        >
          <Text style={styles.tabText}>{label}</Text>
        </TouchableOpacity>
      ))}
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