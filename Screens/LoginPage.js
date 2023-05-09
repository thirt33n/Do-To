import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput,Alert, TouchableOpacity } from 'react-native';
import { auth } from "../firebaseConfig"
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import HomePage from './HomePage';







const LoginPage = ({navigation}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errortext, setErrortext] = useState("");

  const handleLogin = async () => {
    
   //handle
  //  setErrortext("")
    if(!email && !password) return alert("Please Fill in Details")
    if (!email) return alert("Please fill Email");
    if (!password) return alert("Please fill Password");

    try{
        await signInWithEmailAndPassword(auth,email,password);
        alert("Signed in successfully! ");
        navigation.navigate('HomePage');
    }
    catch(e)
    {
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
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() =>{navigation.navigate('SignupPage')}} >
              <Text style={{color:'tomato'}}>Create an account! </Text>
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
    marginTop: -160

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
  inputLabel: {
    color: 'tomato',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: 'fff',
    borderWidth:1,
    borderColor:'tomato',
    padding: 10,
    borderRadius: 5,
    marginTop:'3%',
    alignItems: 'center',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export function Check(){
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    return onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
 
      setLoading(false);
    });
  }, []);

  if (loading) return null; // Render loading/splash screen etc

  if (authenticated) {
    return <HomePage />;
  }

  return <LoginPage />;
}

export default LoginPage;
