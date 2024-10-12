import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import ProgressBar from '../components/progress_bar';
import OnboardingPage3 from './onboarding_page3';
import BigYuOnboarding from '../components/big_yu_onboarding';

const Stack = createStackNavigator();

const OnboardingPage2 = ({navigation}: {navigation: any}) => (
  <View style={styles.appContainer}>
    <ProgressBar progress={10} />
    <BigYuOnboarding text="Yu. Not You, But Kinda You..." />
    <TouchableOpacity
      style={styles.continue_button_container}
      onPress={() => navigation.navigate('OnboardingPage3')}> 
      <Text style={styles.continue_button_text}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingPage2">
      <Stack.Screen name="OnboardingPage2" component={OnboardingPage2} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingPage3" component={OnboardingPage3} options={{ headerShown: false }} />
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

export default OnboardingNavigator;