import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBar from '../components/progress_bar';
import BigYuOnboarding from '../components/big_yu_onboarding';
import OnboardingPage5 from './onboarding_page5';


const Stack = createStackNavigator();

const OnboardingPage4 = ({navigation}: {navigation: any}) => (
  <View style={styles.appContainer}>
    <ProgressBar progress={20} />
    <BigYuOnboarding text="Here's How it'll Work..." />
    <TouchableOpacity style={styles.continue_button_container}
      onPress={() => navigation.navigate('OnboardingPage5')}>
      <Text style={styles.continue_button_text}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const OnboardingNavigator4 = () => {
  return(
    <Stack.Navigator initialRouteName="OnboardingPage4">
      <Stack.Screen name="OnboardingPage4" component={OnboardingPage4} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingPage5" component={OnboardingPage5} options={{ headerShown: false }} />
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

export default OnboardingNavigator4;