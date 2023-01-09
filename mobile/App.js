import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Initializing</Text>
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
