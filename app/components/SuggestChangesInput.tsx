import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

interface SuggestChangesInputProps {
  onSuggestChanges: (text: string) => void;
  onHeightChange: (height: number) => void;
}

const SuggestChangesInput: React.FC<SuggestChangesInputProps> = ({ onSuggestChanges, onHeightChange }) => {
  const [suggestedText, setSuggestedText] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const inputRef = useRef<TextInput>(null);

  const handleContentSizeChange = (event: any) => {
    const newHeight = Math.min(100, Math.max(40, event.nativeEvent.contentSize.height));
    setInputHeight(newHeight);
    onHeightChange(newHeight + 20); // 20 for padding
  };

  const handleSuggestChanges = () => {
    if (suggestedText.trim()) {
      onSuggestChanges(suggestedText.trim());
      setSuggestedText('');
      setInputHeight(40);
    }
  };

  return (
    <View style={[styles.inputContainer, { height: inputHeight + 20 }]}>
      <TextInput
        ref={inputRef}
        style={[styles.input, { height: inputHeight }]}
        value={suggestedText}
        onChangeText={setSuggestedText}
        placeholder="Suggest changes..."
        placeholderTextColor="#999"
        multiline
        onContentSizeChange={handleContentSizeChange}
      />
      <TouchableOpacity style={styles.suggestButton} onPress={handleSuggestChanges}>
        <Text style={styles.suggestButtonText}>Suggest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    backgroundColor: '#FFF',
    borderRadius: 80,
    borderWidth: 10,
    borderColor: '#F0FCFE',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 13,
    marginRight: 1,
    borderWidth: 2,
    borderColor: '#F2F2F2'
  },
  suggestButton: {
    backgroundColor: '#f2ecbb',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F2F2F2'
  },
  suggestButtonText: {
    color: '#333',
    fontSize: 13,
    fontWeight: 'bold',
    
  },
});

export default SuggestChangesInput;