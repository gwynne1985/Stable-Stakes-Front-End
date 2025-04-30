import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen } from './src/screens/Loading';
import { LoginScreen } from './src/screens/Login';
import { GamesScreen } from './src/screens/Games';
import { RegistrationScreen } from './src/screens/Registration';
import { loadFonts } from './src/utils/loadFonts';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { RootStackParamList } from './src/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await loadFonts();
        // Wait 500ms before showing content
        await new Promise(resolve => setTimeout(resolve, 500));
        setAppReady(true);
      } catch (e) {
        console.warn('Error in preparation:', e);
      }
    }
    prepare();
  }, []);

  return (
    <ImageBackground
      source={require('./assets/images/golf-course.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {appReady ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'none',
              contentStyle: {
                backgroundColor: 'transparent',
              },
              presentation: 'transparentModal',
            }}
          >
            <Stack.Screen 
              name="Loading" 
              component={LoadingScreen}
              options={{
                contentStyle: {
                  backgroundColor: 'transparent',
                }
              }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                contentStyle: {
                  backgroundColor: 'transparent',
                }
              }}
            />
            <Stack.Screen 
              name="Games" 
              component={GamesScreen}
              options={{
                contentStyle: {
                  backgroundColor: 'transparent',
                }
              }}
            />
            <Stack.Screen 
              name="Registration" 
              component={RegistrationScreen}
              options={{
                contentStyle: {
                  backgroundColor: 'transparent',
                },
                presentation: 'transparentModal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View style={styles.container} />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
}); 