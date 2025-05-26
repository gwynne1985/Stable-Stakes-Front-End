import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollablePanel } from './ScrollablePanel';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface RulesExplainerPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const RULES_CONTENT = [
  {
    title: "1. CHOOSE A GAME",
    description: "Pick from three different games, each with its own target Stableford score and reward level. The higher the target score, the higher the potential reward.",
    image: require('../../../assets/images/rules/game-rules-1.png'),
  },
  {
    title: "2. PLACE YOUR STAKE",
    description: "Decide how much to stake: £10, £20, or £50. Higher stakes mean bigger potential winnings.",
    image: require('../../../assets/images/rules/game-rules-2.png'),
  },
  {
    title: "3. TELL US WHEN YOU'LL PLAY",
    description: "Enter the date of your competition round. Stakes must be placed by 11:59pm the day before your comp. You can enter multiple games for extra chances to win.",
    image: require('../../../assets/images/rules/game-rules-3.png'),
  },
  {
    title: "4. SUBMIT YOUR SCORE",
    description: "The day after your round, we'll prompt you to enter your Stableford score. If you hit or exceed your target, upload a screenshot of your official scorecard from IG app or How Did I Do.",
    image: require('../../../assets/images/rules/game-rules-4.png'),
  },
  {
    title: "5. WAIT FOR APPROVAL",
    description: "Scores are verified against your handicap and competition records. Once approved, winnings appear in your Stable Stakes wallet within 48 hours.",
    image: require('../../../assets/images/rules/game-rules-5.png'),
  },
  {
    title: "6. SPEND YOUR REWARDS",
    description: "Redeem your winnings for vouchers at your club's pro shop or partner golf retailers. Treat yourself to new gear, lessons, or equipment—because good golf pays off!",
    image: require('../../../assets/images/rules/game-rules-6.png'),
  },
];

export const RulesExplainerPanel: React.FC<RulesExplainerPanelProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <ScrollablePanel
      isVisible={isVisible}
      title="HOW IT WORKS"
      onClose={onClose}
    >
      {RULES_CONTENT.map((rule, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={rule.image}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.10)", "rgba(0,0,0,0.55)"]}
              style={styles.imageOverlay}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            <Text style={styles.titleOverlay}>{rule.title}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{rule.description}</Text>
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
  bold: {
    fontWeight: 'bold',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
  },
}); 