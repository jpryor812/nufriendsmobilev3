import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform, Keyboard, Animated, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface InputContainerProps {
  onSendMessage: (message: string) => void;
  onHeightChange: (height: number) => void;
  width?: string | number;
  maxHeight?: number;
}

const InputContainer: React.FC<InputContainerProps> = ({ onSendMessage, onHeightChange }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const inputContainerPosition = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    onHeightChange(inputHeight + 20); // 20 for padding
  }, [inputHeight, onHeightChange]);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide
    );
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const keyboardWillShow = (event: any) => {
    Animated.timing(inputContainerPosition, {
      toValue: -event.endCoordinates.height,
      duration: event.duration || 250,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide = (event: any) => {
    Animated.timing(inputContainerPosition, {
      toValue: 0,
      duration: event.duration || 250,
      useNativeDriver: false,
    }).start();
  };

  const handleContentSizeChange = (event: any) => {
    const newHeight = Math.min(100, Math.max(40, event.nativeEvent.contentSize.height));
    setInputHeight(newHeight);
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
      setInputHeight(40);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.inputContainer, 
        { 
          height: inputHeight + 20,
          bottom: inputContainerPosition.interpolate({
            inputRange: [-SCREEN_HEIGHT, 0],
            outputRange: [0, '2%'],
            extrapolate: 'clamp',
          })
        }
      ]}
    >
      <TextInput
        ref={inputRef}
        style={[styles.input, { height: inputHeight }]}
        value={inputMessage}
        onChangeText={setInputMessage}
        placeholder="Type a message..."
        placeholderTextColor="#999"
        multiline
        onContentSizeChange={handleContentSizeChange}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 10,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    fontSize: 16,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4EBCEF',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InputContainer;