import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import moment from 'moment';
import { URL_API } from './ServerLink';
import { ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import Slider from '@react-native-community/slider';

export default function MonumentDetails() {
  const route = useRoute();
  const { id } = route.params;
  const { width } = Dimensions.get('window');
  const [monument, setMonument] = useState(null);
  const [createur, setCreateur] = useState(null);
  const [isloading, SetIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const [region, setRegion] = useState({
    latitude: 34.031390,
    longitude: -6.835810,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121, 
  });

  const [marker, setMarker] = useState({
    latitude: 34.031390,
    longitude: -6.835810,
  });
  const [horaire, setHoraire] = useState("");

  const onSliderValueChange = (value) => {
    setSliderValue(value);
  };

  useEffect(() => {
    const fetchMonumentData = async () => {
      try {
        const response = await axios.get(`${URL_API}/monument/${id}`);
        setMonument(response.data);
        await fetchCreatorData(response.data);

      } catch (error) {
        console.log("Error fetching monument data:", error);
      }
    };

    const fetchCreatorData = async (data) => {
      try {
        const response = await axios.get(`${URL_API}/createur/${data.createur_id}`);
        setCreateur(response.data);
        setRegion({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121, 
        });
         setMarker({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        });
        setHoraire(`Horaire: ${data.horaire}`); 
      } catch (error) {
        console.log("Error fetching creator data:", error);
      }
    };

    fetchMonumentData();
  }, []);

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={{ width: '100%', height: 300 }} />
  );

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {
          monument == null || createur == null ? (
            <ActivityIndicator size="large" color="gray" />
          ): (
            <>
              <View style={styles.container1}>
                <MapView
                  style={styles.map}
                  region={region}
                  showsUserLocation
                >
                  <Marker
                    coordinate={marker}
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
              <View style={styles.carousel}>
              <Image source={{uri:monument.images[sliderValue]}} style={styles.image} />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={monument.images.length - 1}
                step={1}
                onValueChange={onSliderValueChange}
                value={sliderValue}
              />
              </View>
            )}
          </View>
          <View style={styles.container2}>
              <View>
                <View style={styles.container3}>
                <Image source={{ uri: createur.photo }} style={styles.imageCreateur} />
                <Text style={styles.nomCreateur}>Créateur: {createur.nom}</Text>
                </View>
                <Text style={styles.horairesFraisText}>Date de naissance:{moment(new Date(createur.date_n)).format('DD/MM/YYYY')}</Text>
                <Text style={styles.description}>Biographie: {createur.biographie}</Text>
              </View>
            </View>
            </>
          )
        }
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
image: {
  width: Dimensions.get('window').width - 50,
  height: 200,
  resizeMode: 'cover',
  marginBottom: 20,
},
slider: {
  width: Dimensions.get('window').width - 50,
},
});

