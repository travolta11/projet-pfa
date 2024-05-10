import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import Map from "./Map";
import Monument from "./Monument";
import MonumentDetails from "./MonumentDetails";
import Utilisateur from "./Utilisateur";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MonumentStack = () => {
  const navigation = useNavigation();

  const HeaderRightButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
      <Text style={{color:"red"}}>Deconnection</Text>
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Monument"
        component={Monument}
        options={{
          headerRight: HeaderRightButton,
        }}
      />
      <Stack.Screen name="MonumentDetails" component={MonumentDetails} />
    </Stack.Navigator>
  );
};

const MapStack = () => {
  const navigation = useNavigation();

  const HeaderRightButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
      <Text style={{color:"red"}}>Deconnection</Text>
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerRight: HeaderRightButton,
        }}
      />
      
    </Stack.Navigator>
  );
};

export default function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Monument"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Monument") {
            iconName = focused ? 'home' : 'home-outline'
          }
          else if (rn === "Map") {
            iconName = focused ? 'map' : 'map-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Monument" options={{headerShown: false}} component={MonumentStack} />
      <Tab.Screen name="Map" options={{headerShown: false}} component={MapStack} />
    </Tab.Navigator>
  );
}