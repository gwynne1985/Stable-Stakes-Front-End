import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen } from './src/screens/Loading';
import { LoginScreen } from './src/screens/Login';
import { GamesScreen } from './src/screens/Games';
import { loadFonts } from './src/utils/loadFonts';
import { View } from 'react-native';
import { RootStackParamList } from './src/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn('Error loading fonts:', e);
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#1E1E1E' }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 