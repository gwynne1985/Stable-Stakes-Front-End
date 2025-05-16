import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

const TABS = ['All', 'Deposits', 'Stakes', 'Winnings', 'Pro Shop'];

// Demo data, easily swappable for real data
const demoTransactions = [
  { id: '1', date: '12/05/2024', type: 'Deposit', amount: 50.0 },
  { id: '2', date: '13/05/2024', type: 'Stake', amount: -10.0 },
  { id: '3', date: '14/05/2024', type: 'Winnings', amount: 25.0 },
  { id: '4', date: '15/05/2024', type: 'Pro Shop', amount: -15.0 },
  { id: '5', date: '16/05/2024', type: 'Deposit', amount: 100.0 },
  { id: '6', date: '17/05/2024', type: 'Stake', amount: -20.0 },
  { id: '7', date: '18/05/2024', type: 'Winnings', amount: 40.0 },
  { id: '8', date: '19/05/2024', type: 'Pro Shop', amount: -30.0 },
  { id: '9', date: '20/05/2024', type: 'Deposit', amount: 75.0 },
  { id: '10', date: '21/05/2024', type: 'Stake', amount: -12.5 },
  { id: '11', date: '22/05/2024', type: 'Winnings', amount: 18.0 },
  { id: '12', date: '23/05/2024', type: 'Pro Shop', amount: -22.0 },
  { id: '13', date: '24/05/2024', type: 'Deposit', amount: 60.0 },
  { id: '14', date: '25/05/2024', type: 'Stake', amount: -8.0 },
  { id: '15', date: '26/05/2024', type: 'Winnings', amount: 32.0 },
  { id: '16', date: '27/05/2024', type: 'Pro Shop', amount: -18.0 },
  { id: '17', date: '28/05/2024', type: 'Deposit', amount: 90.0 },
  { id: '18', date: '29/05/2024', type: 'Stake', amount: -25.0 },
  { id: '19', date: '30/05/2024', type: 'Winnings', amount: 50.0 },
  { id: '20', date: '31/05/2024', type: 'Pro Shop', amount: -40.0 },
];

const TAB_TYPE_MAP: { [key: string]: string | null } = {
  All: null,
  Deposits: 'Deposit',
  Stakes: 'Stake',
  Winnings: 'Winnings',
  'Pro Shop': 'Pro Shop',
};

const TransactionHistoryStep: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredTransactions =
    activeTab === 'All'
      ? demoTransactions
      : demoTransactions.filter((t) => t.type === TAB_TYPE_MAP[activeTab]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {filteredTransactions.map((tx, idx) => (
            <View key={tx.id}>
              <View style={styles.row}>
                <View style={styles.leftCol}>
                  <Text style={styles.date}>{tx.date}</Text>
                  <Text style={styles.type}>{tx.type}</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={styles.amount}>
                    {['Stake', 'Pro Shop'].includes(tx.type) && tx.amount > 0 ? '-' : ''}
                    {tx.amount > 0 ? '£' : '-£'}{Math.abs(tx.amount).toFixed(2)}
                  </Text>
                </View>
              </View>
              {idx < filteredTransactions.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
        <View style={{ height: scaleHeight(60) }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '900',
    textAlign: 'center',
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(10),
  },
  tabsContainer: {
    flexDirection: 'row',
    width: scaleWidth(300),
    alignSelf: 'center',
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
  },
  tab: {
    width: scaleWidth(60),
    paddingVertical: scaleHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#C6C6C6',
  },
  tabActive: {
    borderBottomColor: '#317143',
  },
  tabText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(11),
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  tabTextActive: {
    color: '#317143',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: scaleHeight(40),
  },
  listContainer: {
    width: scaleWidth(300),
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: scaleHeight(48),
    paddingVertical: scaleHeight(8),
  },
  leftCol: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightCol: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  date: {
    color: '#767676',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: scaleHeight(2),
  },
  type: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    textAlign: 'left',
  },
  amount: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  divider: {
    width: scaleWidth(300),
    height: 1,
    backgroundColor: '#18302A',
    alignSelf: 'center',
    opacity: 0.15,
  },
});

export default TransactionHistoryStep; 