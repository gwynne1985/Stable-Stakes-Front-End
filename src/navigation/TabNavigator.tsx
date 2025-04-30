import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { scaleWidth, scaleHeight } from '../utils/scale';
import { GamesScreen } from '../screens/Games';
import { WalletScreen } from '../screens/Wallet';
import { MyGamesScreen } from '../screens/MyGames';
import { ProShopScreen } from '../screens/ProShop';
import { TabParamList } from './index';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={
                  focused
                    ? require('../../assets/icons/navigation/games-active.png')
                    : require('../../assets/icons/navigation/games.png')
                }
                style={[styles.tabIcon, styles.gamesIcon]}
                resizeMode="contain"
              />
              <Text style={[
                styles.tabLabel,
                focused ? styles.activeLabel : styles.inactiveLabel,
                styles.gamesLabel
              ]}>
                Games
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={
                  focused
                    ? require('../../assets/icons/navigation/wallet-active.png')
                    : require('../../assets/icons/navigation/wallet.png')
                }
                style={[styles.tabIcon, styles.walletIcon]}
                resizeMode="contain"
              />
              <Text style={[
                styles.tabLabel,
                focused ? styles.activeLabel : styles.inactiveLabel,
                styles.walletLabel
              ]}>
                Wallet
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyGames"
        component={MyGamesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={
                  focused
                    ? require('../../assets/icons/navigation/mygames-active.png')
                    : require('../../assets/icons/navigation/mygames.png')
                }
                style={[styles.tabIcon, styles.myGamesIcon]}
                resizeMode="contain"
              />
              <Text style={[
                styles.tabLabel,
                focused ? styles.activeLabel : styles.inactiveLabel,
                styles.myGamesLabel
              ]}>
                My Games
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProShop"
        component={ProShopScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={
                  focused
                    ? require('../../assets/icons/navigation/proshop-active.png')
                    : require('../../assets/icons/navigation/proshop.png')
                }
                style={[styles.tabIcon, styles.proShopIcon]}
                resizeMode="contain"
              />
              <Text style={[
                styles.tabLabel,
                focused ? styles.activeLabel : styles.inactiveLabel,
                styles.proShopLabel
              ]}>
                Pro Shop
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: scaleWidth(360),
    height: scaleHeight(74),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabIcon: {
    resizeMode: 'contain',
  },
  gamesIcon: {
    width: scaleWidth(34),
    height: scaleHeight(29),
    marginTop: scaleHeight(9),
  },
  walletIcon: {
    width: scaleWidth(28),
    height: scaleHeight(24),
    marginTop: scaleHeight(12),
  },
  myGamesIcon: {
    width: scaleWidth(26),
    height: scaleHeight(24),
    marginTop: scaleHeight(12),
  },
  proShopIcon: {
    width: scaleWidth(28),
    height: scaleHeight(25),
    marginTop: scaleHeight(11),
  },
  tabLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: scaleWidth(10),
    marginTop: scaleHeight(2),
  },
  activeLabel: {
    color: '#18302A',
  },
  inactiveLabel: {
    color: '#768783',
  },
  gamesLabel: {
    marginLeft: scaleWidth(44),
  },
  walletLabel: {
    marginLeft: scaleWidth(110),
  },
  myGamesLabel: {
    marginLeft: scaleWidth(190),
  },
  proShopLabel: {
    marginLeft: scaleWidth(270),
  },
}); 