import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Providers from './src/navigation';
import AuthStack from './src/navigation/AuthStack';

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreLogs(['Warning: sssssssssssssssssss']);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <Providers />
    </>
  );
};

export default App;
