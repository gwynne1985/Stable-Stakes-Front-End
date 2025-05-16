import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';
import AddCardStep from './AddCardStep';
import { SimpleSlidingPanel } from '../../panels/SimpleSlidingPanel';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'applepay' | 'googlepay';
  name: string;
  last4: string;
  cardholder: string;
  expires: string;
  isDefault: boolean;
}

interface ManageCardsStepProps {
  onClose: () => void;
  onAddPaymentMethod: () => void;
  paymentMethods: PaymentMethod[];
  onSetDefault: (id: string) => void;
  onRemoveCard: (id: string) => void;
}

// Demo data - will be replaced by actual Stripe data
const demoCardData: PaymentMethod[] = [
  {
    id: '1',
    type: 'visa',
    name: 'My Card',
    last4: '1234',
    cardholder: 'Mr Joe Bloggs',
    expires: '12/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    name: 'Work Card',
    last4: '5678',
    cardholder: 'Mr Joe Bloggs',
    expires: '11/26',
    isDefault: false,
  },
];

const walletData = [
  {
    id: '1',
    type: 'applepay',
    label: 'Apple Pay',
    isDefault: false,
  },
  {
    id: '2',
    type: 'googlepay',
    label: 'Google Pay',
    isDefault: true,
  },
];

const cardImages: { [key: string]: any } = {
  visa: require('../../../../assets/images/wallet/visa.png'),
  mastercard: require('../../../../assets/images/wallet/mastercard.png'),
  applepay: require('../../../../assets/images/wallet/applepay.png'),
  googlepay: require('../../../../assets/images/wallet/googlepay.png'),
};

const ManageCardsStep: React.FC<ManageCardsStepProps> = ({
  onClose,
  onAddPaymentMethod,
  paymentMethods = demoCardData,
  onSetDefault,
  onRemoveCard,
}) => {
  const [panelVisible, setPanelVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const handleAddCard = () => {
    setPanelVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseAddCard = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPanelVisible(false);
    });
  };

  const handleSubmitCard = (cardData: any) => {
    // Handle the new card data here
    console.log('New card data:', cardData);
    handleCloseAddCard();
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { alignItems: 'center' }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {paymentMethods.map(card => (
            <View key={card.id} style={styles.cardPanel}>
              <View style={styles.cardRowTop}>
                <Image source={cardImages[card.type]} style={styles.cardImage} />
                <Text style={styles.cardName}>{card.name}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Ending in:</Text>
                <Text style={styles.cardValue}>{card.last4}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Name on Card:</Text>
                <Text style={styles.cardValue}>{card.cardholder}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Expires:</Text>
                <Text style={styles.cardValue}>{card.expires}</Text>
              </View>
              <View style={styles.cardBottomRow}>
                {card.isDefault ? (
                  <Text style={styles.defaultText}>Default</Text>
                ) : (
                  <View style={styles.bottomActions}>
                    <TouchableOpacity onPress={() => onSetDefault(card.id)}>
                      <Text style={styles.underlineText}>Use as Default</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onRemoveCard(card.id)}>
                      <Text style={styles.underlineText}>Remove Card</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
          {walletData.map(wallet => (
            <View key={wallet.id} style={styles.walletPanel}>
              <Image source={cardImages[wallet.type]} style={styles.cardImage} />
              <Text style={styles.walletLabel}>{wallet.label}</Text>
              {wallet.isDefault ? (
                <Text style={styles.defaultText}>Default</Text>
              ) : (
                <TouchableOpacity onPress={() => onSetDefault(wallet.id)}>
                  <Text style={styles.underlineText}>Use as Default</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <PrimaryButton
            title="Add Payment Method"
            onPress={handleAddCard}
            style={styles.addButton}
            isActive={true}
          />
        </View>
      </ScrollView>

      {/* Sliding Add Card Panel */}
      {panelVisible && (
        <Animated.View
          style={[
            styles.addCardContainer,
            {
              backgroundColor: 'transparent',
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                  }),
                },
              ],
            },
          ]}
          pointerEvents={'auto'}
        >
          <SimpleSlidingPanel
            isVisible={panelVisible}
            onClose={handleCloseAddCard}
            title="Add Card"
          >
            <AddCardStep
              onClose={handleCloseAddCard}
              onSubmit={handleSubmitCard}
            />
          </SimpleSlidingPanel>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: scaleHeight(40),
  },
  contentContainer: {
    width: scaleWidth(300),
    alignSelf: 'center',
  },
  cardPanel: {
    width: scaleWidth(300),
    height: scaleHeight(166),
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(20),
    padding: scaleWidth(16),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  cardRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(8),
    justifyContent: 'space-between',
    width: '100%',
  },
  cardImage: {
    width: scaleWidth(42),
    height: scaleHeight(24),
    resizeMode: 'contain',
    flexShrink: 0,
  },
  cardName: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    letterSpacing: -0.28,
    textAlign: 'right',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(2),
  },
  cardLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.28,
  },
  cardValue: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.28,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(8),
    minHeight: scaleHeight(20),
  },
  defaultText: {
    color: '#317143',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(11),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.28,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  underlineText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(11),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.28,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    marginRight: scaleWidth(16),
  },
  walletPanel: {
    width: scaleWidth(300),
    height: scaleHeight(55),
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(16),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(16),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  walletLabel: {
    flex: 1,
    textAlign: 'center',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.28,
  },
  addButton: {
    marginTop: scaleHeight(24),
    width: scaleWidth(300),
    alignSelf: 'center',
  },
  addCardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E3E3E3',
    zIndex: 1000,
  },
});

export default ManageCardsStep; 