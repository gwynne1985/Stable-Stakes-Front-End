import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ImageSourcePropType } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface GameInfoPanelProps {
  score: number;
  label: string;
  winnings: string;
  subtitle: string;
  highlightColor: string;
  isPopular?: boolean;
  variant?: 'default' | 'bordered';
  backgroundImage?: ImageSourcePropType;
}

export const GameInfoPanel: React.FC<GameInfoPanelProps> = ({
  score,
  label,
  winnings,
  subtitle,
  highlightColor,
  isPopular,
  variant = 'default',
  backgroundImage,
}) => {
  const innerContainerStyle = [
    styles.innerContainer,
    variant === 'bordered' && {
      borderWidth: 2,
      borderColor: highlightColor,
      backgroundColor: '#18302A',
    },
  ];
  const content = (
    <View style={innerContainerStyle}>
      {isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreWrapper}>
              <Text style={styles.scoreNumber}>{score}</Text>
            </View>
            <View style={styles.plusContainer}>
              <Text style={[styles.scorePlus, { color: highlightColor }]}>+</Text>
            </View>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={[styles.winUpTo, { color: highlightColor }]}>WIN UP TO</Text>
          <Text style={styles.winnings}>£{winnings}</Text>
        </View>
      </View>
    </View>
  );
  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={variant === 'bordered' ? styles.innerContainer : styles.outerContainer}
        imageStyle={styles.imageBg}
        resizeMode="cover"
      >
        {content}
      </ImageBackground>
    );
  }
  if (variant === 'bordered') {
    return content;
  }
  return (
    <View style={[styles.outerContainer, { backgroundColor: highlightColor, borderColor: highlightColor }] }>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: scaleWidth(300),
    height: scaleHeight(170),
    borderRadius: scaleWidth(20),
    marginBottom: scaleHeight(16),
    borderWidth: 2,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  innerContainer: {
    width: scaleWidth(300),
    height: scaleHeight(164),
    backgroundColor: '#18302A',
    borderRadius: scaleWidth(20),
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  imageBg: {
    width: '100%',
    height: '100%',
    borderRadius: scaleWidth(20),
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: scaleWidth(24),
    paddingRight: scaleWidth(24),
    paddingTop: scaleHeight(12),
  },
  leftContent: {
    flex: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: scaleWidth(160),
    marginBottom: scaleHeight(-35),
    marginTop: scaleHeight(3),
  },
  scoreWrapper: {
    minWidth: scaleWidth(80),
    marginRight: scaleWidth(2),
  },
  plusContainer: {
    marginLeft: scaleWidth(2),
  },
  subtitleContainer: {
    width: scaleWidth(160),
    marginTop: scaleHeight(22),
  },
  scoreNumber: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(60 * 1.2),
    color: '#FFFFFF',
    lineHeight: scaleHeight(96),
    letterSpacing: -2,
    includeFontPadding: false,
    textAlign: 'left',
  },
  scorePlus: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: scaleWidth(67 * 1.2),
    lineHeight: scaleHeight(86),
    letterSpacing: -2,
    includeFontPadding: false,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: scaleWidth(19 * 1.3),
    color: '#FFFFFF',
  },
  rightContent: {
    alignItems: 'flex-end',
    minWidth: scaleWidth(100),
    marginTop: scaleHeight(22),
  },
  winUpTo: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: scaleWidth(14),
    opacity: 0.8,
    marginBottom: scaleHeight(2),
  },
  winnings: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: scaleWidth(32),
    color: '#FFFFFF',
    lineHeight: scaleHeight(38),
    letterSpacing: -1,
  },
  popularBadge: {
    position: 'absolute',
    top: -scaleHeight(12),
    right: scaleWidth(24),
    backgroundColor: '#FF4D4D',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(12),
  },
  popularText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: scaleWidth(12),
    color: '#FFFFFF',
  },
}); 