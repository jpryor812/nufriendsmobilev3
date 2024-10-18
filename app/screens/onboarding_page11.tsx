import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import ProgressBar from '../components/progress_bar';
import OnboardingQ1 from './onboarding_q1';
import BigYuOnboarding from '../components/big_yu_onboarding';

const Stack = createStackNavigator();

const OnboardingPage11 = ({navigation}: {navigation: any}) => (
  <View style={styles.appContainer}>
    <ProgressBar progress={10} />
    <BigYuOnboarding text="So, please answer the following ten questions with as much detail as you can, and you'll have five new friends in just a few minutes!!" />
    <TouchableOpacity
      style={styles.continue_button_container}
      onPress={() => navigation.navigate('Onboarding_q1')}> 
      <Text style={styles.continue_button_text}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const OnboardingNavigator11 = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingPage11">
      <Stack.Screen name="OnboardingPage11" component={OnboardingPage11} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingQ1" component={OnboardingQ1} options={{ headerShown: false }} />
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

export default OnboardingNavigator11;