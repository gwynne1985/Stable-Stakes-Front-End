import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import AccountPanel from './AccountPanel';
import ContactStep from './accountsteps/ContactStep';
import YourClubStep from './accountsteps/YourClubStep';
import ManageCardsStep from './accountsteps/ManageCardsStep';
import TransactionHistoryStep from './accountsteps/TransactionHistoryStep';
import RefundDepositStep from './accountsteps/RefundDepositStep';
import CommunicationsStep from './accountsteps/CommunicationsStep';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Step = 'account' | 'contact' | 'yourClub' | 'manageCards' | 'transactionHistory' | 'refundDeposit' | 'communications';

const AccountPanelStack = forwardRef<{ goBack: () => void; canGoBack: () => boolean }, { setTitle: (title: string) => void }>(
  ({ setTitle }, ref) => {
    const [step, setStep] = useState<Step>('account');
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (step === 'account') setTitle('Account');
      else if (step === 'contact') setTitle('Contact Details');
      else if (step === 'yourClub') setTitle('Your Club');
      else if (step === 'manageCards') setTitle('Manage Cards');
      else if (step === 'transactionHistory') setTitle('Transaction History');
      else if (step === 'refundDeposit') setTitle('Refund Deposit');
      else if (step === 'communications') setTitle('Communications');
    }, [step, setTitle]);

    const goToContact = () => {
      setStep('contact');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToYourClub = () => {
      setStep('yourClub');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToManageCards = () => {
      setStep('manageCards');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToTransactionHistory = () => {
      setStep('transactionHistory');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToRefundDeposit = () => {
      setStep('refundDeposit');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToCommunications = () => {
      setStep('communications');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goBack = () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setStep('account'));
    };

    const canGoBack = () => step !== 'account';

    useImperativeHandle(ref, () => ({
      goBack,
      canGoBack,
    }));

    let panels;
    let width = SCREEN_WIDTH;
    let translateX = slideAnim;

    if (step === 'account') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onYourClub={goToYourClub}
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
        />
      ];
      width = SCREEN_WIDTH;
      slideAnim.setValue(0);
    } else if (step === 'contact') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onYourClub={goToYourClub}
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
        />,
        <ContactStep key="contact" onClose={goBack} />,
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'yourClub') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onYourClub={goToYourClub}
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
        />,
        <YourClubStep key="yourClub" onClose={goBack} />,
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'manageCards') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onYourClub={goToYourClub}
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
        />,
        <ManageCardsStep key="manageCards" onClose={goBack} />,
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'transactionHistory') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onYourClub={goToYourClub}
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
        />,
        <TransactionHistoryStep key="transactionHistory" onClose={goBack} />,
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'refundDeposit') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onYourClub={goToYourClub}
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
        />,
        <RefundDepositStep key="refundDeposit" onClose={goBack} />,
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'communications') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onYourClub={goToYourClub}
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
        />,
        <CommunicationsStep key="communications" onClose={goBack} />,
      ];
      width = SCREEN_WIDTH * 2;
    }

    return (
      <View style={styles.stackContainer}>
        <Animated.View
          style={{
            flexDirection: 'row',
            width,
            transform: [{ translateX }],
          }}
        >
          {panels}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  stackContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});

export default AccountPanelStack; 