import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface YuBubbleProps {
  text: string;
}

const YuBubble: React.FC<YuBubbleProps> = ({ text }) => {
  return (
    <View style={styles.bubbleContainer}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    alignSelf: 'flex-start',
    marginLeft: 50,
    marginBottom: -60,
  },
  bubble: {
    backgroundColor: '#F9FEFF',
    borderColor: '#C6F1FF',
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 9,
    maxWidth: '60%',
    borderBottomLeftRadius: 0,
  },
  bubbleText: {
    color: '#b2b2b2',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
});

export default YuBubble;