import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBar from '../components/progress_bar';
import BigYuOnboarding from '../components/big_yu_onboarding';
import OnboardingPage4 from './onboarding_page4';

const Stack = createStackNavigator();

const OnboardingPage3 = ({navigation}: {navigation: any}) => (
  <View style={styles.appContainer}>
    <ProgressBar progress={15} />
    <BigYuOnboarding text="I'm Your Little Companion to Help You Through Conversations if Needed"/>
    <TouchableOpacity
    style={styles.continue_button_container}
    onPress={() => navigation.navigate('OnboardingPage4')}>  
      <Text style={styles.continue_button_text}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const OnboardingNavigator2 = () => {
  return(
    <Stack.Navigator initialRouteName="OnboardingPage3">
      <Stack.Screen name="OnboardingPage3" component={OnboardingPage3} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingPage4" component={OnboardingPage4} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

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

export default OnboardingNavigator2;