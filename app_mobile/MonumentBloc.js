import { View, Text, TouchableOpacity,Image,StyleSheet } from 'react-native'
import React from 'react'

export default function MonumentBloc({titre,ville,localisation,image_src,onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View>
            <Image source={{ uri: image_src }} style={styles.image} />
        </View> 
        <View>
            <Text style={styles.title}>{titre}</Text>
            <Text style={styles.ville}>({ville})</Text>
            <Text style={styles.localisation} >{localisation}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 3,
      marginVertical: 10,
      padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
      },
    textContainer: {
      flex: 1,
      marginLeft: 20,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    ville:{
        fontSize: 15,
      fontWeight: 'bold',
    },
    localisation: {
        fontSize: 13
      }
  });