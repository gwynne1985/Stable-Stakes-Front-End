import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text } from 'react-native';
import { TabParamList } from './index';
import { GamesScreen } from '../screens/Games';
import { WalletScreen } from '../screens/Wallet';
import { MyGamesScreen } from '../screens/MyGames';
import { ProShopScreen } from '../screens/ProShop';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 85,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          paddingHorizontal: '4%',
          zIndex: 1,
          elevation: 1,
        },
        tabBarItemStyle: {
          paddingTop: 18,
          paddingHorizontal: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 10,
          marginTop: 14,
        },
        tabBarActiveTintColor: '#18302A',
        tabBarInactiveTintColor: '#768783',
      }}
    >
      <Tab.Screen 
        name="GamesScreen" 
        component={GamesScreen} 
        options={{
          title: 'Games',
          tabBarIcon: ({ focused }: { focused: boolean; color: string; size: number }) => (
            <Image
              source={focused 
                ? require('../../assets/icons/navigation/flag-navactive.png')
                : require('../../assets/icons/navigation/flag-nav.png')
              }
              style={styles.gameIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="WalletScreen" 
        component={WalletScreen} 
        options={{
          title: 'Wallet',
          tabBarIcon: ({ focused }: { focused: boolean; color: string; size: number }) => (
            <Image
              source={focused 
                ? require('../../assets/icons/navigation/wallet-navactive.png')
                : require('../../assets/icons/navigation/wallet-nav.png')
              }
              style={styles.walletIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="MyGamesScreen" 
        component={MyGamesScreen} 
        options={{
          title: 'Your Games',
          tabBarIcon: ({ focused }: { focused: boolean; color: string; size: number }) => (
            <Image
              source={focused 
                ? require('../../assets/icons/navigation/yourgames-navactive.png')
                : require('../../assets/icons/navigation/yourgames-nav.png')
              }
              style={styles.myGamesIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="ProShopScreen" 
        component={ProShopScreen} 
        options={{
          title: 'Pro Shop',
          tabBarIcon: ({ focused }: { focused: boolean; color: string; size: number }) => (
            <Image
              source={focused 
                ? require('../../assets/icons/navigation/proshop-navactive.png')
                : require('../../assets/icons/navigation/proshop-nav.png')
              }
              style={styles.proShopIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: 24,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
    paddingTop: 50,
    paddingBottom: 20,
  },
  gameIcon: {
    width: 34,
    height: 29,
  },
  walletIcon: {
    width: 28,
    height: 24,
  },
  myGamesIcon: {
    width: 26,
    height: 24,
  },
  proShopIcon: {
    width: 28,
    height: 25,
  },
}); 