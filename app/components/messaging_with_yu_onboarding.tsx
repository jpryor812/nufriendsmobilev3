import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Image, TouchableOpacity, Animated, Text, TextInput } from 'react-native';
import ProgressBar from './progress_bar';
import MessageContainer from './MessageContainer';
import InputContainer from './InputContainer';
import FriendProfile from './friend_profile';
import YuBubble from './YuBubble';
import SuggestChangesInput from './SuggestChangesInput';

/* build componenets that do their own animations and then bring them all into the screen with animations */

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
  onFriendProfilePress: () => void; 
}

const MessagingWithYuOnboarding: React.FC<MessagingWithYuOnboardingProps> = ({ 
  progress, 
  initialMessages, 
  friend,
  onFriendProfilePress,
}) => {
  const buttons = [
     'Ask JPP123 what he likes to do for fun',
     'Tell JPP123 why you are staying in Pittsburgh',
     'Ask JPP123 what he does for fun in Worcester', 
     'Something else???'];
  const preWrittenResponses = [
     'Ask JPP123 what he likes to do for fun',
     'Tell JPP123 why you are staying in Pittsburgh',
    "I'm curious about what you do for fun in Worcester. Any favorite spots or activities? I've never been to Worcester before, so I'm curious about what you like to do there.",
  'Something else???'];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputContainerHeight, setInputContainerHeight] = useState(60);
  const [isExpanded, setIsExpanded] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const messageContainerAnim = useRef(new Animated.Value(1)).current; // Changed to use a multiplier
  const buttonsAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const inputContainerAnim = useRef(new Animated.Value(0)).current;
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const buttonAnimations = useRef(buttons.map(() => new Animated.Value(0))).current;
  const selectedButtonAnim = useRef(new Animated.Value(0)).current;
  const yuChatBubbleOpacity = useRef(new Animated.Value(1)).current;
  const [buttonPositions, setButtonPositions] = useState<number[]>([]);
  const yuImagePositionAnim = useRef(new Animated.Value(0)).current;
  const [selectedButtonText, setSelectedButtonText] = useState('');
  const textBoxAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [showActionButtons, setShowActionButtons] = useState(false);
  const actionButtonsAnim = useRef(new Animated.Value(300)).current;
  const [suggestedText, setSuggestedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showFourStatements, setShowFourStatements] = useState(false);
  const [showYuChatBubbleTwo, setShowYuChatBubbleTwo] = useState(false);
  const yuChatBubbleOpacityTwo = useRef(new Animated.Value(0)).current;
  const yuChatBubbleTwoTextOpacity = useRef(new Animated.Value(1)).current;
  const [showPointer, setShowPointer] = useState(false);
  const pointerOpacity = useRef(new Animated.Value(0)).current;
  const [showNewPointer, setShowNewPointer] = useState(false);
  const newPointerOpacity = useRef(new Animated.Value(0)).current;
  const [showNewTextBox, setShowNewTextBox] = useState(false);
  const newTextBoxOpacity = useRef(new Animated.Value(0)).current;
  
  const textInputRef = useRef<TextInput>(null);

  const handleSuggestChanges = (text: string) => {
    console.log('Suggested changes:', text);
    // Handle the suggested changes here
  };
  const handleSuggestionInputHeightChange = (height: number) => {
    // Handle height changes if needed
  };

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      text: message,
      isSent: true,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setShowPointer(false);

    Animated.timing(yuChatBubbleTwoTextOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After the animation is complete, you might want to hide the bubble entirely
      setShowYuChatBubbleTwo(false);
    });

    Animated.timing(pointerOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleInputHeightChange = useCallback((height: number) => {
    setInputContainerHeight(height);
  }, []);

  const handleYuImageClick = () => {
    setIsExpanded(!isExpanded);
    setShowFourStatements(true);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isExpanded ? 0 : SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
  Animated.timing(messageContainerAnim, {
    toValue: isExpanded ? 1 : 0.67, // Animate to 3/4 of original size
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

  const handleButtonSelect = (index: number) => {
    setSelectedButton(index);
    setSelectedButtonText('');
    setShowSelectedText(false);
    setShowActionButtons(false);
    setShowPointer(false);

    setTimeout(() => {
      setSelectedButtonText(preWrittenResponses[index]);
      setShowSelectedText(true);
      setShowActionButtons(true);
      // Update this part to use yuChatBubbleOpacityTwo
      setTimeout(() => {
        setShowYuChatBubbleTwo(true);
        Animated.timing(yuChatBubbleOpacityTwo, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2000);
    }, 1600);

    setTimeout(() => {
      setShowPointer(true);
      Animated.timing(pointerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 10000); // Show pointer after 10 seconds

    // Animate unselected buttons off screen
    buttonAnimations.forEach((anim, i) => {
      if (i !== index) {
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
    // Animate selected button to top
    Animated.timing(selectedButtonAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    // Fade out Yu chat bubble
    Animated.timing(yuChatBubbleOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    Animated.timing(textBoxAnim, {
      toValue: -80,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(yuImagePositionAnim, {
      toValue: -30, // Adjust this value to move the image to the desired position
      duration: 300,
      useNativeDriver: true,
    }).start();

setTimeout(() => {
  setSelectedButtonText(preWrittenResponses[index]);
  setShowSelectedText(true);
  setShowActionButtons(true);
  // Show the chat bubble after another delay
  setTimeout(() => {
    setShowYuChatBubbleTwo(true);
    Animated.timing(yuChatBubbleOpacityTwo, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, 2000); // Show bubble 2 seconds after the buttons are shown
}, 1300); // 1000ms for the slide-up animation + 300ms delay
};

  Animated.timing(actionButtonsAnim, {
    toValue: -60, // Adjust this value to position the buttons below the text box
    duration: 1600,
    useNativeDriver: true,
  }).start();
  
  const [showSelectedText, setShowSelectedText] = useState(false);

  // Calculate the initial height for MessageContainer
  const initialMessageContainerHeight = SCREEN_HEIGHT - 
    (60 + 50 + 10 + // ProgressBar height (estimate) + FriendProfile height (estimate)
     inputContainerHeight);
  // Use messageContainerAnim to dynamically adjust the height
  const messageContainerHeight = messageContainerAnim.interpolate({
    inputRange: [0.75, 1],
    outputRange: [initialMessageContainerHeight * 0.67, initialMessageContainerHeight]
  });

  const renderButtons = () => {
    return buttons.map((button, index) => {
      const slideOut = buttonAnimations[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1000]
      });
      const moveToTop = selectedButtonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -buttonPositions[index]]
      });
      return (
        <Animated.View
          key={index}
          style={[
            styles.button,
            { 
              transform: [
                { translateY: selectedButton === index ? moveToTop : slideOut }
              ],
              opacity: selectedButton === null || selectedButton === index ? 1 : 0
            }
          ]}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setButtonPositions(prev => {
              const newPositions = [...prev];
              newPositions[index] = layout.y;
              return newPositions;
            });
          }}
        >
          <TouchableOpacity onPress={() => handleButtonSelect(index)}>
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    });
  };

  const textOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (showSelectedText) {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      textOpacity.setValue(0);
    }
  }, [showSelectedText]);
  const renderTextBox = () => {
    if (selectedButton === null) return null;
    return (
      <Animated.View
        style={[
          styles.textBox,
          {
            transform: [
              { translateY: textBoxAnim }
            ]
          }
        ]}
      >
        {isEditing ? (
          <TextInput
            ref={textInputRef}
            style={styles.textBoxText}
            value={selectedButtonText}
            onChangeText={setSelectedButtonText}
            multiline
            autoFocus
          />
        ) : (
          <Animated.Text 
            style={[
              styles.textBoxText,
              { opacity: textOpacity }
            ]}
          >
            {selectedButtonText}
          </Animated.Text>
        )}
      </Animated.View>
    );
  };

  const renderActionButtons = () => {
    if (!showActionButtons) return null;
    const handleEditPress = () => {
      setIsEditing(true);
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    };
    const handleSendPress = () => {
      if (selectedButtonText.trim()) {
        const newMessage: Message = {
          id: String(messages.length + 1),
          text: selectedButtonText.trim(),
          isSent: true,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        Animated.timing(yuChatBubbleTwoTextOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // After the animation is complete, hide the bubble entirely
          setShowYuChatBubbleTwo(false);

        setTimeout(() => {
          setShowNewPointer(true);
          setShowNewTextBox(true);
          Animated.parallel([
            Animated.timing(newPointerOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(newTextBoxOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            })
          ]).start();
        }, 1000);
        });
        // Fade out the pointer if it's showing
        setShowPointer(false);
        Animated.timing(pointerOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Reset states and animations after sending
        handleGoBack(true);
      }
    };
    return (
      <Animated.View 
        style={[
          styles.actionButtonsContainer,
          {
            transform: [{ translateY: actionButtonsAnim }]
          }
        ]}
      >
        <TouchableOpacity style={styles.actionButton} onPress={handleEditPress}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleGoBack}>
          <Text style={styles.actionButtonText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleSendPress}>
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const handleFinishEdit = () => {
    setIsEditing(false);
  };

  const handleGoBack = (keepMessages: boolean = false) => {
    // Reset states
    setSelectedButton(null);
    setSelectedButtonText('');
    setShowSelectedText(false);
    setShowActionButtons(false);
    setIsEditing(false);
    if (!keepMessages) {
      // Reset messages to initial state only if keepMessages is false
      setMessages(initialMessages);
    }
    // Revert animations
    Animated.parallel([
      // Fade in Yu chat bubble
      Animated.timing(yuChatBubbleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Move text box back down
      Animated.timing(textBoxAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      // Move Yu image back to original position
      Animated.timing(yuImagePositionAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // Move action buttons back down
      Animated.timing(actionButtonsAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }),
      // Reset selected button animation
      Animated.timing(selectedButtonAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    // Reset button animations
    buttonAnimations.forEach((anim) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackToTextBox = () => {
    setIsExpanded(false);
    setShowFourStatements(false);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(messageContainerAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(buttonsAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(inputContainerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const BackToTextBoxButton = () => (
    <TouchableOpacity
      style={styles.backToTextBoxButton}
      onPress={handleBackToTextBox}
    >
      <Text style={styles.backToTextBoxButtonText}>Go back to text box</Text>
    </TouchableOpacity>
  );

  const YuChatBubbleTwo = () => (
    <Animated.View style={[styles.yuChatBubbleTwo, { opacity: yuChatBubbleOpacityTwo }]}>
      <Animated.Text style={[styles.yuChatBubbleTwoText, { opacity: yuChatBubbleTwoTextOpacity }]}>
        This is a conversation topic I created on your behalf. You can edit the message yourself, suggest changes for me like to be funnier or more personable, and then, when you're happy with it, you can hit send! {'\n\n'}Of course, you can go back to the text box if you'd like to say something yourself.{'\n\n'}Let's hit SEND on this message. Don't worry, this message goes to the CEO of nufriends, one of your new friends!
      </Animated.Text>
    </Animated.View>
  );




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
            onPress={onFriendProfilePress}
          />
        )}
      </View>
      {showNewPointer && (
        <Animated.View style={[styles.newPointer, { opacity: newPointerOpacity }]}>
          <Image
            source={require('../assets/images/point_up_2.png')}
            style={styles.newPointerImage}
          />
        </Animated.View>
      )}
      <Animated.View style={[styles.messageContainerWrapper, { height: messageContainerHeight }]}>
        <MessageContainer messages={messages} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.yuBubbleWrapper, 
          { 
            transform: [{ translateY: slideAnim }],
            opacity: yuChatBubbleOpacity
          }
        ]}
      >
        <YuBubble text="Click on me here to see suggestions" />
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
    {showPointer && (
      <Animated.View style={[styles.pointer, { opacity: pointerOpacity,
                                              zIndex: 1000,
                                              elevation: 1000,}]}>
        <Image
          source={require('../assets/images/point_up_2.png')}
          style={styles.pointerImage}
        />
      </Animated.View>
    )}
  </Animated.View>
      <Animated.View style={[styles.bottomContainer, { transform: [{ translateY: buttonsAnim }] }]}>
        {showFourStatements && <BackToTextBoxButton />}
        <Animated.View style={[
          styles.yuImageContainer,
          {
            transform: [{ translateY: yuImagePositionAnim }]
          }
        ]}>
          {showNewTextBox && (
            <Animated.View style={[styles.newTextBox, { opacity: newTextBoxOpacity }]}>
              <Text style={styles.newTextBoxText}>Now click on the profile</Text>
            </Animated.View>
          )}
          {showYuChatBubbleTwo && <YuChatBubbleTwo />}
          <Image
            source={require('../assets/images/yu_question_onboarding.png')}
            style={styles.yuImageBottom}
          />
          <Animated.View style={[styles.yuChatBubble, { opacity: yuChatBubbleOpacity }]}>
            <Text style={styles.yuChatBubbleText}>Click a button to continue</Text>
          </Animated.View>
        </Animated.View>
        <View style={styles.buttonsContainer}>
          {renderButtons()}
        </View>
        {renderTextBox()}
        {renderActionButtons()}
{showActionButtons && (
        <Animated.View 
          style={[
            styles.suggestionContainer,
            {
              transform: [{ translateY: actionButtonsAnim }],
            }
          ]}
        >
          <SuggestChangesInput
            onSuggestChanges={handleSuggestChanges}
            onHeightChange={handleSuggestionInputHeightChange}
          />
        </Animated.View>
      )}
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
  yuImageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  yuChatBubble: {
    position: 'absolute',
    top: -60, // Adjust this value to position the bubble vertically
    left: 5, // Adjust this value to position the bubble horizontally
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 6,
    borderColor: '#C6F1FF',
    borderWidth: 1,
    width: 65,
  },
  yuChatBubbleText: {
    fontSize: 10,
    color: '#42ade2',
    fontWeight: 'bold',
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
  inputContainer: {
    position: 'absolute',
    left: '5%',
    right: '5%',
    bottom: '2%',  // This will position it 2% from the bottom
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    width: '90%',
    marginTop: 30,
    marginRight: 40,
    zIndex: 10,
  },
  yuBubbleWrapper: {
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 10,
    alignItems: 'flex-end', 
  },
  button: {
    backgroundColor: '#C6F1FF',
    padding: 8,
    borderRadius: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#333',
    fontSize: 13,
  },
  buttonsContainer: {
    position: 'absolute',
    right: 2,
    bottom: 10,
    alignItems: 'flex-start',
    height: SCREEN_HEIGHT * 0.40,
    justifyContent: 'flex-start',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH * 0.96,
    height: SCREEN_HEIGHT * 0.33,
  },
  yuImageBottom: {
    width: 80,
    height: 80,
    marginRight: 4,
    marginBottom: 20,
    marginLeft: 1,
  },
  yuQuestionImage:{
    width: 70,
    height: 70,
  },
  textBox: {
    position: 'absolute',
    left: 80,
    right: 0,
    bottom: 60,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,    
    borderWidth: 2,
    borderColor: '#f2ecbb',
    
  },
  textBoxText: {
    height: 65,
    textAlignVertical: 'top',
    fontSize: 13,
    color: '#6d6d6d',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 35,
    width: '100%',
    paddingHorizontal: 60,
    position: 'absolute',
    bottom: 35, 
  },
  actionButton: {
    backgroundColor: '#f2ecbb',
    padding: 8,
    borderRadius: 20,
    width: '31%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 12,
  },
  suggestionContainer: {
    position: 'absolute',
    top: 200,
    left: 65,
    right: -5,
  },
  backToTextBoxButton: {
    position: 'absolute',
    top: 130,
    left: 10,
    backgroundColor: '#fff4cf',
    padding: 6,
    borderRadius: 20,
    width: '15%',
    zIndex: 1,
  },
  backToTextBoxButtonText: {
    color: '#333',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yuChatBubbleTwo: {
    position: 'absolute',
    top: -250, // Position above the Yu image
    width: '400%',
    left: 20,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    borderColor: '#C6F1FF',
    borderWidth: 1,
    borderBottomLeftRadius: 0,
    zIndex: 1,
    color: '#42ade2',
    fontWeight: 'bold',
  },
  yuChatBubbleTwoText: {
    color: '#42ade2',
    fontWeight: 'bold',
    fontSize: 12.5,
  },
  pointer: {
    position: 'absolute',
    bottom: 535, // Adjust this value to position the pointer above the send button
    right: 20, // Adjust this value to align with the send button
    zIndex: 480,
  },
  pointerImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    zIndex: 480,
  },
  newPointer: {
    position: 'absolute',
    top: 100, // Adjust this value to position the pointer below the friend profile
    alignSelf: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  newPointerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  newTextBox: {
    position: 'absolute',
    top: -100,
    width: '80%',
    left: 10,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 8,
    borderColor: '#C6F1FF',
    borderWidth: 1,
    zIndex: 1000,
    elevation: 1000,
  },
  newTextBoxText: {
    color: '#42ade2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MessagingWithYuOnboarding;