import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CookHomeScreen from './components/cookHomeScreen';
import CartHomeScreen from './components/cartHomeScreen';

import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default () => {
  const [loaded] = useFonts({
    WorkSansSemiBold: require('../assets/fonts/WorkSans-SemiBold.ttf'),
  });

  if (!loaded) return null;

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <Stack.Navigator screenOptions={{ headerBackTitle: '', title: '' }}>
        <Stack.Screen
          name="home"
          component={CookHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cart"
          component={CartHomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
