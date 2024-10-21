import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FriendItem = ({ initials, name, messages, hasStreak }) => (
  <SafeAreaView style={styles.friendItem}>
    <View style={styles.avatarContainer}>
      {hasStreak && <Text style={styles.fireEmoji}>🔥</Text>}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.messageCount}>{messages} messages</Text>
    </View>
  </SafeAreaView>
);

const FriendsList = () => {
  const [sortOption, setSortOption] = useState('messagesMost');
  const [friends, setFriends] = useState([
    { id: 1, initials: 'JP', name: 'Jpp123', messages: 1456, daysAsFriends: 120, streak: 5, mutualFriends: 10 },
    { id: 2, initials: 'JP', name: 'Jpp123', messages: 964, daysAsFriends: 90, streak: 3, mutualFriends: 8 },
    { id: 3, initials: 'JP', name: 'Jpp123', messages: 456, daysAsFriends: 60, streak: 0, mutualFriends: 5 },
    { id: 4, initials: 'JP', name: 'Jpp123', messages: 356, daysAsFriends: 30, streak: 2, mutualFriends: 3 },
    { id: 5, initials: 'JP', name: 'Jpp123', messages: 138, daysAsFriends: 15, streak: 1, mutualFriends: 2 },
  ]);

  const sortFriends = (option) => {
    let sortedFriends = [...friends];
    switch (option) {
      case 'messagesMost':
        sortedFriends.sort((a, b) => b.messages - a.messages);
        break;
      case 'messagesLeast':
        sortedFriends.sort((a, b) => a.messages - b.messages);
        break;
      case 'daysAsFriendsMost':
        sortedFriends.sort((a, b) => b.daysAsFriends - a.daysAsFriends);
        break;
      case 'daysAsFriendsLeast':
        sortedFriends.sort((a, b) => a.daysAsFriends - b.daysAsFriends);
        break;
      case 'longestStreaks':
        sortedFriends.sort((a, b) => b.streak - a.streak);
        break;
      case 'mutualFriendsMost':
        sortedFriends.sort((a, b) => b.mutualFriends - a.mutualFriends);
        break;
      case 'mutualFriendsLeast':
        sortedFriends.sort((a, b) => a.mutualFriends - b.mutualFriends);
        break;
    }
    setFriends(sortedFriends);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <Picker
        selectedValue={sortOption}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setSortOption(itemValue);
          sortFriends(itemValue);
        }}
      >
        <Picker.Item label="Messages (Most)" value="messagesMost" />
        <Picker.Item label="Messages (Least)" value="messagesLeast" />
        <Picker.Item label="Days as friends (Most)" value="daysAsFriendsMost" />
        <Picker.Item label="Days as friends (Least)" value="daysAsFriendsLeast" />
        <Picker.Item label="Longest active streaks" value="longestStreaks" />
        <Picker.Item label="Mutual friends (Most)" value="mutualFriendsMost" />
        <Picker.Item label="Mutual friends (Least)" value="mutualFriendsLeast" />
      </Picker>
      <ScrollView style={styles.scrollView}>
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            initials={friend.initials}
            name={friend.name}
            messages={friend.messages}
            hasStreak={friend.streak > 0}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 200,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
  },
  fireEmoji: {
    position: 'absolute',
    top: -5,
    left: -5,
    fontSize: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default FriendsList;