import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const BigYuOnboarding = ({ text }: { text:string }) => {
  return (
    <View style={styles.container}>
          <View style={styles.big_yu_chat_bubble_container}>
              <Image
                  source={require('../assets/images/yu_chat_bubble.png')}
                  style={styles.big_yu_chat_bubble}
                  resizeMode='contain' />
              <Text style={styles.big_yu_text}>{text}</Text>
            <Image
              source={require('../assets/images/big_yu_question_onboarding.png')}
              style={styles.big_yu_question_onboarding}
              resizeMode='contain' />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  big_yu_chat_bubble_container: {
    position: 'relative',
    justifyContent: 'center', // center item vertically
    alignItems: 'center', // center item horizontally
  },
  big_yu_chat_bubble: {
    width: 275,
    height: 210,
    marginLeft: '40%',
    marginBottom: '-15%',
    marginTop: '40%',
  },
  big_yu_question_onboarding: {
    width: 185,
    height: 185,
    marginRight: '60%',  
  },
  big_yu_text: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#42ade2', // move text to vertically center
    left: '37.5%',
    marginBottom: '32.5%',
    width: '70%',// move text to horizontally center // centering text
  },

});


export default BigYuOnboarding;