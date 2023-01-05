import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import LinkCard from './LinkCard';
import {Button, Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MainPage = () => {
  const [link, setLink] = useState({});

  const loadLinks = async () => {
    const getLinks = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('links')
      .orderBy('createdAt', 'desc')
      .get();
    const links = getLinks.docs.map(x => {
      return {...x.data(), id: x.id};
    });
    console.log(links);
    setLink(links);
  };

  const deleteLink = id => async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('links')
      .doc(id)
      .delete();
    console.log('deleted', id);
    const newLink = link.filter(x => x.id !== id);
    setLink(newLink);
  };

  useEffect(() => {
    loadLinks();
  }, []);
  const logout = async () => {
    auth().signOut();
  };
  const renderCards = ({item}) => (
    <LinkCard
      title={item.title}
      content={item.content}
      time={item.createdAt.toDate().toLocaleString()}
      deleteLink={deleteLink(item.id)}
    />
  );
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
        refreshing={false}
        onRefresh={async () => {
          console.log('refresh');
          await loadLinks();
        }}
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
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

export default MainPage;
