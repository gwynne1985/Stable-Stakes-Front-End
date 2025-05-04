import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

const STATUS_COLORS: Record<string, string> = {
  'Enter Score': 'rgba(54, 141, 241, 0.80)',
  'In Review': 'rgba(252, 146, 24, 0.80)',
  'Complete': 'rgba(52, 165, 71, 0.80)',
  'Rejected': 'rgba(230, 55, 70, 0.80)',
};

interface CompletedGameCardProps {
  targetScore: number;
  plusColor: string;
  status: 'Enter Score' | 'In Review' | 'Complete' | 'Rejected';
  statusText?: string;
  date?: string;
  club?: string;
  stake?: string;
  score?: number;
  return?: string;
}

export const CompletedGameCard: React.FC<CompletedGameCardProps> = ({
  targetScore,
  plusColor,
  status,
  statusText,
  date = '23 May',
  club = 'Saunton',
  stake = '£20',
  score = 37,
  return: returnAmount = '£0',
}) => {
  return (
    <View style={styles.card}>
      {/* Target Score */}
      <View style={styles.targetScoreContainer}>
        <Text style={styles.targetScore}>{targetScore}</Text>
        <Text style={[styles.plus, { color: plusColor }]}>+</Text>
      </View>
      {/* Status Lozenge */}
      <View style={[styles.statusLozenge, { backgroundColor: STATUS_COLORS[status] }]}> 
        <Text style={styles.statusText}>{statusText || status}</Text>
      </View>
      {/* Game Details */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailsColumn}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date: </Text>
            <Text style={styles.detailValue}>{date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Club: </Text>
            <Text style={styles.detailValue}>{club}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Stake: </Text>
            <Text style={styles.detailValue}>{stake}</Text>
          </View>
        </View>
        <View style={styles.detailsColumn}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Score: </Text>
            <Text style={styles.detailValue}>{score}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Return: </Text>
            <Text style={styles.detailValue}>{returnAmount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scaleWidth(300),
    height: scaleHeight(136),
    borderRadius: scaleWidth(20),
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(24),
    position: 'relative',
  },
  targetScoreContainer: {
    position: 'absolute',
    left: scaleWidth(26),
    top: scaleHeight(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetScore: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(35),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: scaleWidth(-0.9),
    textTransform: 'uppercase',
  },
  plus: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: scaleWidth(-2.16),
    marginLeft: scaleWidth(2.5),
    textTransform: 'uppercase',
  },
  statusLozenge: {
    position: 'absolute',
    left: scaleWidth(197),
    top: scaleHeight(23),
    width: scaleWidth(80),
    height: scaleHeight(20),
    borderRadius: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '500',
    letterSpacing: scaleWidth(-0.28),
    textAlign: 'center',
  },
  detailsGrid: {
    position: 'absolute',
    left: scaleWidth(23),
    top: scaleHeight(69),
    flexDirection: 'row',
    width: scaleWidth(254),
    justifyContent: 'space-between',
    paddingRight: scaleWidth(10),
  },
  detailsColumn: {
    flexDirection: 'column',
    gap: scaleHeight(6),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#8CA09A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '400',
    letterSpacing: scaleWidth(-0.24),
  },
  detailValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.28),
  },
}); 