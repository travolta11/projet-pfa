import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'

const INITIAL_REGION = {
    latitude: 31.7917,
    longitude: -7.0926,
    latitudeDelta: 8.0,
    longitudeDelta: 8.0,
  };

export default function Map(){
    return(
        <View style={styles.StyleSheet} >
            <MapView style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            showsUserLocation
            showsMyLocationButton
            />
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