import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GOOGLE_SIGNIN} from '@env';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const LoginPage = props => {
  GoogleSignin.configure({
    webClientId: GOOGLE_SIGNIN,
  });

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const {idToken} = await GoogleSignin.signIn();
    const googleCred = props.auth.GoogleAuthProvider.credential(idToken);
    return props.auth().signInWithCredential(googleCred);
  };

  return (
    <View style={styles.container}>
      <Text>Login here</Text>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
