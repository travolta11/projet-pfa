import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { URL_API } from './ServerLink';

export default function Map(){
const [monuments,setMonuments]=useState([]);
const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const MonumentFetch=async ()=>{
            try{
                const response = await axios.get(`${URL_API}/monument`);
                setMonuments(response.data);
            }
            catch(error){
                console.log("Error fetching monuments :",error);
                setLoading(false);
            }
        };
        
        MonumentFetch();
        },[]);
        const INITIAL_REGION = {
        latitude: 31.7917,
        longitude: -7.0926,
        latitudeDelta: 8.0,
        longitudeDelta: 8.0,
        };
    console.log(monuments);
    return(
        <View style={styles.StyleSheet} >
            <MapView style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            showsUserLocation
            showsMyLocationButton
            >
           {monuments.map((monument, index) => (
            <Marker
                key={index}
                coordinate={{ latitude: parseFloat(monument.latitude), longitude: parseFloat(monument.longitude),longitudeDelta: 8.0,latitudeDelta: 8.0, }}
                title={monument.titre}
                description={monument.horaire}
            />
          
        ))}
        </MapView>
        </View>
    )

}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        width:'100%',
        height:'100%'
    }
})