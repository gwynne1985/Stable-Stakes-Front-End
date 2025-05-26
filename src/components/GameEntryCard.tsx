import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';
import { ScoreSubmissionPanel } from './games/scoresubmission';
import { GameEntrySlidingPanel } from './panels/GameEntrySlidingPanel';
import { GameEntryConfirmationPopup } from './panels/GameEntryConfirmationPopup';
import { toISODate } from '../utils/date';

interface GameEntryCardProps {
  image: ImageSourcePropType;
  targetScore: 34 | 37 | 40;
  plusColor: string;
  date: string;
  club: string;
  stake: number | string;
  potentialReturn: number;
  onEdit?: () => void;
  walletBalance?: number;
}

export const GameEntryCard: React.FC<GameEntryCardProps> = ({
  image,
  targetScore,
  plusColor,
  date,
  club,
  stake,
  potentialReturn,
  onEdit,
  walletBalance = 0,
}) => {
  const [showScorePanel, setShowScorePanel] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showEditStartPopup, setShowEditStartPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showGameUpdate, setShowGameUpdate] = useState(false);

  // Parse stake value from string (remove £ and convert to number)
  const parsedStake = React.useMemo(() => {
    if (typeof stake === 'string') {
      const numericValue = parseFloat(stake.replace(/[^0-9.-]+/g, ''));
      return isNaN(numericValue) ? 0 : numericValue;
    }
    return stake || 0;
  }, [stake]);

  // DEBUG: Log stake and parsedStake for troubleshooting
  React.useEffect(() => {
    console.log('[GameEntryCard] targetScore:', targetScore, 'stake:', stake, 'parsedStake:', parsedStake);
  }, [targetScore, stake, parsedStake]);

  const handleEdit = () => {
    setShowEditStartPopup(true);
  };

  const handleEditConfirm = () => {
    setShowEditStartPopup(false);
    setShowEditPanel(true);
  };

  const handleEditCancel = () => {
    setShowEditStartPopup(false);
  };

  // Called when user confirms in the sliding panel's confirmation popup
  const handlePanelConfirm = () => {
    setShowEditPanel(false);
    setShowGameUpdate(true);
  };

  // Called when user closes the GAME UPDATE message
  const handleGameUpdateClose = () => {
    setShowGameUpdate(false);
  };

  // Handler for confirming in the confirmation popup
  const handleConfirm = () => {
    setShowConfirmation(false);
    setTimeout(() => {
      setShowGameUpdate(true);
    }, 350); // allow popup to close before showing GAME UPDATE
  };

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
          <Text style={styles.stakeValue}>£{potentialReturn}</Text>
        </View>
        {/* Edit Button */}
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEdit}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image 
            source={require('../../assets/icons/edit.png')} 
            style={styles.editIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Edit Start Popup (Edit/Cancel) */}
      <GameEntryConfirmationPopup
        isVisible={showEditStartPopup}
        clubName={club}
        requiredScore={targetScore}
        stake={parsedStake}
        compDate={date}
        potentialReturn={potentialReturn}
        onBack={handleEditCancel}
        onConfirm={handleEditConfirm}
        onClose={handleEditCancel}
        isEditMode={true}
        onCancel={handleEditCancel}
        disableInternalAnimation={true}
      />
      {/* Game Entry Sliding Panel */}
      {showEditPanel && (
        <GameEntrySlidingPanel
          isVisible={true}
          onClose={() => setShowEditPanel(false)}
          targetScore={targetScore}
          walletBalance={walletBalance}
          initialStake={parsedStake}
          initialDate={toISODate(date)}
          onConfirm={() => {
            setShowEditPanel(false);
            setTimeout(() => {
              setShowGameUpdate(true);
            }, 350);
          }}
          isEditMode={true}
        />
      )}
      {/* Confirmation Popup (normal, with Back/Confirm) */}
      {showConfirmation && (
        <GameEntryConfirmationPopup
          isVisible={showConfirmation}
          clubName={"Your Golf Club"}
          requiredScore={targetScore}
          stake={parsedStake}
          compDate={toISODate(date)}
          potentialReturn={parsedStake ? parsedStake * (targetScore === 34 ? 2 : targetScore === 37 ? 5 : 7) : 0}
          onBack={() => setShowConfirmation(false)}
          onConfirm={handleConfirm}
          onClose={() => setShowConfirmation(false)}
        />
      )}
      {/* GAME UPDATE message/modal */}
      {showGameUpdate && (
        <GameEntryConfirmationPopup
          isVisible={showGameUpdate}
          clubName={"Your Golf Club"}
          requiredScore={targetScore}
          stake={parsedStake}
          compDate={toISODate(date)}
          potentialReturn={parsedStake ? parsedStake * (targetScore === 34 ? 2 : targetScore === 37 ? 5 : 7) : 0}
          onBack={() => setShowGameUpdate(false)}
          onConfirm={() => setShowGameUpdate(false)}
          onClose={() => setShowGameUpdate(false)}
          isEditMode={true}
          showOnlyGameUpdate={true}
        />
      )}
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
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    letterSpacing: scaleWidth(-0.28),
  },
  editButton: {
    position: 'absolute',
    bottom: scaleHeight(22),
    right: scaleWidth(22),
    zIndex: 2,
    width: scaleWidth(24),
    height: scaleWidth(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
}); 