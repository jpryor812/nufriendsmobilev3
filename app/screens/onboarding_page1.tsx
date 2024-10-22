/*
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import OnboardingPage2 from './screens/onboarding_page2';
import ProgressBar from './components/progress_bar';
import BigYuOnboarding from './components/big_yu_onboarding';

const Stack = createStackNavigator();

const OnboardingNav1 = ({ navigation }: { navigation: any }) => (
  <View style={styles.appContainer}>
    <ProgressBar progress={5} />
    <BigYuOnboarding text="Hi! I'm Yu." />

    <TouchableOpacity
      style={styles.continue_button_container}
      onPress={() => navigation.navigate('OnboardingPage2')}
    >
      <Text style={styles.continue_button_text}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const OnboardingPage1 = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingPage2" component={OnboardingPage2} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#F0FCFE',
  },
  continue_button_container: {
    width: '90%',
    height: '6%',
    backgroundColor: '#6ECFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  continue_button_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default OnboardingPage1;

*/

import React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <SafeAreaView style={styles.progress_bar_container}>
      <View style={styles.progress_bar_image_container}>
        <Image
          source={require('../assets/yu_progress_bar.png')}
          style={styles.yu_progress_bar}
        />
        <Image
          source={require('../assets/mail_progress_bar.png')}
          style={styles.mail_progress_bar}
        />
        <Image
          source={require('../assets/yu_progress_bar.png')}
          style={styles.yu_progress_bar}
        />
        <Image
          source={require('../assets/hand_progress_bar.png')}
          style={styles.hand_progress_bar}
        />
        <Image
          source={require('../assets/Yu_excited_no_speech.png')}
          style={styles.yu_progress_bar}
        />
      </View>
      <View style={styles.progress_bar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </SafeAreaView>   
  );
};


const styles = StyleSheet.create({

  progress_bar_container: {
    alignItems: 'center', // Center the container content
    width: '90%',
    marginTop: '-10%'
  },
  progress_bar: {
    height: 20,
    width: '90%',
    backgroundColor: '#FeFeFe',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'flex-start',
    borderColor: '#42ade2',
    borderWidth: 1,
  },
  progress: {
    height: '100%',
    backgroundColor: '#42ade2',
    borderRadius: 10,
  },
  progress_bar_image_container:
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: -50,
      width: '90%'
    },
  yu_progress_bar: {
    width: 20,
    resizeMode: 'contain',
  },
  mail_progress_bar: {
    width: 18,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: -20,
  },
  hand_progress_bar: {
    width: 20,
    resizeMode: 'contain',
    marginLeft: 20,
  },
});

export default ProgressBar;