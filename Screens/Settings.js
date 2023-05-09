import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { auth } from "../firebaseConfig"
import { LinearGradient } from 'expo-linear-gradient';





export default function SettingsPage({ navigation }) {
 const userEmail = auth.currentUser.email;
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <LinearGradient colors={['#fff','#fef','#fee','tomato']} style={styles.container}>
        <Text style={styles.subHeaderText}>{userEmail} </Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentText: {
    fontSize: 20,
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: '2%',
    marginTop:'5%'
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
