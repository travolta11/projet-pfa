import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import moment from 'moment';
export default function MonumentDetails() {
  const route = useRoute();
  const { id } = route.params;
  const { width } = Dimensions.get('window');
  const url = `http://192.168.100.15:5000/monument/${id}`;
  const [monument, setMonument] = useState(null);
  const [createur, setCreateur] = useState(null);

  useEffect(() => {
    const fetchMonumentData = async () => {
      try {
        const response = await axios.get(url);
        setMonument(response.data);
        await fetchCreatorData(response.data.createur_id);
      } catch (error) {
        console.log("Error fetching monument data:", error);
      }
    };

    const fetchCreatorData = async (creatorId) => {
      try {
        const response = await axios.get(`http://192.168.100.15:5000/createur/${creatorId}`);
        setCreateur(response.data);
      } catch (error) {
        console.log("Error fetching creator data:", error);
      }
    };

    fetchMonumentData();
  }, [id]);

  if (!monument || !createur) {
    return <Text>Loading...</Text>;
  }

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={{ width: '100%', height: 300 }} />
  );

  const INITIAL_REGION = {
    latitude: monument.latitude,
    longitude: monument.longitude,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };

  const markerCoordinates = {
    latitude: monument.latitude,
    longitude: monument.longitude,
  };

  const horaire = `Horaire: ${monument.horaire}`;

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
          <Text style={styles.title}>{monument.titre}</Text>
          <Text style={styles.description}>{monument.description}</Text>
          <Text style={styles.localisation}>
            Localisation: {monument.localisation}, {monument.ville}
          </Text>
          <Text style={styles.horairesFraisText}>Horaires: {monument.horaire}</Text>
          <Text style={styles.horairesFraisText}>Frais: {monument.frais}</Text>
          {monument.images && monument.images.length > 0 && (
            <Carousel
              style={styles.carousel}
              data={monument.images}
              renderItem={renderImage}
              sliderWidth={width}
              itemWidth={width * 0.7}
              autoplay
              loop
            />
          )}
        </View>
        <View style={styles.container2}>
          {createur && (
            <View>
              <View style={styles.container3}>
              <Image source={{ uri: createur.photo }} style={styles.imageCreateur} />
              <Text style={styles.nomCreateur}>Créateur: {createur.nom}</Text>
              </View>
              <Text style={styles.horairesFraisText}>Date de naissance:{moment(new Date(createur.date_n)).format('DD/MM/YYYY')}</Text>
              <Text style={styles.description}>Biographie: {createur.biographie}</Text>
              
            </View>
          )}
        </View>
        
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: '60%', 
  },
  scrollView: {
    maxHeight: Dimensions.get('screen').height * 0.8, 
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginHorizontal:'5%'
    
  },
  container2: {
    marginRight: 15,
    marginBottom: 100,
    
  },
  container4: {
    marginTop:100
    
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginBottom: 12,
  },
  nomCreateur: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginHorizontal:'5%',
    flexDirection:'row',
    alignItems: 'flex-start',
    textAlign: 'justify',
    paddingRight:"25%"
  },
  imageCreateur: {
    width: 100,
    height: 100,
    borderRadius: 40,
    

  },
  description: {
    fontSize: 18,
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
},
creatorImage: {
  width: 100,
  height: 100,
},
});

