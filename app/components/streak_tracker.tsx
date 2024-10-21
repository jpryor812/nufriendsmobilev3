import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

const StreakItem = ({ streak, name, imageUrl }) => (
  <View style={styles.streakItem}>
    <Text style={styles.fireEmoji}>🔥</Text>
    <Text style={styles.streakNumber}>{streak}</Text>
    <Image source={{ uri: imageUrl }} style={styles.profileImage} />
    <Text style={styles.name}>{name}</Text>
  </View>
);

const ActiveStreaks = () => {
  const streaks = [
    { streak: 17, name: 'PChak55', imageUrl: 'https://example.com/pchak55.jpg' },
    { streak: 11, name: 'AlexD33', imageUrl: 'https://example.com/alexd33.jpg' },
    { streak: 8, name: 'OnDeck02', imageUrl: 'https://example.com/ondeck02.jpg' },
    // Add more streak data as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Active Streaks</Text>
      <ScrollView style={styles.scrollView}>
        {streaks.map((item, index) => (
          <StreakItem key={index} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 200, // Adjust this value as needed
  },
  streakItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fireEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 30, // Fixed width for alignment
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
  },
});

export default ActiveStreaks;