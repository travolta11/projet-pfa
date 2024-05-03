import axios from 'axios';
import React, { useState, useEffect,useRef } from 'react'
import { Text, View, Image, ScrollView,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import MapView,{PROVIDER_GOOGLE,Marker,Polyline} from 'react-native-maps'

export default function MonumentDetails() {
  const route = useRoute();
  const { id } = route.params;
  const { width } = Dimensions.get('window');
  const url = `http://192.168.100.15:5000/monument/${id}`;
  const [monument, setMonument] = useState(null);


  useEffect(() => {
    const monumentByIdFetching = async () => {
      try {
        const response = await axios.get(url)
        setMonument(response.data)
      }
      catch (error) {
        console.log("Error fetching Data : ", error)
      }
    }
    monumentByIdFetching();
  }, [id])

  if (!monument) {
    return <Text>Loading...</Text>
  }

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={{ width: '100%', height: 300 }} />
    
  );
  const INITIAL_REGION = {
    latitude: 33.608749,
    longitude: -7.632601,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };
  const markerCoordinates = {
    latitude: 33.608749,
    longitude: -7.632601,
  };
  const horaire=`Horaire:${monument.horaire}`;

  return (
    <View style={{flex:1,padding:5}}>
      <ScrollView
      >
        
        <View style={styles.container1}>
        
            <MapView 
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={INITIAL_REGION}
                  showsUserLocation
            >
            <Marker
              coordinate={markerCoordinates}
              title={monument.titre}
              description={horaire}
            />
           
            </MapView>
          <Text  style={styles.title} >{monument.titre}</Text>
          <Text style={styles.description}  >{monument.description}</Text>
          <Text style={styles.localisation}>Localisation: {monument.localisation}, {monument.ville}</Text>
          <Text style={styles.horairesFraisText}>Horaires: {monument.horaire}</Text>
          <Text style={styles.horairesFraisText}>Frais: {monument.frais}</Text>
          
          {monument.images && monument.images.length > 0 && (
            <Carousel 
              style={styles.carousel}
              data={monument.images}
              renderItem={renderImage}
              sliderWidth={width}
              itemWidth={width*0.7}
              autoplay
              loop
            />
          )}
          
        </View>
        <View style={styles.container2} >
        
        
          <Text>Créateur: {monument.createur}</Text>
          <Text>Horaires: {monument.horaire}</Text>
          <Text>Frais: {monument.frais}</Text>
          <Text> Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.

          Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum. L'avantage du latin est que l'opérateur sait au premier coup d'œil que la page contenant ces lignes n'est pas valide et que l'attention du lecteur n'est pas dérangée par le contenu, lui permettant de demeurer concentré sur le seul aspect graphique.

          </Text>
          
        
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container1: {
    marginBottom:'2%'
  },
  scrollView: {
    maxHeight: Dimensions.get('screen').height * 0.8, // 80% of the screen height
  },
  container2: {
    marginBottom:400
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginHorizontal:'5%'
    
  },
  description: {
    fontSize: 20,
    color: '#666',
    lineHeight: 24,
    marginBottom: 12,
    marginHorizontal:'5%',
    textAlign: 'justify',
  },
  localisation: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
    marginHorizontal:'5%',
    marginBottom: 12,
    
  },
  horairesFraisText: {
    fontSize: 14,
    marginHorizontal:'5%',
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  carousel: {
   marginTop:'5%'
  },
  map:{
    marginTop:'2%',
    marginBottom:'2%',
    width:'100%',
    height:'30%',
}
});

