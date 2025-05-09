import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';
import { InfoBottomSheet } from '../InfoBottomSheet';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../../navigation';

interface StakeEntryStepProps {
  targetScore: 34 | 37 | 40;
  walletBalance: number;
  selectedStake: number | null;
  setSelectedStake: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  game: any;
  potentialReturn: number;
}

const stakeOptions = [10, 20, 50];
const multipliers = { 34: 2, 37: 5, 40: 7 } as const;

type NavigationProp = BottomTabNavigationProp<TabParamList>;

export const StakeEntryStep: React.FC<StakeEntryStepProps> = ({
  targetScore,
  walletBalance,
  selectedStake,
  setSelectedStake,
  onBack,
  onNext,
  onClose,
  game,
  potentialReturn,
}) => {
  const multiplier = multipliers[targetScore];
  const [infoVisible, setInfoVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  // Calculate potential return based on selected stake
  const calculatedPotentialReturn = selectedStake ? selectedStake * multiplier : 0;

  // Highlight color for the plus and border
  const highlightColor =
    targetScore === 34 ? '#4EDDA9' : targetScore === 37 ? '#4EDD69' : '#93DD4E';

  return (
    <View style={styles.container}>
      {/* Stake options vertically stacked */}
      <View style={styles.stakeOptionsColumn}>
        {stakeOptions.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[styles.stakeOption, selectedStake === amount && styles.stakeOptionSelected]}
            onPress={() => setSelectedStake(amount)}
            activeOpacity={0.85}
          >
            <Text style={styles.stakeOptionText}>{`£${amount}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.walletInfoBox, { marginTop: scaleHeight(50) }]}>
        <View style={styles.potentialLeft}>
          <Text style={styles.infoLabel}>Potential Return</Text>
          <Text style={styles.infoValue}>£{calculatedPotentialReturn}</Text>
        </View>
        <TouchableOpacity
          style={styles.infoIconBtn}
          onPress={() => setInfoVisible(true)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Image
            source={require('../../../../assets/icons/info2.png')}
            style={styles.infoIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.walletInfoBox}>
        <View style={styles.walletLeft}>
          <Text style={styles.infoLabel}>Wallet Balance</Text>
          <Text style={styles.infoValue}>£{walletBalance.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.topUpLink}
          onPress={() => {
            onClose?.(); // Close the panel first
            navigation.navigate('WalletScreen');
          }}
        >
          <Text style={styles.topUpText}>Top Up</Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        title="Next"
        onPress={() => {
          // Always call onNext for debugging
          if (onNext) onNext();
        }}
        isActive={!!selectedStake}
        style={styles.nextButton}
      />
      <View style={styles.progressContainer}>
        {[...Array(2)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressIndicator,
              index === 0 ? styles.currentStep : styles.otherStep,
            ]}
          />
        ))}
      </View>
      <InfoBottomSheet
        isVisible={infoVisible}
        onClose={() => setInfoVisible(false)}
        title="POTENTIAL RETURN"
        content={
          "Most of the time, the prize amount shown is what you'll receive if you hit the target score, but if a lot of players win on the same day, payouts may be adjusted down by around 10-20% to cover costs and keep improving the app."
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  stakeOptionsColumn: {
    width: scaleWidth(300),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scaleWidth(10),
    marginTop: scaleHeight(-25),
  },
  stakeOption: {
    flex: 1,
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(100),
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    backgroundColor: '#FFF',
    marginBottom: 0,
  },
  stakeOptionSelected: {
    backgroundColor: '#4EDD69',
    borderColor: '#4EDD69',
  },
  stakeOptionText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: scaleWidth(300),
    backgroundColor: '#E3E3E3',
    borderRadius: scaleWidth(20),
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(10),
    paddingLeft: scaleWidth(28),
    paddingRight: scaleWidth(46),
    gap: 0,
    marginBottom: scaleHeight(16),
    flexWrap: 'nowrap',
    position: 'relative',
  },
  infoLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.39,
    textAlign: 'left',
    marginBottom: scaleHeight(2),
  },
  infoValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -0.3,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 0,
  },
  walletLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  walletRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
  },
  topUpLink: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: scaleWidth(8),
    alignSelf: 'stretch',
  },
  topUpText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.39,
    textAlign: 'right',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  nextButton: {
    width: scaleWidth(300),
    marginTop: scaleHeight(88),
  },
  progressContainer: {
    position: 'absolute',
    top: scaleHeight(693),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(8),
  },
  progressIndicator: {
    height: 5.364,
    borderRadius: 10,
    backgroundColor: '#18302A',
  },
  currentStep: {
    width: 24.136,
  },
  otherStep: {
    width: 5.364,
  },
  infoIconBtn: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
  walletInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: scaleWidth(300),
    backgroundColor: '#E3E3E3',
    borderRadius: scaleWidth(20),
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(10),
    paddingLeft: scaleWidth(28),
    paddingRight: scaleWidth(46),
    gap: 0,
    marginBottom: scaleHeight(16),
    flexWrap: 'nowrap',
    position: 'relative',
  },
  potentialLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}); 