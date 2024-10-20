import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import HeaderButtons from '../components/header_buttons';

const ProfilePage = () => {
  const handleFindFriends = () => {
    // Implement find friends functionality
    console.log('Find friends');
  };

  const handleUpgrade = () => {
    // Implement upgrade functionality
    console.log('Upgrade');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderButtons 
        onPressFindFriends={handleFindFriends}
        onPressUpgrade={handleUpgrade}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add other styles as needed
  },
  // Add other style objects as needed
});

export default ProfilePage;