import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoadingScreen } from './screens/Loading';
import { LoginScreen } from './screens/Login';
import { TabNavigator } from './navigation/TabNavigator';
import { RootStackParamList } from './navigation';
import PasswordStrongTest from './components/registration/PasswordStrongTest';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainApp"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={TabNavigator} />
          <Stack.Screen name="PasswordStrongTest" component={PasswordStrongTest} />
          <Stack.Screen name="Registration" component={require('./screens/Registration').RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 