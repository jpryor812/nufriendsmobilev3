import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MockMessagesYu from './screens/onboarding_mock_messages_yu';
import RelationshipTracker from './screens/relationship_tracker';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MockMessagesYu" component={MockMessagesYu} />
      <Stack.Screen name="RelationshipTracker" component={RelationshipTracker} />
    </Stack.Navigator>
  );
};