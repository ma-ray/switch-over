import React from 'react';
import {StyleSheet, View, Appearance} from 'react-native';
import {Button, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {GOOGLE_SIGNIN} from '@env';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginPage = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_SIGNIN,
  });

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const {idToken} = await GoogleSignin.signIn();
    const googleCred = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCred);
  };

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, ...styles.text}}>SwitchOver</Text>
      <Text style={styles.text}>Send links to your phone.</Text>
      <Button icon="google" mode="contained" onPress={signIn}>
        Sign in with Google
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Appearance.getColorScheme() === 'light' ? 'black' : 'white',
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
