import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import ProgressBar from '../components/progress_bar';
import BigYuOnboarding from '../components/big_yu_onboarding';
import { createStackNavigator } from '@react-navigation/stack';
import MockMessages from './onboarding_mock_messages';

const Stack = createStackNavigator();

const OnboardingPage5Navigator = () => (
    <Stack.Navigator initialRouteName="OnboardingPage5">
      <Stack.Screen
        name="OnboardingPage5"
        component={OnboardingPage5}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MockMessages"
        component={MockMessages}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
);

const OnboardingPage5 = ({ navigation })=> {
  const [displayedFriendsCount, setDisplayedFriendsCount] = useState(0);
  const [yuFindingText, setYuFindingText] = useState("I'll Find Five Friends You'll Build a Connection With");
  const slidePosition = useRef(new Animated.Value(0)).current;
  const showNewComponents = useRef(new Animated.Value(500)).current;
  const pointerOpacity = useRef(new Animated.Value(0)).current;
  const pointerAnimation = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.timing(pointerOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pointerOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    )
  ).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(slidePosition, {
        toValue: 900,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(showNewComponents, {
            toValue: -500,
            duration: 600,
            useNativeDriver: true,
          }).start();
        }, 1000);
      });
    }, 2500);

    const pointerTimer = setTimeout(() => {
      pointerAnimation.start(); // Start the looped pointer animation here
    }, 14000);
    
    const textChangeTimer = setTimeout(() => {
      setYuFindingText("You'll click on one...");  // Change the text after 12 seconds
    }, 13000);
    
    // Fix cleanup
    return () => {
      clearTimeout(timer);
      clearTimeout(pointerTimer);
      clearTimeout(textChangeTimer);
      pointerAnimation.stop();
    };
  }, []); // Added `pointerOpacity` if needed for recalculations

  return (
    <View style={styles.appContainer}>
      <ProgressBar progress={25} />
      <Animated.View style={{ transform: [{ translateY: slidePosition }] }}>
        <BigYuOnboarding text="After You Answer Some Questions to Help us Get to Know You..." />
      </Animated.View>
      <Animated.View
        style={[styles.newComponentContainer, { transform: [{ translateY: showNewComponents }] }]}
      >
        <View style={styles.yu_finding_friends_container}>
          <Image
            source={require('../assets/images/yu_searching_chat_bubble.png')}
            style={styles.yu_searching_chat_bubble}
            resizeMode="contain"
          />
          <Text style={styles.yu_finding_friends_text}>
            {yuFindingText}
          </Text>
          <Image
            source={require('../assets/images/yu_searching1.png')}
            style={styles.yu_searching1}
            resizeMode="contain"
          />
        </View>
        <View style={styles.searching_container}>
          <Image
            source={require('../assets/images/magnifying_glass_emoji.png')}
            style={styles.magnifying_glass_emoji}
            resizeMode="contain"
          />
          <Text style={styles.searching_text}>Searching...</Text>
        </View>
        <View style={styles.total_friend_found_container}>
          <View style={styles.friend_counter_container}>
            <Text style={styles.friend_counter}>Found {displayedFriendsCount}/5 Friends so far</Text>
          </View>
        </View>
        <ScrollableContainer
          displayedFriendsCount={displayedFriendsCount}
          setDisplayedFriendsCount={setDisplayedFriendsCount}
          pointerOpacity={pointerOpacity}
          pointerAnimation={pointerAnimation}
          navigation={navigation}
        />
      </Animated.View>
    </View>
  );
};

const ScrollableContainer = ({ navigation, displayedFriendsCount, setDisplayedFriendsCount, pointerOpacity, pointerAnimation }) => {
  const friendContainers = [
    { image: require('../assets/images/profile picture.jpg'), name: 'Jpp123' },
    { image: require('../assets/images/asian_girl_avatar.jpg'), name: 'AlexD33' },
    { image: require('../assets/images/profile3-500x500.png'), name: 'AJones01' },
    { image: require('../assets/images/profile2-500x500.png'), name: 'OnDeck02' },
    { image: require('../assets/images/profile-800x800.png'), name: 'PChak55' },
  ];

  const animatedValues = useRef(friendContainers.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const initialDelay = 6000;
    friendContainers.forEach((friend, index) => {
      setTimeout(() => {
        Animated.timing(animatedValues[index], {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          setDisplayedFriendsCount((prevCount) => Math.min(prevCount + 1, 5));
        });
      }, initialDelay + index * 1500);
    });
  }, [animatedValues]);

  const handleProfilePictureClick = () => {
    pointerAnimation.stop();
    navigation.navigate('MockMessages');
    // Handle additional logic for click
  };

return (
  <ScrollView style={styles.scrollView}>
    {friendContainers.map((friend, index) => (
      <Animated.View
        key={friend.name}
        style={[
          styles.found_friend_container,
          { opacity: animatedValues[index] },
        ]}
      >
        <TouchableOpacity onPress={friend.name === 'Jpp123' ? handleProfilePictureClick : null}>
          <Image
            source={friend.image}
            style={styles.profile_picture}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.profile_name_text}>{friend.name}</Text>
        {friend.name === 'Jpp123' &&
          <Animated.Image
            source={require('../assets/images/point_up_2.png')}
            style={[
              styles.pointer_finger,
              { opacity: pointerOpacity }, // Bind pointer's opacity
            ]}
            resizeMode="contain"
          />
        }
      </Animated.View>
    ))}
  </ScrollView>
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
  yu_finding_friends_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yu_searching_chat_bubble:{
    width: 220,
    height: 115,
    position: 'relative',
    marginBottom: -10,
    marginTop: 15
  },
  yu_searching1:{
    height: 140,
  },
  yu_finding_friends_text:{
    position: 'absolute',
    fontSize: 18,  
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#42ade2',
    marginTop: -130,
    width: '80%'
  }, 
  searching_container: {
    flexDirection: 'row',
    height: '7%',
    backgroundColor: '#35D662',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -25,
  },
  searching_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 25,
  },
  magnifying_glass_emoji:{
    height: 35,
    marginRight: -20,
  },
  scrollView: {
    flex: 1,
  },  
  found_friend_container: {
    flexDirection: 'row',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 10,
  },
  profile_picture:{
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  profile_name_text:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8,
  },
  friend_counter:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friend_counter_container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer_finger: {
    position: 'absolute',
    left: 25,
    top: 40,
    width: 35,
    height: 35,
  },
});

export default OnboardingPage5Navigator;