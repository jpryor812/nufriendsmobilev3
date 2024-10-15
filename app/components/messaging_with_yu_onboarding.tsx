import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Image, TouchableOpacity, Animated, Text } from 'react-native';
import ProgressBar from './progress_bar';
import MessageContainer from './MessageContainer';
import InputContainer from './InputContainer';
import FriendProfile from './friend_profile';
import YuBubble from './YuBubble';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isSent: boolean;
}

interface MessagingWithYuOnboardingProps {
  progress: number;
  initialMessages: Message[];
  friend?: {
    image: any;
    name: string;
  };
}

const MessagingWithYuOnboarding: React.FC<MessagingWithYuOnboardingProps> = ({ 
  progress, 
  initialMessages, 
  friend
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputContainerHeight, setInputContainerHeight] = useState(60);
  const [isExpanded, setIsExpanded] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const messageContainerAnim = useRef(new Animated.Value(1)).current; // Changed to use a multiplier
  const buttonsAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const inputContainerAnim = useRef(new Animated.Value(0)).current;


  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      text: message,
      isSent: true,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleInputHeightChange = useCallback((height: number) => {
    setInputContainerHeight(height);
  }, []);

  const handleYuImageClick = () => {
    setIsExpanded(!isExpanded);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isExpanded ? 0 : SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
  Animated.timing(messageContainerAnim, {
    toValue: isExpanded ? 1 : 0.75, // Animate to 3/4 of original size
    duration: 300,
    useNativeDriver: false,
  }),
  Animated.timing(buttonsAnim, {
    toValue: isExpanded ? SCREEN_HEIGHT : 0,
    duration: 300,
    useNativeDriver: true,
  }),
  Animated.timing(inputContainerAnim, {
    toValue: isExpanded ? 0 : SCREEN_HEIGHT,
    duration: 300,
    useNativeDriver: true,
  }),
  ]).start();
  };

  // Calculate the initial height for MessageContainer
  const initialMessageContainerHeight = SCREEN_HEIGHT - 
    (60 + 50 + 40 + // ProgressBar height (estimate) + FriendProfile height (estimate)
     inputContainerHeight);
  // Use messageContainerAnim to dynamically adjust the height
  const messageContainerHeight = messageContainerAnim.interpolate({
    inputRange: [0.75, 1],
    outputRange: [initialMessageContainerHeight * 0.75, initialMessageContainerHeight]
  });

  const renderButtons = () => {
    const buttons = ['Ask JPP123 what he does for fun in Worcester',
                     'Ask JPP123 what he likes to do for fun',
                     'Tell JPP123 why you are staying in Pittsburgh', 
                     'Something else???'];
    return buttons.map((button, index) => (
      <TouchableOpacity key={index} style={styles.button}>
        <Text style={styles.buttonText}>{button}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ProgressBar progress={progress} />
      <View style={styles.friendProfileWrapper}>
        {friend && (
          <FriendProfile
            imageSource={friend.image}
            name={friend.name}
          />
        )}
      </View>
      <Animated.View style={[styles.messageContainerWrapper, { height: messageContainerHeight }]}>
        <MessageContainer messages={messages} />
      </Animated.View>

<Animated.View style={[styles.yuBubbleWrapper, { transform: [{ translateY: slideAnim }] }]}>
  <YuBubble text="Not sure what to say? Click me!" />
</Animated.View>
<Animated.View style={[styles.inputWrapper, { transform: [{ translateY: inputContainerAnim }] }]}>
  <TouchableOpacity onPress={handleYuImageClick}>
    <Image
      source={require('../assets/images/yu_question_onboarding.png')}
      style={styles.yuQuestionImage}
    />
  </TouchableOpacity>
  <InputContainer 
    onSendMessage={handleSendMessage} 
    onHeightChange={handleInputHeightChange}
  />
</Animated.View>
<Animated.View style={[styles.buttonsContainer, { transform: [{ translateY: buttonsAnim }] }]}>
  {renderButtons()}
</Animated.View>
</KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0FCFE',
  },
  friendProfileWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  messageContainerWrapper: {
    width: '100%',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    width: '90%',
    marginTop: 30,
  },
  yuQuestionImage: {
    width: 70,
    height: 70,
    marginLeft: -15,
    marginBottom: 5,
  },
  yuBubbleWrapper: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'flex-end', 
  },
  button: {
    backgroundColor: '#C6F1FF',
    padding: 8,
    borderRadius: 20,
    marginVertical: 5,
    width: SCREEN_WIDTH * 0.7,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
  },
  buttonsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignItems: 'center',
  },

});

export default MessagingWithYuOnboarding;