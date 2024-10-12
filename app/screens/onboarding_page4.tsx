import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgressBar from '../components/progress_bar';
import BigYuOnboarding from '../components/big_yu_onboarding';

const OnboardingPage2 = () => (
  <View style={styles.appContainer}>
    <ProgressBar progress={20} />
    <BigYuOnboarding text="Here's How it'll Work..." />
    <View style={styles.continue_button_container}> {/* wrap these in a View */}
      <Text style={styles.continue_button_text}>Continue</Text>
    </View>
  </View>
);

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

export default OnboardingPage2;