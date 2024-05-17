import { FlatList, SafeAreaView, StyleSheet, Text, View,TextInput} from 'react-native';
import MonumentBloc from './MonumentBloc';
import { useEffect,useState } from 'react';
import axios from 'axios';
import MonumentDetails from './MonumentDetails';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import filter from 'lodash.filter';
import { URL_API } from './ServerLink';
import * as Location from 'expo-location';

export default function Monument(){
    const Stack = createNativeStackNavigator();
        const navigation=useNavigation();
        const [monuments,setMonuments]=useState([]);
        const [loading, setLoading] = useState(true);
        const [searchText, setSearchText] = useState('');
        const [fullData,setFullData]=useState([]);
        useEffect(() => {
            requestLocationPermission();
          }, []);
        
          const requestLocationPermission = async () => {
            try {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
              }
            } catch (err) {
              console.warn(err);
            }
          };
        useEffect(()=>{
            const MonumentFetch=async ()=>{
                try{
                    const response = await axios.get(`${URL_API}/monument`);
                    setMonuments(response.data);
                    setFullData(response.data);
                    setLoading(false);
                }
                catch(error){
                    console.log("Error fetching monuments :",error);
                    setLoading(false);
                }
            };
            
            MonumentFetch();
            },[]);
            
            const handleSearch = (query) => {
                setSearchText(query);
                const filtredData=filter(fullData,(m)=>{
                    return contains(m.titre,query);
                })

              setMonuments(filtredData)  
            };     
            const contains=(title,query)=>{
               
                if(title.toLowerCase().indexOf(query.toLowerCase()) !== -1){
                    return true;
                }
                return false;

            }
    if (loading) {
        return <Text>Loading...</Text>;
      }

      const onPressMonument = (id) => {navigation.navigate('Details', {id})}
    return(
        <View style={{flex:1}}>
            <TextInput
                style={styles.searchInput}
                clearButtonMode='always'
                placeholder="Search monuments"
                onChangeText={(query)=>handleSearch(query)}
                value={searchText}
            />  
        <FlatList
        data={monuments}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>(
            <MonumentBloc
            titre={item.titre}
            ville={item.ville}
            image_src={(item.images).split(",")[0]}
            localisation={item.localisation}
            onPress={()=>onPressMonument(item.id)}
            
            />
            
            
        )

        }
        /> 
            
        </View>
    )
    

}
const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
    },
});
/*onPressMonument(item.id) 
const onPressMonument = (id) => {
                navigation.navigate('MonumentDetails', {id});
              }; */