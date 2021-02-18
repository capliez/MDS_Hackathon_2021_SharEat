import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import Store from './redux/store';
const AppControlFlow = () => {
  //Cacher les warnings
  console.disableYellowBox = true;
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default AppControlFlow;
