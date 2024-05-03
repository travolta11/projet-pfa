import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNav from './BottomNav';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Map from "./Map";
import Monument from "./Monument";
import MonumentDetails from "./MonumentDetails";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
  
      <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="APP" options={{headerShown: false}} component={BottomNav} />
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
/*<Stack.Navigator>
          <Stack.Screen name="MonumentDetails" component={MonumentDetails} />
        </Stack.Navigator> */