import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Dropdown from '../components/dropdown_menu';

const FriendItem = ({ initials, name, hasStreak, primaryData, primaryLabel }) => (
  <SafeAreaView style={styles.friendItem}>
    <View style={styles.avatarContainer}>
      {hasStreak && <Text style={styles.fireEmoji}>🔥</Text>}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dataCount}>{primaryData} {primaryLabel}</Text>
    </View>
  </SafeAreaView>
);

const FriendsList = () => {
  const [sortOption, setSortOption] = useState('messagesMost');
  const [primaryDataLabel, setPrimaryDataLabel] = useState('messages');
  const [friends, setFriends] = useState([
    { id: 1, initials: 'JP', name: 'Jpp123', messages: 1456, daysAsFriends: 120, streak: 5, mutualFriends: 10 },
    { id: 2, initials: 'JP', name: 'Jpp123', messages: 964, daysAsFriends: 90, streak: 3, mutualFriends: 8 },
    { id: 3, initials: 'JP', name: 'Jpp123', messages: 456, daysAsFriends: 60, streak: 0, mutualFriends: 5 },
    { id: 4, initials: 'JP', name: 'Jpp123', messages: 356, daysAsFriends: 30, streak: 2, mutualFriends: 3 },
    { id: 5, initials: 'JP', name: 'Jpp123', messages: 138, daysAsFriends: 15, streak: 1, mutualFriends: 2 },
  ]);

    const sortOptions = [
    { label: 'Messages (Most)', value: 'messagesMost' },
    { label: 'Messages (Least)', value: 'messagesLeast' },
    { label: 'Days as friends (Most)', value: 'daysAsFriendsMost' },
    { label: 'Days as friends (Least)', value: 'daysAsFriendsLeast' },
    { label: 'Longest active streaks', value: 'longestStreaks' },
    { label: 'Mutual friends (Most)', value: 'mutualFriendsMost' },
    { label: 'Mutual friends (Least)', value: 'mutualFriendsLeast' },
  ];

  const sortFriends = (option) => {
    let sortedFriends = [...friends];
    let newPrimaryDataLabel = '';


  switch (option) {
    case 'messagesMost':
    case 'messagesLeast':
      sortedFriends.sort((a, b) => option === 'messagesMost' ? b.messages - a.messages : a.messages - b.messages);
      newPrimaryDataLabel = 'messages';
      break;
    case 'daysAsFriendsMost':
    case 'daysAsFriendsLeast':
      sortedFriends.sort((a, b) => option === 'daysAsFriendsMost' ? b.daysAsFriends - a.daysAsFriends : a.daysAsFriends - b.daysAsFriends);
      newPrimaryDataLabel = 'days as friends';
      break;
    case 'longestStreaks':
      sortedFriends.sort((a, b) => b.streak - a.streak);
      newPrimaryDataLabel = 'day streak';
      break;
    case 'mutualFriendsMost':
    case 'mutualFriendsLeast':
      sortedFriends.sort((a, b) => option === 'mutualFriendsMost' ? b.mutualFriends - a.mutualFriends : a.mutualFriends - b.mutualFriends);
      newPrimaryDataLabel = 'mutual friends';
      break;
  }
  setFriends(sortedFriends);
  setPrimaryDataLabel(newPrimaryDataLabel);
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <Dropdown
        options={sortOptions}
        selectedValue={sortOption}
        onSelect={(value) => {
          setSortOption(value);
          sortFriends(value);
        }}
      />
      <ScrollView style={styles.scrollView}>
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            initials={friend.initials}
            name={friend.name}
            primaryData={friend[primaryDataLabel === 'messages' ? 'messages' : 
                   primaryDataLabel === 'days as friends' ? 'daysAsFriends' : 
                   primaryDataLabel === 'day streak' ? 'streak' : 'mutualFriends']}
            primaryLabel={primaryDataLabel}
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