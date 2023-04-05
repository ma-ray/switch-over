import React from 'react';
import {Card, TouchableRipple, Button, Text} from 'react-native-paper';
import {StyleSheet, Linking} from 'react-native';

// Component to display a user's link
const LinkCard = ({title, content, time, deleteLink}) => {
  return (
    <Card style={styles.container}>
      <TouchableRipple
        onPress={async () => {
          deleteLink();
          Linking.openURL(content);
        }}>
        <Card.Title
          title={title}
          subtitle={content}
          titleStyle={styles.title}
        />
      </TouchableRipple>
      <Card.Content style={styles.content}>
        <Text variant="bodyMedium">{time}</Text>
        <Button mode="contained" onPress={deleteLink}>
          Delete
        </Button>
      </Card.Content>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LinkCard;
