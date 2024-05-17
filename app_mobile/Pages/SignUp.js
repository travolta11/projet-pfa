import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { URL_API } from '../ServerLink';

export default function SignUp() {
  const navigation = useNavigation();
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpEmailError, setSignUpEmailError] = useState('');
  const [signUpPasswordError, setSignUpPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${URL_API}/signup`, {
        username: signUpEmail,
        email: signUpEmail,
        password: signUpPassword,
      });
      console.log(response.data);
      setIsLoading(false);
      if (response.status === 201) {
        Alert.alert('Succès', 'Inscription réussie ! Vous pouvez maintenant vous connecter.');
      }
      navigation.navigate('LoginForm');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
    }
  };

  const handleEmailChange = (email) => {
    setSignUpEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSignUpEmailError('Veuillez saisir une adresse email valide.');
    } else {
      setSignUpEmailError('');
    }
  };

  const handlePasswordChange = (password) => {
    setSignUpPassword(password);
    if (password.length < 8) {
      setSignUpPasswordError('Le mot de passe doit avoir au moins 8 caractères.');
    } else {
      setSignUpPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setSignUpConfirmPassword(confirmPassword);
    if (confirmPassword !== signUpPassword) {
      setSignUpPasswordError('Les mots de passe ne correspondent pas.');
    } else {
      setSignUpPasswordError('');
    }
  };

  const handleSignUp = () => {
    if (signUpEmailError || signUpPasswordError) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de vous inscrire.');
      return;
    }

    if (!signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, signUpEmailError ? styles.inputError : null]}
            placeholder="Adresse email"
            value={signUpEmail}
            onChangeText={handleEmailChange}
          />
          {signUpEmailError ? <Text style={styles.errorText}>{signUpEmailError}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, signUpPasswordError ? styles.inputError : null]}
            placeholder="Mot de passe"
            secureTextEntry
            value={signUpPassword}
            onChangeText={handlePasswordChange}
          />
          {signUpPasswordError ? <Text style={styles.errorText}>{signUpPasswordError}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, signUpPasswordError ? styles.inputError : null]}
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            value={signUpConfirmPassword}
            onChangeText={handleConfirmPasswordChange}
          />
          {signUpPasswordError ? <Text style={styles.errorText}>{signUpPasswordError}</Text> : null}
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : isError ? (
          <Text style={styles.errorText}>Une erreur s'est produite. Veuillez réessayer.</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
        )}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});