import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

// Define the structure of a message
interface Message {
  id: string;
  text: string;
  isSent: boolean;
}

// Props for the MessageContainer component
interface MessageContainerProps {
  messages: Message[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isSent ? styles.sentWrapper : styles.receivedWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isSent ? styles.sentBubble : styles.receivedBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isSent ? styles.sentText : styles.receivedText,
                ]}
              >
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height * 0.5, // 50% of screen height
    width: '95%',
    borderColor: '#ccc',
    borderRadius: 20,
    margin: 10,
  },
  scrollContent: {
    padding: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sentWrapper: {
    justifyContent: 'flex-end',
  },
  receivedWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
  },
  sentBubble: {
    backgroundColor: '#4EBCEF',
    borderBottomRightRadius: 0,
  },
  receivedBubble: {
    backgroundColor: '#ECECEC',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {
    color: '#F1F3F5',
  },
  receivedText: {
    color: '#000',
  },
});

export default MessageContainer;