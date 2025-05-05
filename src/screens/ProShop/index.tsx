import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PageContainer } from '../../components/PageContainer';
import { AvailableToSpend } from '../../components/proshop/AvailableToSpend';
import { SupportYourClub } from '../../components/proshop/SupportYourClub';
import { RetailersGrid } from '../../components/proshop/RetailersGrid';
import { RetailerRedemptionPanel } from '../../components/panels/RetailerRedemptionPanel';
import { ClubRedemptionPanel } from '../../components/panels/ClubRedemptionPanel';
import { scaleWidth, scaleHeight } from '../../utils/scale';

export const ProShopScreen = () => {
  const [selectedRetailer, setSelectedRetailer] = useState<{
    name: string;
    image: any;
  } | null>(null);
  const [isClubRedemptionVisible, setIsClubRedemptionVisible] = useState(false);
  const [isClubInfoVisible, setIsClubInfoVisible] = useState(false);

  const handleRetailerSelect = (retailer: { name: string; image: any }) => {
    console.log('Retailer selected:', retailer.name);
    setSelectedRetailer(retailer);
  };

  const handleCloseRedemption = () => {
    console.log('Closing redemption panel');
    setSelectedRetailer(null);
    setIsClubRedemptionVisible(false);
  };

  const handleVoucherConfirm = (amount: number, onConfirm: () => void) => {
    console.log('handleVoucherConfirm called:', {
      amount,
      retailerName: selectedRetailer?.name,
      hasOnConfirm: !!onConfirm
    });
    
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleInfoIconPress = () => {
    setIsClubInfoVisible(true);
  };

  const handleVoucherPress = () => {
    setIsClubRedemptionVisible(true);
  };

  return (
    <>
      <View style={styles.root}>
        <PageContainer title="Pro Shop" variant="light" notificationCount={2}>
          <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topContainer}>
              <AvailableToSpend amount={888.00} />
              <View style={styles.spacer} />
              <SupportYourClub 
                onInfoPress={handleInfoIconPress}
                onVoucherPress={handleVoucherPress}
              />
              <View style={styles.spacer30} />
              <Text style={styles.otherRetailersTitle}>OTHER RETAILERS</Text>
              <View style={styles.spacer} />
              <RetailersGrid onRetailerSelect={handleRetailerSelect} />
              <View style={styles.bottomSpacer} />
            </View>
          </ScrollView>
        </PageContainer>
      </View>

      <RetailerRedemptionPanel
        isVisible={!!selectedRetailer}
        retailerLogo={selectedRetailer?.image}
        clubName={selectedRetailer?.name || ''}
        descriptionText="Select your voucher amount below. Once confirmed, your voucher will be sent to your registered email address."
        voucherRangeText="Voucher Amount: £20 - £500"
        termsContent={`Terms and conditions for ${selectedRetailer?.name || ''} vouchers:\n\n1. Vouchers are valid for 12 months from the date of issue\n2. Cannot be exchanged for cash\n3. Must be redeemed in a single transaction\n4. Any remaining balance will be forfeited`}
        minAmount={20}
        maxAmount={500}
        remainingBalance={888.00}
        onClose={handleCloseRedemption}
        onVoucherConfirm={handleVoucherConfirm}
      />

      <RetailerRedemptionPanel
        isVisible={isClubRedemptionVisible}
        clubName="Golf Club Name"
        descriptionText="Select your voucher amount below. Once confirmed, your voucher will be sent to your registered email address."
        voucherRangeText="Voucher Amount: £20 - £500"
        termsContent="Terms and conditions for club pro shop vouchers:\n\n1. Vouchers are valid for 12 months from the date of issue\n2. Cannot be exchanged for cash\n3. Must be redeemed in a single transaction\n4. Any remaining balance will be forfeited"
        minAmount={20}
        maxAmount={500}
        remainingBalance={888.00}
        onClose={handleCloseRedemption}
        onVoucherConfirm={handleVoucherConfirm}
      />

      <ClubRedemptionPanel
        isVisible={isClubInfoVisible}
        onClose={() => setIsClubInfoVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
  },
  scrollContent: {
    flexGrow: 1,
  },
  topContainer: {
    paddingTop: scaleHeight(20),
    alignItems: 'center',
  },
  spacer: {
    height: scaleHeight(20),
  },
  spacer30: {
    height: scaleHeight(30),
  },
  bottomSpacer: {
    height: scaleHeight(40),
  },
  otherRetailersTitle: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(22),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: undefined,
    letterSpacing: -0.22,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    paddingLeft: scaleWidth(27),
  },
}); 