import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Animated, TouchableOpacity } from 'react-native';
import ProgressBar from '../components/progress_bar';
import BigYuOnboardingMessages from '../components/yu_messaging_onboarding_walkthrough';
import FriendProfile from '../components/friend_profile';
import MessageContainer from '../components/MessageContainer';
import InputContainer from '../components/InputContainer';
import MessagingWithYuOnboarding from '../components/messaging_with_yu_onboarding';
import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MockMessagesYu = () => {
  const navigation = useNavigation();
  
  const handleFriendProfilePress = () => {
    console.log('Friend profile pressed');
    navigation.navigate('RelationshipTracker', { friendName: 'Jpp123' });
  };
      
  
  const [yuFindingText, setYuFindingText] = useState("One moment...");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showNewComponent, setShowNewComponent] = useState(false);


  const initialMessages = [
    { id: '1', text: "Hi! I see you're from Pittsburgh. Did you enjoy growing up there?", isSent: false },
    { id: '2', text: "Yeah, it's a beautiful city! DId you enjoy growing up in Boston?", isSent: true },
    { id: '3', text: "It was ok. A little too big for me. That's why I moved to Worcester. Do you still live in Pittsburgh?", isSent: false },
    { id: '4', text: "Yup! Still live here and don't plan on leaving anytime soon.", isSent: true },
    { id: '5', text: "That's so great! I'm happy for you! I've never been but I've heard it's really nice.", isSent: false },
    { id: '6', text: "Yeah, it's a beautiful city! Bigger than Worcester but not as big as Boston, so you might like it.", isSent: true },
    { id: '7', text: "I'll have to check it out one day!", isSent: false },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputContainerHeight, setInputContainerHeight] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT*2,
        duration: 1000,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          setShowNewComponent(true);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [slideAnim, fadeAnim]);

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
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleInputHeightChange = useCallback((height: number) => {
    setInputContainerHeight(height);
  }, []);

  // Calculate the height for MessageContainer
  const messageContainerHeight = SCREEN_HEIGHT - 
    (60 + // ProgressBar height (estimate)
     100 + // BigYuOnboardingMessages height (estimate)
     50 + // FriendList height (estimate)
     inputContainerHeight);

return (
  <View style={styles.container}>
    <Animated.View 
      style={[
        styles.oldContent, 
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.appContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ProgressBar progress={35} />
        <BigYuOnboardingMessages text={yuFindingText} />

        {friends.map((friend, index) => (
          <TouchableOpacity key={index} onPress={handleFriendProfilePress}>
            <FriendProfile
              imageSource={friend.image}
              name={friend.name}
            />
          </TouchableOpacity>
        ))}

        <InputContainer 
          onSendMessage={handleSendMessage} 
          onHeightChange={handleInputHeightChange}
        />
      </KeyboardAvoidingView>
    </Animated.View>
    {showNewComponent && (
      <Animated.View 
        style={[
          styles.newContent, 
          { opacity: fadeAnim }
        ]}
      >
        <View style={styles.container}>
          <MessagingWithYuOnboarding 
            progress={40} 
            initialMessages={initialMessages} 
            friend={{ image: require('../assets/images/profile picture.jpg'), name: 'Jpp123' }}
            onFriendProfilePress={handleFriendProfilePress}
          />
        </View>
      </Animated.View>
    )}
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FCFE',
  },
  oldContent: {
    ...StyleSheet.absoluteFillObject,
  },
  newContent: {
    ...StyleSheet.absoluteFillObject,
  },
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
    zIndex: 2333,
  },
  messageContainerWrapper: {
    width: '100%',
  },
});

export default MockMessagesYu;