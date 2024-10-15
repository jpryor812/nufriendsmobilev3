import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Animated, Image, TouchableOpacity } from 'react-native';
import ProgressBar from '../components/progress_bar';
import BigYuOnboardingMessages from '../components/yu_messaging_onboarding_walkthrough';
import FriendProfile from '../components/friend_profile';
import MessageContainer from '../components/MessageContainer';
import InputContainer from '../components/InputContainer';
import { createStackNavigator } from '@react-navigation/stack';
import MockMessagesYu from './onboarding_mock_messages_yu';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Stack = createStackNavigator();

const MockMessages = ({navigation}) => {
  const pointerOpacity = useRef(new Animated.Value(0)).current;
  
  const [yuFindingText, setYuFindingText] = useState("Your Friend's Yu and I will chat to put together an initial conversation to get the ball rolling");
  
  const initialMessages = [
    { id: '1', text: "Hi! I see you're from Pittsburgh. Did you enjoy growing up there?", isSent: false },
    { id: '2', text: "Yeah, it's a beautiful city! DId you enjoy growing up in Boston?", isSent: true },
    { id: '3', text: "It was ok. A little too big for me. That's why I moved to Worcester. Do you still live in Pittsburgh?", isSent: false },
    { id: '4', text: "Yup! Still live here and don't plan on leaving anytime soon.", isSent: true },
    { id: '5', text: "That's so great! I'm happy for you! I've never been but I've heard it's really nice.", isSent: false },
    { id: '6', text: "Yeah, it's a beautiful city! Bigger than Worcester but not as big as Boston, so you might like it.", isSent: true },
    { id: '7', text: "I'll have to check it out one day!", isSent: false },
  ];
  const [messages, setMessages] = useState<(typeof initialMessages[0] & { opacity?: Animated.Value })[]>([]);
  const [inputContainerHeight, setInputContainerHeight] = useState(60);

  const pointerAnimation = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.timing(pointerOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pointerOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    )
  ).current;
  useEffect(() => {
    const pointerTimer = setTimeout(() => {
      pointerAnimation.start();
    }, 13500);
    return () => {
      clearTimeout(pointerTimer);
      pointerAnimation.stop();
    };
  }, [pointerAnimation]);
  
  const [messageKey, setMessageKey] = useState(0);
  useEffect(() => {
  const initialDelay = setTimeout(() => {
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
  }, 2500); // 2-second delay


    const textChangeTimer = setTimeout(() => {
      setYuFindingText("Type whatever you'd like, or get help from me. Tap on me and I'll show you how it works.");  // Change this to whatever text you want
    }, 10500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(textChangeTimer)
    };
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
      <TouchableOpacity 
        style={styles.yuContainer}
        onPress={() => navigation.navigate('MockMessagesYu')}
        activeOpacity={0.7}
      >
        <BigYuOnboardingMessages text={yuFindingText} />
        <Animated.View style={[styles.pointer, { opacity: pointerOpacity }]}>
          <Image
            source={require('../assets/images/point_up_2.png')}
            style={styles.pointerImage}
          />
        </Animated.View>
      </TouchableOpacity>
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
  yuContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  pointer: {
    position: 'absolute',
    top: 70, // Adjust this value to position the pointer correctly
    left: 55, // Adjust this value to position the pointer correctly
  },
  pointerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

const MockMessagesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MockMessages">
      <Stack.Screen 
        name="MockMessages" 
        component={MockMessages} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MockMessagesYu" 
        component={MockMessagesYu} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


export default MockMessagesNavigator;