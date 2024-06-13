import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SplashNavigation} from './Src/Navigation/NavigationHandler';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './Src/Screens/SplashScreen';
import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:'910507929298-vvkde5e56a8ljlcnr7j8dvdhrsm4q2ff.apps.googleusercontent.com',
    });
  }, []);

  return (
    <NavigationContainer>
      <SplashNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
