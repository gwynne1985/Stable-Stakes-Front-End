import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

const stats = [
  { label: 'Total Games', value: '10', valueStyle: 'big' },
  { label: 'Last Score', value: '29', valueStyle: 'big' },
  { label: 'Average Score', value: '35', valueStyle: 'big' },
  { label: 'Total Earnings', value: '£2800', valueStyle: 'small' },
];

export const StatsRow: React.FC = () => {
  return (
    <View style={styles.row}>
      {stats.map((stat, idx) => (
        <View
          key={stat.label}
          style={[
            styles.box,
            stat.label === 'Total Earnings' && { paddingBottom: scaleHeight(5) }
          ]}
        >
          <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">{stat.label}</Text>
          <Text style={stat.valueStyle === 'big' ? styles.valueBig : styles.valueSmall}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: scaleWidth(300),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: scaleHeight(28),
    marginBottom: scaleHeight(24),
  },
  box: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(6),
    borderRadius: scaleWidth(12),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4EDD69',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    gap: scaleHeight(-4),
  },
  label: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(7),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    width: '100%',
    minHeight: scaleHeight(12),
  },
  valueBig: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(24),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    marginTop: scaleHeight(2),
  },
  valueSmall: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    marginTop: scaleHeight(6),
  },
}); 