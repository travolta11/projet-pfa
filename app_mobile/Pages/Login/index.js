import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Logo from '../../assets/images/img.png';

const Login = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [signinError, setSigninError] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const handleUsernameChange = (text) => {
    setUsername(text);
    if (!text) {
      setUsernameError('Please fill in your username.');
      setUsernameValid(false);
    } else {
      setUsernameError('');
      setUsernameValid(true);
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!text) {
      setEmailError('Please fill in your email.');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const handleSignupPress = () => {
    let isValid = true;

    if (!username) {
      setUsernameError('Please fill in your username.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email) {
      setEmailError('Please fill in your email.');
      isValid = false;
    } else {
      setEmailError('');
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
      setShowSignupForm(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSigninError('');
      Alert.alert('Success', 'Sign up successful!');
    }
  };

  const handleSigninPress = () => {
    // Vérification des champs email et mot de passe pour la connexion
    if (email === '' || password === '') {
      setSigninError('Please fill in all fields.');
      return;
    }

    setSigninError('');
    setShowSignupForm(false);
   
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
        <Text style={styles.label}>Enter your username</Text>
<TextInput
  placeholder="Username"
  style={[
    styles.input,
    usernameTouched && !usernameValid ? styles.errorInput : null,
  ]}
  value={username}
  onChangeText={handleUsernameChange}
/>
{usernameError || (usernameTouched && !username) ? <Text style={styles.errorText}>Please fill in your username.</Text> : null}


<Text style={styles.label}>Enter your email</Text>
<TextInput
  placeholder="Email"
  style={[
    styles.input,
    emailTouched && !emailValid ? styles.errorInput : null,
  ]}
  value={email}
  onChangeText={handleEmailChange}
/>
{emailError || (emailTouched && !email) ? <Text style={styles.errorText}>Please fill in your email.</Text> : null}

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

        <TouchableOpacity style={styles.button} onPress={handleSignupPress} disabled={!usernameValid || !emailValid}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter your email</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
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
        <TouchableOpacity onPress={() => { setShowSignupForm(true); setUsername(''); setEmail(''); setPassword(''); setConfirmPassword(''); }}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
</View>

  );
};
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
    marginBottom: 10,
  },
});

export default Login;