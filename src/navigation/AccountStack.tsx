import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountPanel } from '../components/account/AccountPanel';
import { ContactDetailsStep } from '../screens/account/steps/ContactDetailsStep';
import { YourClubStep } from '../screens/account/steps/YourClubStep';
import { ManageCardsStep } from '../screens/account/steps/ManageCardsStep';
import { TransactionHistoryStep } from '../screens/account/steps/TransactionHistoryStep';
import { RefundDepositStep } from '../screens/account/steps/RefundDepositStep';

export type AccountStackParamList = {
  AccountPanel: undefined;
  ContactDetailsStep: undefined;
  YourClubStep: undefined;
  ManageCardsStep: undefined;
  TransactionHistoryStep: undefined;
  RefundDepositStep: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

export const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AccountPanel" component={AccountPanel} />
      <Stack.Screen name="ContactDetailsStep" component={ContactDetailsStep} />
      <Stack.Screen name="YourClubStep" component={YourClubStep} />
      <Stack.Screen name="ManageCardsStep" component={ManageCardsStep} />
      <Stack.Screen name="TransactionHistoryStep" component={TransactionHistoryStep} />
      <Stack.Screen name="RefundDepositStep" component={RefundDepositStep} />
    </Stack.Navigator>
  );
}; 