import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollablePanel } from './ScrollablePanel';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface ClubRedemptionPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const CLUB_REDEMPTION_CONTENT = [
  {
    title: '1. EARN YOUR REWARDS',
    description: "Play in your club's Stableford comp, hit your target score, and win rewards! Your winnings go straight into your Stable Stakes wallet, ready to be redeemed.",
    image: require('../../../assets/images/redemption/redemption-1.png'),
  },
  {
    title: '2. CHOOSE YOUR AMOUNT',
    description: 'Head to the "Pro Shop" section in the app, select your club, and choose the amount you want to redeem.',
    image: require('../../../assets/images/redemption/redemption-2.png'),
  },
  {
    title: '3. GET YOUR PRO SHOP VOUCHER',
    description: "We'll email you a unique voucher code within 24 hours. Simply show it at your club's pro shop and use it towards new gear, lessons, or anything else they offer!",
    image: require('../../../assets/images/redemption/redemption-3.png'),
  },
];

export const ClubRedemptionPanel: React.FC<ClubRedemptionPanelProps> = ({ isVisible, onClose }) => {
  return (
    <ScrollablePanel
      isVisible={isVisible}
      title="CLUB REDEMPTION"
      onClose={onClose}
    >
      {CLUB_REDEMPTION_CONTENT.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.10)", "rgba(0,0,0,0.55)"]}
              style={styles.imageOverlay}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            <Text style={styles.titleOverlay}>{item.title}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </ScrollablePanel>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scaleWidth(300),
    height: scaleHeight(319),
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(20),
    marginBottom: scaleHeight(16),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: scaleHeight(180),
  },
  image: {
    width: '100%',
    height: scaleHeight(180),
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: scaleHeight(90),
  },
  textContainer: {
    padding: scaleWidth(20),
  },
  titleOverlay: {
    position: 'absolute',
    left: scaleWidth(12),
    top: scaleHeight(137),
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    color: '#18302A',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
  },
}); 