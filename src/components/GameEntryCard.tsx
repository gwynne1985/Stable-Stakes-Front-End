import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';

interface GameEntryCardProps {
  image: ImageSourcePropType;
  targetScore: number;
  plusColor: string;
  date: string;
  club: string;
  stake: string;
  potentialReturn: string;
}

export const GameEntryCard: React.FC<GameEntryCardProps> = ({
  image,
  targetScore,
  plusColor,
  date,
  club,
  stake,
  potentialReturn,
}) => {
  return (
    <View style={styles.card}> 
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <View style={styles.gradientOverlay} />
        {/* Date Label */}
        <Text style={styles.dateLabel}>{date}</Text>
        {/* Target Score */}
        <View style={styles.targetScoreContainer}>
          <Text style={styles.targetScore}>{targetScore}</Text>
          <Text style={[styles.plus, { color: plusColor }]}>+</Text>
        </View>
        {/* Golf Club Label */}
        <View style={styles.clubLabelContainer}>
          <Text style={styles.clubLabel}>{club}</Text>
        </View>
      </View>
      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.stakeRow}>
          <Text style={styles.stakeLabel}>Stake: </Text>
          <Text style={styles.stakeValue}>{stake}</Text>
        </View>
        <View style={styles.returnRow}>
          <Text style={styles.stakeLabel}>Potential Return: </Text>
          <Text style={styles.stakeValue}>{potentialReturn}</Text>
        </View>
        <Image source={require('../../assets/icons/edit.png')} style={styles.editIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scaleWidth(300),
    height: scaleHeight(225),
    borderRadius: scaleWidth(20),
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(24),
    overflow: 'hidden',
  },
  imageContainer: {
    width: scaleWidth(300),
    height: scaleHeight(156),
    position: 'relative',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(24, 48, 42, 0.25)',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  dateLabel: {
    position: 'absolute',
    left: scaleWidth(21),
    top: scaleHeight(124),
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(22),
  },
  targetScoreContainer: {
    position: 'absolute',
    right: scaleWidth(21),
    top: scaleHeight(23),
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: scaleWidth(66),
    overflow: 'visible',
  },
  targetScore: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(36),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: scaleWidth(-0.9),
    textTransform: 'uppercase',
  },
  plus: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(36),
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: scaleWidth(-2.16),
    marginLeft: scaleWidth(2),
    textTransform: 'uppercase',
  },
  clubLabelContainer: {
    position: 'absolute',
    right: scaleWidth(12),
    top: scaleHeight(124),
    width: scaleWidth(102),
    height: scaleHeight(19),
    borderRadius: scaleWidth(20),
    backgroundColor: '#18302A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubLabel: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '500',
    letterSpacing: scaleWidth(-0.28),
  },
  detailsContainer: {
    flex: 1,
    paddingTop: scaleHeight(8),
    paddingRight: scaleWidth(21),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stakeRow: {
    position: 'absolute',
    left: scaleWidth(21),
    top: scaleHeight(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  returnRow: {
    position: 'absolute',
    left: scaleWidth(21),
    top: scaleHeight(39),
    flexDirection: 'row',
    alignItems: 'center',
  },
  stakeLabel: {
    color: '#768783',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '400',
    letterSpacing: scaleWidth(-0.28),
  },
  stakeValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '800',
    letterSpacing: scaleWidth(-0.28),
  },
  editIcon: {
    position: 'absolute',
    right: scaleWidth(21),
    top: scaleHeight(24),
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
}); 