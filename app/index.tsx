import React from 'react';
import { SafeAreaView, View, StyleSheet, Platform, StatusBar, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderButtons from './components/header_buttons';
import MessageList from './components/messages_list';
import FooterNavigation from './components/FooterNavigation';

const HomePage = () => {
  const navigation = useNavigation();
  
  const handleFindFriends = () => {
    console.log('Find New Friends pressed');
  };
  const handleUpgrade = () => {
    console.log('Upgrade to Premium pressed');
  };
  const handleSeeMore = () => {
    // Add your logic for "See More" functionality
    console.log("See More pressed");
  };
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderButtons 
        onPressFindFriends={handleFindFriends}
        onPressUpgrade={handleUpgrade}
      />
      <View style={styles.introContainer}>
        <Text style={styles.welcomeBackMessage}>Welcome back, Justin! You’ve made 4 new friends and sent 123 messages this week!</Text>
        <TouchableOpacity onPress={navigateToProfile}>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>    
      <View style={styles.messageContainer}>
        <MessageList />
      </View>
        <FooterNavigation onProfilePress={navigateToProfile} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FCFE',
  },
  introContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  welcomeBackMessage: {
    fontStyle: 'italic',
    fontSize: 13,
    color: '#9d9d9d',
    marginTop: 10,
  },
  seeMore: {
    textDecorationLine: 'underline',
    fontSize: 13,
    color: '#9d9d9d',
    alignSelf: 'flex-end',
    marginBottom: 5
  },
  messageContainer: {
    flex: 1,
  }
});

export default HomePage;
