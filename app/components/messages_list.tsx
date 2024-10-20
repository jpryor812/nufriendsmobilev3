import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const users = {
  'Jpp123': {
    avatar: 'https://example.com/avatar.jpg',
    initials: 'JP'
  }
};

const messages = [
  { id: '1', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
  { id: '2', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
  { id: '3', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
{ id: '4', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
{ id: '5', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
  { id: '6', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
  { id: '7', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
  { id: '8', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
  { id: '9', userId: 'Jpp123', text: "Yeah I really like dinosaurs. My favorite is a velociraptor but I also really like Ankylosaurus and Ticeratops", timestamp: "4:45 pm" },
];

const Avatar = ({ userId }) => {
  const user = users[userId];
  return (
    <View style={styles.avatarContainer}>
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.avatarText}>{user.initials}</Text>
      )}
    </View>
  );
};

const MessageItem = ({ item }) => (
  <View style={styles.messageContainer}>
    <Avatar userId={item.userId} />
    <View style={styles.textContainer}>
      <Text style={styles.username}>{item.userId}</Text>
      <Text style={styles.messageText}
      numberOfLines={2}
      ellipsizeMode="tail"
        >
        {item.text}
      </Text>
    </View>
    <Text style={styles.timestamp}>{item.timestamp}</Text>
  </View>
);

const MessageList = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Messages</Text>
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageItem item={item} />}
      keyExtractor={item => item.id}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    fontStyle: 'underline'
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',

  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',

  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  messageText: {
    color: '#333',
    fontSize: 15,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-start',
  },
});

export default MessageList;