import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import LinkCard from './LinkCard';
import {Button, Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DATA = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
  {
    id: '3ac8afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
  {
    id: '3ac68af-c605-48d3-a4f8-fbd91aa97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
  {
    id: '3ac68afc4f8-fbd91aa97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
  {
    id: '3ac68afc97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
  {
    id: '3-c605-48d3-a4f8-fbd91aa97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
  {
    id: '3-48d3-a4f8-fbd91aa97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
  {
    id: '391aa97f63',
    title: 'React Native Paper',
    content: 'https://reactnativepaper.com/',
  },
];

const MainPage = () => {
  const [link, setLink] = useState({});

  useEffect(() => {
    async function loadLinks() {
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
    }
    loadLinks();
  }, []);
  const logout = async () => {
    auth().signOut();
  };
  const renderCards = ({item}) => (
    <LinkCard title={item.title} content={item.content} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SwitchOver</Text>
        <Button mode="contained-tonal" style={{margin: 10}} onPress={logout}>
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
    margin: 5,
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
