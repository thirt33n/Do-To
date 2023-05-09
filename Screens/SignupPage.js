import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput,Alert, TouchableOpacity } from 'react-native';
import { auth } from "../firebaseConfig"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { LinearGradient } from 'expo-linear-gradient';

const SignupPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const handleSignup = async () => {
    
     
    // handle
    setErrortext("")
    if(!username && !email && !password) return alert("Please Fill in Details")
    if (!username) return alert("Please fill Username");
    if (!email) return alert("Please fill Email");
    if (!password) return alert("Please fill Password");
    try{
        await createUserWithEmailAndPassword(auth,email,password);
        alert("Account Created Successfully! ")
        navigation.navigate('LoginPage');
    } catch(e){
      const message = e.message.replace("FirebaseError: Firebase: ", "");
      alert(message);
    }
  };

  return (
    <LinearGradient colors={['#fff','#fef','#fee','tomato']} style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop:-90,
    fontSize:40,
    textDecorationLine: 'underline',
  },
  form: {
    width: '80%',
    marginTop: -150

  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});




export default SignupPage;
