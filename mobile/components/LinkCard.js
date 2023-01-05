import React from 'react';
import {Card, TouchableRipple, Button} from 'react-native-paper';
import {StyleSheet, Linking} from 'react-native';

const LinkCard = ({title, content}) => {
  return (
    <Card style={styles.container}>
      <TouchableRipple
        onPress={() => {
          Linking.openURL(content);
          console.log('Pressed');
        }}>
        <Card.Title
          title={title}
          subtitle={content}
          titleStyle={styles.title}
        />
      </TouchableRipple>
      <Card.Actions>
        <Button mode="contained">Delete</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
    padding: 5,
    margin: 10,
  },
  text: {
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default LinkCard;
