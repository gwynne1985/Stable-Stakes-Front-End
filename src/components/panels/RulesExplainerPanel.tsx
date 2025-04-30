import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { ScrollablePanel } from './ScrollablePanel';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface RulesExplainerPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const RULES_CONTENT = [
  {
    title: "1. SELECT A GAME",
    description: "Choose from our selection of competitive games. Each game has its own rules and entry requirements.",
    image: require('../../../assets/images/rules/game-rules-1.png'),
  },
  {
    title: "2. ENTER YOUR DETAILS",
    description: "Provide your golf handicap and other required information to ensure fair competition.",
    image: require('../../../assets/images/rules/game-rules-2.png'),
  },
  {
    title: "3. MAKE YOUR PREDICTION",
    description: "Predict your score for the upcoming round. Be realistic - you'll need to match or beat this score!",
    image: require('../../../assets/images/rules/game-rules-3.png'),
  },
  {
    title: "4. PAY ENTRY FEE",
    description: "Pay the entry fee using your preferred payment method. All transactions are secure and encrypted.",
    image: require('../../../assets/images/rules/game-rules-4.png'),
  },
  {
    title: "5. PLAY YOUR ROUND",
    description: "Play your round of golf as normal. Make sure to follow all standard golf rules and etiquette.",
    image: require('../../../assets/images/rules/game-rules-5.png'),
  },
  {
    title: "6. SUBMIT YOUR SCORE",
    description: "After your round, submit your scorecard for verification. If you beat your prediction, you win!",
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
          <Image
            source={rule.image}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{rule.title}</Text>
            <Text style={styles.description}>{rule.description}</Text>
          </View>
        </View>
      ))}
    </ScrollablePanel>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(20),
    marginBottom: scaleHeight(16),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: scaleHeight(180),
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  textContainer: {
    padding: scaleWidth(20),
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    color: '#18302A',
    marginBottom: scaleHeight(8),
    fontStyle: 'italic',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    color: '#18302A',
    lineHeight: scaleHeight(24),
  },
}); 