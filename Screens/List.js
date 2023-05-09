import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput,Alert, TouchableOpacity } from 'react-native';
import { auth } from "../firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

export default function Check(){
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
  
    if (!authenticated) {
      return <LoginPage />;
    }
  
    return <HomePage />;
}