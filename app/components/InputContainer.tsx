import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

interface InputContainerProps {
  onSendMessage: (message: string) => void;
  onHeightChange: (height: number) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({ onSendMessage, onHeightChange }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    onHeightChange(inputHeight + 20); // 20 for padding
  }, [inputHeight, onHeightChange]);

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
    <View style={[styles.inputContainer, { height: inputHeight + 20 }]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '95%',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
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