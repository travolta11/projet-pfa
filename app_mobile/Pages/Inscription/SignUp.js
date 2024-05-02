import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import styles from './Style';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpEmailError, setSignUpEmailError] = useState('');
  const [signUpPasswordError, setSignUpPasswordError] = useState('');

  const handleEmailChange = (email) => {
    setSignUpEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSignUpEmailError('Please enter a valid email address.');
    } else {
      setSignUpEmailError('');
    }
  };

  const handlePasswordChange = (password) => {
    setSignUpPassword(password);
    if (password.length < 8) {
      setSignUpPasswordError('Password must be at least 8 characters long.');
    } else {
      setSignUpPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setSignUpConfirmPassword(confirmPassword);
    if (confirmPassword !== signUpPassword) {
      setSignUpPasswordError('Passwords do not match.');
    } else {
      setSignUpPasswordError('');
    }
  };

  const handleSignUp = () => {
    if (signUpEmailError || signUpPasswordError) {
      Alert.alert('Error', 'Please fix the errors before signing up.');
      return;
    }

    if (!signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }

    // Sign up logic here
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Sign Up</Text>
      <View style={styles.loginContainer}>
        <Input
          style={styles.input}
          label="Email"
          placeholder="Enter your email"
          value={signUpEmail}
          onChangeText={handleEmailChange}
          errorMessage={signUpEmailError}
        />
        <Input
          style={styles.input}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={signUpPassword}
          onChangeText={handlePasswordChange}
          errorMessage={signUpPasswordError}
        />
        <Input
          style={styles.input}
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
          value={signUpConfirmPassword}
          onChangeText={handleConfirmPasswordChange}
          errorMessage={signUpPasswordError}
        />
        <Button
          buttonStyle={styles.button}
          title="Sign Up"
          onPress={handleSignUp}
        />
      </View>
    </View>
  );
};

export default SignUp;