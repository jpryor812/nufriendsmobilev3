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