import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
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

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Initializing</Text>
      </View>
    );
  }

  if (!user) {
    return <LoginPage auth={auth} />;
  }

  return <MainPage auth={auth} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
