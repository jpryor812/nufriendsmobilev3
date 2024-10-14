import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ProgressBar from '../components/progress_bar';
import BigYuOnboardingMessages from '../components/yu_messaging_onboarding_walkthrough';
import FriendProfile from '../components/friend_profile';
import MessageContainer from '../components/MessageContainer';
import InputContainer from '../components/InputContainer';

const MockMessages = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: "Hello! How are you?", isSent: false },
    { id: '2', text: "I'm doing great, thanks for asking!", isSent: true },
    { id: '3', text: "That's wonderful to hear!", isSent: false },
    { id: '4', text: "How about we meet up this weekend?", isSent: true },
     { id: '5', text: "That's wonderful to hear!", isSent: false },
    { id: '6', text: "How about we meet up this weekend?", isSent: true },
    { id: '7', text: "That's wonderful to hear!", isSent: false },
  ]);

  const friends = [
    { image: require('../assets/images/profile picture.jpg'), name: 'Jpp123' },
    // Add more friends as needed
  ];

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      text: message,
      isSent: true,
    };
    setMessages([...messages, newMessage]);
  };

  const FriendList = () => (
    <View style={styles.friendListContainer}>
      {friends.map((friend, index) => (
        <FriendProfile
          key={index}
          imageSource={friend.image}
          name={friend.name}
        />
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.appContainer}
    >
      <ProgressBar progress={30} />
      <BigYuOnboardingMessages text="Your Friend's Yu and I will chat to put together an initial conversation to get the ball rolling" />
      <FriendList />
      <MessageContainer messages={messages} />
      <InputContainer onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0FCFE',
  },
  friendListContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  
});

export default MockMessages;