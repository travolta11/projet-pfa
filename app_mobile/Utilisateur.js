import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import LoginForm from './Pages/Login';
import { useNavigation } from '@react-navigation/native';
import { URL_API } from './ServerLink';

export default function  Utilisateur (){
    const navigation=useNavigation();
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const usertByIdFetching = async ()=>{
            try{
                const response=await axios.get(`${URL_API}/tourist/1`)
                setUser(response.data);
            }
            catch(error){
                console.log("Error fetching Data : ",error)
            }
        }
        usertByIdFetching();
    },[])
    if(!user){
        console.log("Loading...")
    }
    return (
      <View>
        
        <Button title='Déconnexion' onPress={() => navigation.navigate('LoginForm')}/>
      </View>
    )
  }

