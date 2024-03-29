import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View, Linking, Appearance} from 'react-native';
import LinkCard from './LinkCard';
import {Button, Text, ActivityIndicator} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

// Main page for Switch Over
const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState({});

  // Delete the link from the user's account
  const deleteLink = id => async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('links')
      .doc(id)
      .delete();
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('links')
      .onSnapshot(querySnapshot => {
        const links = [];

        // Configure data for LinkCard
        querySnapshot.forEach(documentSnapshot => {
          links.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        // Sort by latest
        links.sort((a, b) => {
          const timeA = a.createdAt.toDate().getTime();
          const timeB = b.createdAt.toDate().getTime();

          if (timeA < timeB) {
            return 1;
          } else if (timeA > timeB) {
            return -1;
          }
          return 0;
        });
        setLink(links);
        setLoading(false);
      });

    // Setup notifications for quit state and background state
    messaging().onNotificationOpenedApp(async remoteMessage => {
      Linking.openURL(remoteMessage.notification.body).then(_ => {
        return deleteLink(remoteMessage.data.linkId)();
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          Linking.openURL(remoteMessage.notification.body).then(_ => {
            return deleteLink(remoteMessage.data.linkId)();
          });
        }
      });
    return () => subscriber();
  }, []);

  // Logout of the app. Deletes the device token from user.
  const logout = async () => {
    const token = await messaging().getToken();
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('tokens')
      .doc(token)
      .delete();
    await auth().signOut();
  };

  const renderCards = ({item}) => (
    <LinkCard
      title={item.title}
      content={item.content}
      time={item.createdAt.toDate().toLocaleString()}
      deleteLink={deleteLink(item.id)}
    />
  );

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SwitchOver</Text>
        <Button mode="contained-tonal" onPress={logout}>
          Log Out
        </Button>
      </View>
      <FlatList
        data={link}
        renderItem={renderCards}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    color: Appearance.getColorScheme() === 'light' ? 'black' : 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

export default MainPage;
