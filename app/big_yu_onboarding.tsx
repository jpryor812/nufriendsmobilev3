import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

const BigYuOnboarding = () => {
  return (
    <View style={styles.container}>
          <View style={styles.big_yu_chat_bubble_container}>
              <Image
                  source={require('./assets/images/yu_chat_bubble.png')}
                  style={styles.big_yu_chat_bubble}
                  resizeMode='contain' />
              <Text style={styles.big_yu_text}>Hi! I'm Yu.</Text>
            <Image
              source={require('./assets/images/big_yu_question_onboarding.png')}
              style={styles.big_yu_question_onboarding}
              resizeMode='contain' />
          </View>
      <View style={styles.continue_button_container}>
        <Text style={styles.continue_button_text}>Continue</Text>
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
    width: 250,
    height: 175,
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#42ade2', // move text to vertically center
    left: '45%',
    marginBottom: '35%',// move text to horizontally center // centering text
  },
  continue_button_container:{
    width: '90%',
    height: '6%',
    backgroundColor: '#6ECFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  continue_button_text:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  }
});


export default BigYuOnboarding;