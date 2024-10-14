import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Animated } from 'react-native';
import ProgressBar from '../components/progress_bar';
import BigYuOnboardingMessages from '../components/yu_messaging_onboarding_walkthrough';
import FriendProfile from '../components/friend_profile';
import MessageContainer from '../components/MessageContainer';
import InputContainer from '../components/InputContainer';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MockMessages = () => {
  const initialMessages = [
    { id: '1', text: "Hello! How are you?", isSent: false },
    { id: '2', text: "I'm doing great, thanks for asking!", isSent: true },
    { id: '3', text: "That's wonderful to hear!", isSent: false },
    { id: '4', text: "How about we meet up this weekend?", isSent: true },
    { id: '5', text: "it's wonderful to hear!", isSent: false },
    { id: '6', text: "Now about we meet up this weekend?", isSent: true },
    { id: '7', text: "it's wonderful to hear those news! Thank you so much for sharing with me today.", isSent: false },
  ];
  const [messages, setMessages] = useState<(typeof initialMessages[0] & { opacity?: Animated.Value })[]>([]);
  const [inputContainerHeight, setInputContainerHeight] = useState(60);
  const [messageKey, setMessageKey] = useState(0);
  useEffect(() => {
    initialMessages.forEach((message, index) => {
      setTimeout(() => {
        const opacity = new Animated.Value(0);
        const newMessage = { ...message, opacity };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessageKey(prev => prev + 1);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, index * 1000);
    });
  }, []);
  const friends = [
    { image: require('../assets/images/profile picture.jpg'), name: 'Jpp123' },
    // Add more friends as needed
  ];
  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      text: message,
      isSent: true,
      opacity: new Animated.Value(1), // New messages appear instantly
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageKey(prev => prev + 1);
  };
  const handleInputHeightChange = useCallback((height: number) => {
    setInputContainerHeight(height);
  }, []);
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
  // Calculate the height for MessageContainer
  const messageContainerHeight = SCREEN_HEIGHT - 
    (60 + // ProgressBar height (estimate)
     100 + // BigYuOnboardingMessages height (estimate)
     50 + // FriendList height (estimate)
     inputContainerHeight);
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.appContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ProgressBar progress={30} />
      <BigYuOnboardingMessages text="Your Friend's Yu and I will chat to put together an initial conversation to get the ball rolling" />
      <FriendList />
      <View style={[styles.messageContainerWrapper, { height: messageContainerHeight }]}>
        <MessageContainer 
          key={messageKey} 
          messages={messages} 
        />
      </View>
      <InputContainer 
        onSendMessage={handleSendMessage} 
        onHeightChange={handleInputHeightChange}
      />
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
  messageContainerWrapper: {
    width: '100%',
  },
});

export default MockMessages;