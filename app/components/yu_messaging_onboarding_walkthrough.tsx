import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const BigYuOnboardingMessages = ({ text }: { text:string }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/big_yu_question_onboarding.png')}
        style={styles.big_yu_question_onboarding_side}
        resizeMode='contain' />
          <View style={styles.big_yu_chat_bubble_container_side}>
              <Image
                  source={require('../assets/images/yu_chat_bubble_side.png')}
                  style={styles.big_yu_chat_bubble_side}
                  resizeMode='contain' />
              <Text style={styles.big_yu_text}>{text}</Text>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  big_yu_chat_bubble_container_side: {
    flexDirection: 'row', // Changed to 'row' to align children horizontally
    justifyContent: 'center',
    alignItems: 'center',
  },
  big_yu_chat_bubble_side: {
    width: 230,
    height: 130,
  },
  big_yu_question_onboarding_side: {
    width: 100,
    height: 120,
  },
  big_yu_text: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#42ade2', // move text to vertically center
    width: '75%',// move text to horizontally center // centering text
  },

});


export default BigYuOnboardingMessages;