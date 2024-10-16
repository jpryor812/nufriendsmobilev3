import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Animated } from 'react-native';
interface Message {
  id: string;
  text: string;
  isSent: boolean;
  opacity?: Animated.Value;
}
interface MessageContainerProps {
  messages: Message[];
  style?: object;
}
const MessageContainer: React.FC<MessageContainerProps> = ({ messages, style }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };
  return (
    <View style={[styles.container, style]}>
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((message) => (
          <Animated.View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isSent ? styles.sentWrapper : styles.receivedWrapper,
              { opacity: message.opacity || 1 },
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
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  messageWrapper: {
    flexDirection: 'row',
    padding: 10,
  },
  sentWrapper: {
    justifyContent: 'flex-end',
  },
  receivedWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
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