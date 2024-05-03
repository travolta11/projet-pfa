import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import Map from "./Map";
import Monument from "./Monument";
import Utilisateur from "./Utilisateur";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();

export default function BottomNav() {
  const navigation = useNavigation();

  return (
        
    
          <Tab.Navigator 
          initialRouteName='Monument'
          screenOptions={({route})=>({
            tabBarIcon:({focused,color,size})=>{
             let iconName;
             let rn=route.name;
             if(rn === "Monument"){
                iconName = focused ? 'home' : 'home-outline'
                
             }
             else if(rn === "Map"){
                iconName = focused ? 'map' : 'map-outline';
             }
             else if(rn === "Utilisateur"){
                iconName = focused ? 'person' : 'person-outline';
             }
             return <Ionicons name={iconName}  />;
            }
          })
        }
          >
            <Tab.Screen name="Monument" component={Monument} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Utilisateur" component={Utilisateur} />
          </Tab.Navigator>
          
   
  );
}