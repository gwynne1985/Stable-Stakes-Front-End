import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  GamesScreen: undefined;
  WalletScreen: undefined;
  MyGamesScreen: undefined;
  ProShopScreen: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  MainApp: NavigatorScreenParams<TabParamList>;
  Registration: undefined;
}; 