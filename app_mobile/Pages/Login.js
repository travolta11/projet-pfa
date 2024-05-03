import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import styles from './Style';
import Logo from '../assets/images/img.png';
import { useNavigation } from '@react-navigation/native';
const LoginForm = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    if (!email) {
      setEmailError('Please enter your email.');
      setPasswordError('');
      return;
    } else if (!password) {
      setPasswordError('Please enter your password.');
      setEmailError('');
      return;
    } else {
      setEmailError('');
      setPasswordError('');
      // Login logic here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.loginContainer}>
        <Input
          style={styles.input}
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          errorMessage={emailError}
        />
        <Input
          style={styles.input}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          errorMessage={passwordError}
        />
        <Button
          buttonStyle={styles.button}
          title="Login"
          onPress={handleLogin}
        />
        <Text style={styles.signupText}>
          Don't have an account?
          <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;