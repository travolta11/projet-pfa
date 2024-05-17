import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNav from './ButtomNav';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from './Pages/Login';
import SignUp from './Pages/SignUp';
import Map from "./Map";
import Monument from "./Monument";
import MonumentDetails from "./MonumentDetails";
import ButtomNav from "./ButtomNav"
import { useEffect } from 'react';
const Stack = createNativeStackNavigator();


export default function App() {

 
  return (
    
      <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginForm" options={{headerShown: false}} component={LoginForm} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
          <Stack.Screen name="ButtomNav" options={{headerShown: false}} component={ButtomNav} />
          <Stack.Screen name="Details"  options={{headerBackTitle: 'Back'}} component={MonumentDetails} />
        </Stack.Navigator>
      </NavigationContainer>
        </SafeAreaView> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
   
  },
});
