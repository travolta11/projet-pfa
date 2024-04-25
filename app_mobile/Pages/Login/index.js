import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Logo from '../../assets/images/img.png';

const Login = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [signinError, setSigninError] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const handleSignupPress = () => {
    let isValid = true;

    if (!name) {
      setNameError('Please fill in your name.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!password) {
      setPasswordError('Please fill in your password.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please fill in the confirm password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      setShowSignupForm(false); // Change to login form after successful signup
      setName(''); // Reset name field
      setPassword(''); // Reset password field
      setConfirmPassword(''); // Reset confirm password field
      // Alert success message
      Alert.alert('Success', 'Sign up successful!');
      // Handle signup logic
    }
  };

  const handleSigninPress = () => {
    if (name === '' || password === '') {
      setSigninError('Please fill in all fields.');
      return;
    }

    // Send the name and password to the backend for verification

    // Upon successful verification, set the success message
    // setSuccessMessage('Sign in successful!');
    // Clear any previous signin error message
    setSigninError('');

    // Handle signin logic in the backend
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} resizeMode='contain' />
          <View style={styles.loginWrapper}>
            <Text style={styles.loginText}>{showSignupForm ? 'Sign Up' : 'Sign In'}</Text>
          </View>
        </View>
        {showSignupForm ? (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Enter your name</Text>
            <TextInput
              placeholder="Name"
              style={[
                styles.input,
                (nameError || (nameTouched && !name)) && !nameError ? styles.errorInput : null,
              ]}
              value={name}
              onChangeText={text => {
                setName(text);
                setNameTouched(true);
                if (nameError && text.length > 0) {
                  setNameError('');
                }
              }}
            />

            {nameError || (nameTouched && !name) ? <Text style={styles.errorText}>Please fill in your name.</Text> : null}

            <Text style={styles.label}>Enter your password</Text>
            <TextInput
              placeholder="Password"
              style={[
                styles.input,
                (passwordError || (passwordTouched && !password)) && !passwordError ? styles.errorInput : null,
              ]}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordTouched(true);
                if (passwordError && text.length > 0) {
                  setPasswordError('');
                }
              }}
              secureTextEntry={true}
            />

            {passwordError || (passwordTouched && !password) ? <Text style={styles.errorText}>Please fill in your password.</Text> : null}

            <Text style={styles.label}>Confirm your password</Text>
            <TextInput
              placeholder="Confirm Password"
              style={[
                styles.input,
                (confirmPasswordError || (confirmPasswordTouched && !confirmPassword)) && !confirmPasswordError ? styles.errorInput : null,
              ]}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setConfirmPasswordTouched(true);
                if (confirmPasswordError && text.length > 0) {
                  setConfirmPasswordError('');
                }
              }}
              secureTextEntry={true}
            />

            {confirmPasswordError || (confirmPasswordTouched && !confirmPassword) ? <Text style={styles.errorText}>Please fill in the confirm password.</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Enter your username</Text>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
            />
            <Text style={styles.label}>Enter your password</Text>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
            {signinError ? <Text style={styles.errorText}>{signinError}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSigninPress}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowSignupForm(true); setName(''); setPassword(''); }}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '80%',
    borderRadius: 5,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 255, 0)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formContainer: {},
  logo: {
    width: 150,
    height: 50,
  },
  loginWrapper: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  successMessage: {
    color: 'green',
    marginBottom: 5,
  },
});

export default Login;
