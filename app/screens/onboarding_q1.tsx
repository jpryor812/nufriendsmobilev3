import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import ProgressBar from '../components/progress_bar';
import OnboardingQ2 from './onboarding_q1';
import BigYuOnboarding from '../components/big_yu_onboarding';

const Stack = createStackNavigator();

const OnboardingQ1 = ({navigation}: {navigation: any}) => (
  <View style={styles.appContainer}>
    <ProgressBar progress={10} />
    <BigYuOnboarding text="Question 1: {'\n'} Where are you from? Was there anything you liked or disliked about your hometown?" />
    <TouchableOpacity
      style={styles.continue_button_container}
      onPress={() => navigation.navigate('OnboardingPage11')}> 
      <Text style={styles.continue_button_text}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const OnboardingNavigatorQ1 = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingQ1">
      <Stack.Screen name="OnboardingQ1" component={OnboardingQ1} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingQ1" component={OnboardingQ2} options={{ headerShown: false }} />
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

export default OnboardingNavigatorQ1;