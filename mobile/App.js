import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

const App = () => {
  const [initializing, setInitializing] = useState(null);
  const [user, setUser] = useState();

  const onAuthStateChanged = u => {
    setUser(u);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    async function uploadToken() {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('tokens')
        .doc(token)
        .set({createdAt: firestore.FieldValue.serverTimestamp()});
    }
    uploadToken();
  }, [user]);

  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <MainPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
