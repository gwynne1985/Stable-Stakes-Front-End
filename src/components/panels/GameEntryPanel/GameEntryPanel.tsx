import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { GameSummaryStep } from './GameSummaryStep';
import { StakeEntryStep } from './StakeEntryStep';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type GameEntryStep = 1 | 2 | 3;

interface GameEntryPanelProps {
  targetScore: 34 | 37 | 40;
  walletBalance: number;
  onClose: () => void;
}

// Placeholder for CompDateEntryStep
const CompDateEntryStep: React.FC<{ onBack: () => void; onNext: () => void }> = ({ onBack, onNext }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ height: scaleHeight(200), justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Text style={{ color: '#18302A', fontSize: scaleWidth(22), fontFamily: 'Poppins', fontWeight: '900', fontStyle: 'italic' }}>
        Comp Date Entry (placeholder)
      </Animated.Text>
    </View>
  </View>
);

export const GameEntryPanel: React.FC<GameEntryPanelProps> = ({ targetScore, walletBalance, onClose }) => {
  const [step, setStep] = useState<GameEntryStep>(1);
  const [selectedStake, setSelectedStake] = useState<number | null>(null);
  const slideX = useRef(new Animated.Value(0)).current;

  // Animate to next step
  const goToStep = (nextStep: GameEntryStep) => {
    setStep(nextStep);
  };

  // Only animate between StakeEntryStep and CompDateEntryStep
  if (step === 1) {
    return (
      <View style={styles.container}>
        <GameSummaryStep
          targetScore={targetScore}
          onNext={() => setStep(2)}
          onClose={onClose}
        />
      </View>
    );
  }

  // Fixed panel elements
  return (
    <View style={styles.container}>
      {/* Target Score, Close Button, Title, etc. should be here if needed */}
      {/* Animated content area for steps 2 and 3 */}
      <Animated.View style={[styles.animatedContent, { transform: [{ translateX: slideX }] }]}> 
        {step === 2 && (
          <StakeEntryStep
            targetScore={targetScore}
            walletBalance={walletBalance}
            selectedStake={selectedStake}
            setSelectedStake={setSelectedStake}
            onBack={() => goToStep(1)}
            onNext={() => goToStep(3)}
            game={null}
            potentialReturn={0}
          />
        )}
        {step === 3 && (
          <CompDateEntryStep
            onBack={() => goToStep(2)}
            onNext={() => {/* handle final next */}}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18302A',
  },
  animatedContent: {
    flex: 1,
  },
}); 