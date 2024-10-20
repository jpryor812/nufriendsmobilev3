import React from 'react';
import { SafeAreaView, View, StyleSheet, Platform, StatusBar } from 'react-native';
import HeaderButtons from './components/header_buttons';
import MessageList from './components/messages_list';
import FooterNavigation from './components/FooterNavigation';
const App = () => {
  
  const handleFindFriends = () => {
    console.log('Find New Friends pressed');
  };
  const handleUpgrade = () => {
    console.log('Upgrade to Premium pressed');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderButtons 
        onPressFindFriends={handleFindFriends}
        onPressUpgrade={handleUpgrade}
      />
      <View style={styles.messageContainer}>
        <MessageList />
      </View>
        <FooterNavigation />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  messageContainer: {
    flex: 1,
  }
});

export default App;
