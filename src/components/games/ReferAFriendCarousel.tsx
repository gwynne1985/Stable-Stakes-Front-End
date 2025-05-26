import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import Carousel from 'react-native-reanimated-carousel';
import { PrimaryButton } from '../PrimaryButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_WIDTH = scaleWidth(280);
const CARD_GAP = scaleWidth(15); // true gap between cards
const CAROUSEL_HEIGHT = scaleHeight(320);

// Types for carousel data
interface CardItem {
  key: string;
  image: any;
  title: string;
  description: React.ReactNode;
  spacer?: false;
}
interface SpacerItem {
  key: string;
  spacer: true;
}
type CarouselItem = CardItem | SpacerItem;

const styles = StyleSheet.create({
  carouselContainer: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT + scaleHeight(24),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  card: {
    height: CAROUSEL_HEIGHT,
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(20),
    overflow: 'hidden',
    alignSelf: 'center',
    // margin will be set inline
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: scaleHeight(160),
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: scaleHeight(60),
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: scaleWidth(20),
    borderBottomRightRadius: scaleWidth(20),
  },
  titleOverlay: {
    position: 'absolute',
    left: scaleWidth(12),
    top: scaleHeight(120),
    color: '#FFF',
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    padding: scaleWidth(16),
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    color: '#18302A',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
  },
  bold: {
    fontWeight: 'bold',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    gap: scaleWidth(8),
  },
  statsRow: {
    flexDirection: 'row',
    width: scaleWidth(300),
    paddingVertical: scaleHeight(11),
    paddingHorizontal: scaleWidth(3),
    alignItems: 'center',
    gap: scaleWidth(5),
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(20),
    marginTop: 40,
    alignSelf: 'center',
  },
  statsSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsLabel: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(8),
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: scaleHeight(2),
  },
  statsValue: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(18),
    fontStyle: 'italic',
    fontWeight: '800',
  },
  statsDivider: {
    width: scaleWidth(1),
    height: scaleHeight(28),
    backgroundColor: '#E3E3E3',
    borderRadius: scaleWidth(1),
    marginHorizontal: scaleWidth(5),
  },
  progressDot: {
    height: scaleHeight(6),
    borderRadius: scaleWidth(6),
  },
  progressDotActive: {
    width: scaleWidth(24),
    backgroundColor: '#18302A',
  },
  progressDotInactive: {
    width: scaleWidth(6),
    backgroundColor: '#18302A',
    opacity: 0.3,
  },
});

const CARDS = [
  {
    image: require('../../../assets/images/referafriend/refer-a-friend-1.png'),
    title: '1. SHARE YOUR CODE',
    description: (
      <>
        <Text style={styles.bold}>Send your unique referral link</Text> to your golf mates via WhatsApp, email, or social media—it's quick and easy!
      </>
    ),
  },
  {
    image: require('../../../assets/images/referafriend/refer-a-friend-2.png'),
    title: '2. FRIEND JOINS AND PLAYS',
    description: (
      <>
        Once your friend <Text style={styles.bold}>signs up and completes their first Stable Stakes game</Text>, your referral is complete.
      </>
    ),
  },
  {
    image: require('../../../assets/images/referafriend/refer-a-friend-3.png'),
    title: '3. GET REWARDED',
    description: (
      <>
        You'll <Text style={styles.bold}>receive £10</Text> in your wallet to use for future games. There's no limit—<Text style={styles.bold}>refer as many friends as you like!</Text>
      </>
    ),
  },
];

export const ReferAFriendCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  return (
    <View>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={PANEL_WIDTH + CARD_GAP}
          height={CAROUSEL_HEIGHT}
          data={CARDS}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  width: PANEL_WIDTH,
                  marginHorizontal: CARD_GAP / 2,
                },
              ]}
            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
                <View style={styles.imageOverlay} />
                <Text style={styles.titleOverlay}>{item.title}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
          onSnapToItem={setActiveIndex}
          style={{ width: SCREEN_WIDTH }}
          pagingEnabled
          autoFillData={false}
        />
        <View style={styles.progressContainer}>
          {CARDS.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.progressDot,
                idx === activeIndex ? styles.progressDotActive : styles.progressDotInactive,
              ]}
            />
          ))}
        </View>
      </View>
      {/* Lozenge stats row, 40px below the carousel container */}
      <View style={[styles.statsRow, { marginTop: 40 }]}> 
        <View style={styles.statsSection}>
          <Text style={styles.statsLabel}>Referrals Complete</Text>
          <Text style={styles.statsValue}>1</Text>
        </View>
        <View style={styles.statsDivider} />
        <View style={styles.statsSection}>
          <Text style={styles.statsLabel}>Pending Referrals</Text>
          <Text style={styles.statsValue}>2</Text>
        </View>
        <View style={styles.statsDivider} />
        <View style={styles.statsSection}>
          <Text style={styles.statsLabel}>Total Earned</Text>
          <Text style={styles.statsValue}>£10</Text>
        </View>
      </View>
      <PrimaryButton
        title="Share Link"
        onPress={() => {}}
        isActive={true}
        style={{ marginTop: 60, alignSelf: 'center' }}
      />
    </View>
  );
}; 