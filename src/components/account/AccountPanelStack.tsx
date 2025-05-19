import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import AccountPanel from './AccountPanel';
import ContactStep from './accountsteps/ContactStep';
import ManageCardsStep from './accountsteps/ManageCardsStep';
import TransactionHistoryStep from './accountsteps/TransactionHistoryStep';
import RefundDepositStep from './accountsteps/RefundDepositStep';
import CommunicationsStep from './accountsteps/CommunicationsStep';
import FAQStep from './accountsteps/FAQStep';
import ContactUsStep from './accountsteps/ContactUsStep';
import PrivacyPolicyStep from './accountsteps/PrivacyPolicyStep';
import TermsUseStep from './accountsteps/TermsUseStep';
import RedemptionTermsStep from './accountsteps/RedemptionTermsStep';
import { EditPanel } from './accountsteps/EditPanel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Step = 'account' | 'contact' | 'manageCards' | 'transactionHistory' | 'refundDeposit' | 'communications' | 'faq' | 'contactUs' | 'privacyPolicy' | 'termsUse' | 'redemptionTerms' | 'edit';

const AccountPanelStack = forwardRef<{ goBack: () => void; canGoBack: () => boolean }, { setTitle: (title: string) => void }>(
  ({ setTitle }, ref) => {
    const [step, setStep] = useState<Step>('account');
    const [userName, setUserName] = useState('Stuart Russell');
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (step === 'account') setTitle('Account');
      else if (step === 'contact') setTitle('Contact Details');
      else if (step === 'manageCards') setTitle('Manage Cards');
      else if (step === 'transactionHistory') setTitle('Transaction History');
      else if (step === 'refundDeposit') setTitle('Refund Deposit');
      else if (step === 'communications') setTitle('Communications');
      else if (step === 'faq') setTitle('FAQs');
      else if (step === 'contactUs') setTitle('Contact Us');
      else if (step === 'privacyPolicy') setTitle('Privacy Policy');
      else if (step === 'termsUse') setTitle('Terms of Use');
      else if (step === 'redemptionTerms') setTitle('Redemption Terms');
      // Don't change the title for edit panel
    }, [step, setTitle]);

    const goToContact = () => {
      setStep('contact');
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

    const goToFAQ = () => {
      setStep('faq');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToContactUs = () => {
      setStep('contactUs');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToPrivacyPolicy = () => {
      setStep('privacyPolicy');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToTermsUse = () => {
      setStep('termsUse');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToRedemptionTerms = () => {
      setStep('redemptionTerms');
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const goToEdit = () => {
      setStep('edit');
    };

    const goBack = () => {
      setStep('account');
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const canGoBack = () => {
      return step !== 'account';
    };

    const handleLogout = () => {
      // TODO: Implement logout logic
      // This should clear any auth tokens/storage and navigate to login
      // You'll need to implement the actual logout logic based on your auth setup
    };

    const handleSaveName = (newName: string) => {
      setUserName(newName);
    };

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
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />
      ];
      width = SCREEN_WIDTH;
      slideAnim.setValue(0);
    } else if (step === 'contact') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <ContactStep 
          key="contact" 
          onClose={goBack}
          initialName={userName}
          onSaveName={handleSaveName}
        />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'manageCards') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <ManageCardsStep key="manageCards" onClose={goBack} onAddPaymentMethod={function (): void {
          throw new Error('Function not implemented.');
        } } paymentMethods={[]} onSetDefault={function (id: string): void {
          throw new Error('Function not implemented.');
        } } onRemoveCard={function (id: string): void {
          throw new Error('Function not implemented.');
        } } />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'transactionHistory') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <TransactionHistoryStep 
          key="transactionHistory" 
          onClose={goBack}
          transactions={[]}
        />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'refundDeposit') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <RefundDepositStep key="refundDeposit" onClose={goBack} />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'communications') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <CommunicationsStep key="communications" onClose={goBack} />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'faq') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <FAQStep key="faq" onClose={goBack} />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'contactUs') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <ContactUsStep key="contactUs" onClose={goBack} />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'privacyPolicy') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <PrivacyPolicyStep key="privacyPolicy" onClose={goBack} />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'termsUse') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <TermsUseStep key="termsUse" onClose={goBack} />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'redemptionTerms') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <RedemptionTermsStep key="redemptionTerms" onClose={goBack} />
      ];
      width = SCREEN_WIDTH * 2;
    } else if (step === 'edit') {
      panels = [
        <AccountPanel 
          key="account" 
          onContactDetails={goToContact} 
          onManageCards={goToManageCards}
          onTransactionHistory={goToTransactionHistory}
          onRefundDeposit={goToRefundDeposit}
          onCommunications={goToCommunications}
          onFAQ={goToFAQ}
          onContactUs={goToContactUs}
          onPrivacyPolicy={goToPrivacyPolicy}
          onTermsUse={goToTermsUse}
          onRedemptionTerms={goToRedemptionTerms}
          onLogout={handleLogout}
          onEdit={goToEdit}
          userName={userName}
        />,
        <EditPanel 
          key="edit"
          onClose={goBack}
          initialName={userName}
          onSaveName={handleSaveName} isVisible={false} mode={'email'}        />
      ];
      width = SCREEN_WIDTH;
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