import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBar from './progress_bar';
import BigYuOnboarding from './big_yu_onboarding';


const App = () => (
    <View style={styles.appContainer}>
            <ProgressBar progress={5} /> {/* Example with 50% progress */}
            <BigYuOnboarding />
        </View>
);

const styles = StyleSheet.create({
  
  appContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Centers the ProgressBar container vertically
    alignItems: 'center', // Centers the ProgressBar container horizontally
    marginTop: 0,
    backgroundColor: '#F0FCFE',
  },
});

export default App;